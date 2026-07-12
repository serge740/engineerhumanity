import { BadRequestException, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StripeService } from './stripe.service';
import { EmailService } from '../email/email.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Injectable()
export class DonationsService {
  private readonly logger = new Logger(DonationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly stripeService: StripeService,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateDonationDto) {
    if (!dto.firstName?.trim()) throw new BadRequestException('First name is required');
    if (!dto.lastName?.trim()) throw new BadRequestException('Last name is required');
    if (!dto.country?.trim()) throw new BadRequestException('Country is required');
    if (!dto.street?.trim()) throw new BadRequestException('Street address is required');
    if (!dto.city?.trim()) throw new BadRequestException('City is required');
    if (!dto.currency?.trim()) throw new BadRequestException('Currency is required');
    if (!dto.amount || dto.amount <= 0) throw new BadRequestException('Amount must be greater than 0');
    if (!['once', 'monthly'].includes(dto.frequency)) {
      throw new BadRequestException('frequency must be "once" or "monthly"');
    }
    if (dto.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dto.email)) {
      throw new BadRequestException('Invalid email address');
    }

    const donation = await this.prisma.donation.create({
      data: {
        firstName: dto.firstName.trim(),
        lastName: dto.lastName.trim(),
        email: dto.email?.trim() || null,
        country: dto.country.trim(),
        street: dto.street.trim(),
        city: dto.city.trim(),
        adminDivision: dto.adminDivision || null,
        phone: dto.phone || null,
        currency: dto.currency.trim().toUpperCase(),
        amount: dto.amount,
        frequency: dto.frequency,
        programArea: dto.programArea || 'general',
        displayPublicly: dto.displayPublicly ?? false,
        dedicateTo: dto.dedicateTo || null,
        status: 'pending',
      },
    });

    const session = await this.stripeService.createCheckoutSession(donation);

    await this.prisma.donation.update({
      where: { id: donation.id },
      data: { stripeCheckoutSessionId: session.id },
    });

    return { checkoutUrl: session.url, donationId: donation.id };
  }

  async verifySession(sessionId: string, opts: { cancelled?: boolean } = {}) {
    const donation = await this.prisma.donation.findFirst({
      where: { stripeCheckoutSessionId: sessionId },
    });
    if (!donation) throw new NotFoundException('Donation not found');

    // The donor landed on our cancel_url (Stripe's own "back" link on Checkout),
    // which is an explicit signal they're not paying — force-close the session
    // now instead of leaving it 'open' until Stripe's ~24h natural expiry, which
    // would otherwise leave this donation stuck as 'pending'.
    const session = opts.cancelled
      ? await this.stripeService.expireSessionIfOpen(sessionId)
      : await this.stripeService.retrieveSession(sessionId);

    let status = donation.status;
    if (session.status === 'complete' && session.payment_status === 'paid') {
      status = 'succeeded';
    } else if (session.status === 'expired') {
      status = 'failed';
    }

    const wasAlreadyResolved = donation.status === 'succeeded' || donation.status === 'failed';

    if (status !== donation.status) {
      await this.prisma.donation.update({
        where: { id: donation.id },
        data: {
          status,
          stripeCustomerId:
            typeof session.customer === 'string' ? session.customer : session.customer?.id ?? undefined,
          stripeSubscriptionId:
            typeof session.subscription === 'string'
              ? session.subscription
              : session.subscription?.id ?? undefined,
          stripePaymentIntentId:
            typeof session.payment_intent === 'string'
              ? session.payment_intent
              : session.payment_intent?.id ?? undefined,
        },
      });
    }

    if (!wasAlreadyResolved && status !== 'pending' && donation.email) {
      try {
        if (status === 'succeeded') {
          await this.emailService.sendDonationThankYouEmail({
            email: donation.email,
            firstName: donation.firstName,
            lastName: donation.lastName,
            amount: donation.amount,
            currency: donation.currency,
            frequency: donation.frequency as 'once' | 'monthly',
            programArea: donation.programArea,
            date: donation.createdAt.toLocaleDateString(),
          });
        } else if (status === 'failed') {
          await this.emailService.sendDonationFailedEmail({
            email: donation.email,
            firstName: donation.firstName,
            amount: donation.amount,
            currency: donation.currency,
          });
        }
        await this.prisma.donation.update({
          where: { id: donation.id },
          data: { emailSentAt: new Date() },
        });
      } catch (err) {
        this.logger.error(`Failed to send donation status email: ${err.message}`);
      }
    }

    return {
      status,
      amount: donation.amount,
      currency: donation.currency,
      firstName: donation.firstName,
      frequency: donation.frequency,
      programArea: donation.programArea,
      email: donation.email,
    };
  }

  async syncPendingDonations() {
    const pending = await this.prisma.donation.findMany({
      where: { status: 'pending', stripeCheckoutSessionId: { not: null } },
    });

    let updated = 0;
    for (const donation of pending) {
      try {
        const result = await this.verifySession(donation.stripeCheckoutSessionId!);
        if (result.status !== 'pending') updated++;
      } catch (err) {
        this.logger.error(`Failed to sync donation ${donation.id}: ${err.message}`);
      }
    }

    return { checked: pending.length, updated };
  }

  async findAllForAdmin(params: {
    status?: string;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
  }) {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 20;

    const where: Record<string, unknown> = {};
    if (params.status && params.status !== 'all') {
      where.status = params.status;
    }
    if (params.search?.trim()) {
      const search = params.search.trim();
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
      ];
    }
    if (params.dateFrom || params.dateTo) {
      const createdAt: Record<string, Date> = {};
      if (params.dateFrom) createdAt.gte = new Date(`${params.dateFrom}T00:00:00`);
      if (params.dateTo) createdAt.lte = new Date(`${params.dateTo}T23:59:59.999`);
      where.createdAt = createdAt;
    }

    const [items, total] = await Promise.all([
      this.prisma.donation.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.donation.count({ where }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOneForAdmin(id: string) {
    const donation = await this.prisma.donation.findUnique({ where: { id } });
    if (!donation) throw new NotFoundException('Donation not found');
    return donation;
  }

  async getStats() {
    const [succeeded, failed, pending, succeededByCurrency] = await Promise.all([
      this.prisma.donation.count({ where: { status: 'succeeded' } }),
      this.prisma.donation.count({ where: { status: 'failed' } }),
      this.prisma.donation.count({ where: { status: 'pending' } }),
      this.prisma.donation.groupBy({
        by: ['currency'],
        where: { status: 'succeeded' },
        _sum: { amount: true },
      }),
    ]);

    return {
      succeededCount: succeeded,
      failedCount: failed,
      pendingCount: pending,
      totalRaised: succeededByCurrency.map((row) => ({
        currency: row.currency,
        amount: row._sum.amount ?? 0,
      })),
    };
  }
}
