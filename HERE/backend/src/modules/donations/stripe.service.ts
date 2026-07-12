import { Injectable, Logger } from '@nestjs/common';
import Stripe = require('stripe');
import { Donation } from '@prisma/client';

// Currencies Stripe treats as having no fractional/subunit — amounts are passed
// as whole units, NOT multiplied by 100 like USD cents.
// https://docs.stripe.com/currencies#zero-decimal
const ZERO_DECIMAL_CURRENCIES = new Set([
  'BIF', 'CLP', 'DJF', 'GNF', 'JPY', 'KMF', 'KRW', 'MGA',
  'PYG', 'RWF', 'UGX', 'VND', 'VUV', 'XAF', 'XOF', 'XPF',
]);

function toStripeUnitAmount(amount: number, currency: string): number {
  const isZeroDecimal = ZERO_DECIMAL_CURRENCIES.has(currency.toUpperCase());
  return Math.round(isZeroDecimal ? amount : amount * 100);
}

@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2026-06-24.dahlia',
    });
  }

  async createCheckoutSession(donation: Donation) {
    const frontendUrl = process.env.FRONTEND_URL_ONLY || 'http://localhost:5173';
    const isMonthly = donation.frequency === 'monthly';

    const session = await this.stripe.checkout.sessions.create({
      mode: isMonthly ? 'subscription' : 'payment',
      line_items: [
        {
          price_data: {
            currency: donation.currency.toLowerCase(),
            unit_amount: toStripeUnitAmount(donation.amount, donation.currency),
            product_data: {
              name: `Donation — ${donation.programArea}`,
              description: `${isMonthly ? 'Monthly' : 'One-time'} donation to Engineers4Humanity`,
            },
            ...(isMonthly ? { recurring: { interval: 'month' as const } } : {}),
          },
          quantity: 1,
        },
      ],
      success_url: `${frontendUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/donate/failed?session_id={CHECKOUT_SESSION_ID}`,
      ...(donation.email ? { customer_email: donation.email } : {}),
      metadata: { donationId: donation.id },
    });

    return session;
  }

  async retrieveSession(sessionId: string) {
    return this.stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'subscription'],
    });
  }

  /**
   * Force-closes a still-open Checkout Session. Used when the donor explicitly
   * cancels (Stripe's own "back" link, which lands on our cancel_url) — without
   * this, the session stays 'open' until Stripe's ~24h natural expiry, so the
   * donation would sit as 'pending' instead of reflecting the cancellation.
   * No-op (safe to call) if the session isn't in 'open' status anymore.
   */
  async expireSessionIfOpen(sessionId: string) {
    const session = await this.retrieveSession(sessionId);
    if (session.status !== 'open') return session;
    try {
      return await this.stripe.checkout.sessions.expire(sessionId);
    } catch (err) {
      this.logger.warn(`Could not expire session ${sessionId}: ${err.message}`);
      return session;
    }
  }
}
