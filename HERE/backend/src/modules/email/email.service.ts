import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { BrevoClient } from '@getbrevo/brevo';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private brevoClient: BrevoClient;
  private senderEmail: string;
  private senderName: string;

  constructor() {
    this.brevoClient = new BrevoClient({
      apiKey: process.env.BREVO_API_KEY || '',
    });

    this.senderEmail = process.env.EMAIL_FROM || 'no-reply@engineers4humanity.org';
    this.senderName = process.env.EMAIL_FROM_NAME || 'Engineers4Humanity';

    if (!process.env.BREVO_API_KEY) {
      this.logger.warn('BREVO_API_KEY not found in environment variables');
    } else {
      this.logger.log('Brevo email service initialized');
    }
  }

  /**
   * Send email with raw HTML content (no template)
   */
  async sendRawEmail(
    to: string | string[],
    subject: string,
    htmlContent: string,
    options: {
      replyTo?: { email: string; name?: string };
      attachments?: { name: string; content: string }[];
    } = {},
  ): Promise<void> {
    if (!to || !subject || !htmlContent) {
      throw new BadRequestException(
        'Email recipient, subject and content are required.',
      );
    }

    const recipients = Array.isArray(to)
      ? to.map((email) => ({ email }))
      : [{ email: to }];

    try {
      const result = await this.brevoClient.transactionalEmails.sendTransacEmail({
        sender: { email: this.senderEmail, name: this.senderName },
        to: recipients,
        subject: subject,
        htmlContent: htmlContent,
        ...(options.replyTo ? { replyTo: options.replyTo } : {}),
        ...(options.attachments?.length ? { attachment: options.attachments } : {}),
      });
      this.logger.log(
        `Email sent to ${Array.isArray(to) ? to.join(', ') : to} with subject "${subject}" - MessageId: ${result.messageId}`,
      );
    } catch (error) {
      this.logger.error('Failed to send email via Brevo', error);
      throw new Error('Email sending failed');
    }
  }

  /**
   * Thank a donor for a successful donation
   */
  async sendDonationThankYouEmail(options: {
    email: string;
    firstName: string;
    lastName: string;
    amount: number;
    currency: string;
    frequency: 'once' | 'monthly';
    programArea: string;
    date: string;
  }): Promise<void> {
    const { email, firstName, lastName, amount, currency, frequency, programArea, date } =
      options;
    const formattedAmount = `${currency} ${amount.toLocaleString()}`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f0fdf4;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(21,128,61,0.12);">
        <tr>
          <td style="background:linear-gradient(135deg,#16a34a 0%,#0284c7 100%);padding:36px 32px;text-align:center;">
            <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.15em;color:#dcfce7;text-transform:uppercase;">Engineers4Humanity</p>
            <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#ffffff;">Thank You for Your Generosity! ❤️</h1>
            <p style="margin:0;font-size:28px;font-weight:800;color:#ffffff;">${formattedAmount}</p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:32px;">
            <p style="margin:0 0 16px;font-size:15px;color:#1e293b;">Dear <strong>${firstName} ${lastName}</strong>,</p>
            <p style="margin:0 0 24px;font-size:14px;color:#64748b;line-height:1.6;">
              Thank you for your ${frequency === 'monthly' ? 'monthly' : 'one-time'} gift to Engineers4Humanity. Your generosity directly empowers refugees and underserved communities through education, engineering solutions, and sustainable development in Rwanda.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;overflow:hidden;">
              <tr style="border-bottom:1px solid #bbf7d0;">
                <td style="padding:12px 16px;font-size:13px;color:#64748b;">Donation Amount</td>
                <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#1e293b;text-align:right;">${formattedAmount}</td>
              </tr>
              <tr style="border-bottom:1px solid #bbf7d0;">
                <td style="padding:12px 16px;font-size:13px;color:#64748b;">Frequency</td>
                <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#1e293b;text-align:right;">${frequency === 'monthly' ? 'Monthly' : 'One-time'}</td>
              </tr>
              <tr style="border-bottom:1px solid #bbf7d0;">
                <td style="padding:12px 16px;font-size:13px;color:#64748b;">Program Designation</td>
                <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#1e293b;text-align:right;">${programArea}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;font-size:13px;color:#64748b;">Date</td>
                <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#1e293b;text-align:right;">${date}</td>
              </tr>
            </table>
            <p style="margin:24px 0 0;font-size:13px;color:#64748b;line-height:1.6;">
              Engineers4Humanity is a 501(c)(3) nonprofit. Your U.S. Dollar donation is U.S. income tax-deductible. Our nonprofit was initially listed by the U.S. IRS as "E4H Initiative," so a U.S. Dollar contribution receipt will reflect that name.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#f0fdf4;padding:20px 32px;border-top:1px solid #bbf7d0;text-align:center;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">© ${new Date().getFullYear()} Engineers4Humanity · This is an automated message, please do not reply.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    await this.sendRawEmail(email, 'Thank You for Your Donation to Engineers4Humanity', html);
  }

  /**
   * Let a donor know their donation could not be processed
   */
  async sendDonationFailedEmail(options: {
    email: string;
    firstName: string;
    amount: number;
    currency: string;
  }): Promise<void> {
    const { email, firstName, amount, currency } = options;
    const formattedAmount = `${currency} ${amount.toLocaleString()}`;
    const frontendUrl = process.env.FRONTEND_URL_ONLY || 'http://localhost:5173';

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#fef2f2;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef2f2;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(220,38,38,0.10);">
        <tr>
          <td style="background:linear-gradient(135deg,#dc2626 0%,#b91c1c 100%);padding:36px 32px;text-align:center;">
            <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.15em;color:#fecaca;text-transform:uppercase;">Engineers4Humanity</p>
            <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;">We Couldn't Process Your Donation</h1>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:32px;">
            <p style="margin:0 0 16px;font-size:15px;color:#1e293b;">Hello <strong>${firstName}</strong>,</p>
            <p style="margin:0 0 20px;font-size:14px;color:#64748b;line-height:1.6;">
              Your attempted donation of <strong style="color:#1e293b;">${formattedAmount}</strong> could not be completed, and you have not been charged.
            </p>
            <p style="margin:0 0 24px;font-size:14px;color:#64748b;line-height:1.6;">
              This can happen for a number of reasons — a declined card, a closed browser tab, or a session timing out. You're welcome to try again whenever you're ready.
            </p>
            <a href="${frontendUrl}/donate" style="display:inline-block;background:linear-gradient(135deg,#16a34a,#15803d);color:#ffffff;padding:12px 32px;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Try Again</a>
            <p style="margin:24px 0 0;font-size:14px;color:#64748b;">If you believe this is an error, please reach out to us.</p>
          </td>
        </tr>
        <tr>
          <td style="background:#fef2f2;padding:20px 32px;border-top:1px solid #fecaca;text-align:center;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">© ${new Date().getFullYear()} Engineers4Humanity · This is an automated message, please do not reply.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    await this.sendRawEmail(email, "We Couldn't Process Your Donation", html);
  }

  /**
   * Notify the organization of a new "Contact Us" submission. Sets replyTo to
   * the submitter so the recipient can just hit "reply" in their email client.
   */
  async sendContactNotificationEmail(options: {
    to: string;
    name: string;
    email: string;
    message: string;
    attachment?: { name: string; content: string };
  }): Promise<void> {
    const { to, name, email, message, attachment } = options;
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const year = new Date().getFullYear();

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>New Contact Message — Engineers4Humanity</title>
<!--[if mso]><style type="text/css">body,table,td,a{font-family:Arial,sans-serif!important;}</style><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#F0F4F8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#F0F4F8;">
<tr><td style="padding:40px 20px;">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:640px;margin:0 auto;background-color:#FFFFFF;box-shadow:0 4px 24px rgba(14,30,60,0.12);border-radius:4px;overflow:hidden;">

  <!-- TOP ACCENT BAR -->
  <tr><td style="height:6px;background:linear-gradient(90deg,#0284C7 0%,#16A34A 100%);"></td></tr>

  <!-- HEADER -->
  <tr><td style="background:linear-gradient(135deg,#0C1A3A 0%,#0F2657 100%);padding:36px 40px 0;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td valign="top" style="width:60%;">
          <div style="font-size:22px;font-weight:800;color:#FFFFFF;line-height:1;letter-spacing:0.5px;font-family:Arial,sans-serif;">Engineers<span style="color:#16A34A;">4</span>Humanity</div>
          <div style="font-size:9px;color:#7A8CA8;text-transform:uppercase;letter-spacing:3px;margin-top:6px;font-weight:600;">ENGINEERING <span style="color:#0284C7;">·</span> IMPACT</div>
        </td>
        <td valign="top" style="width:40%;text-align:right;">
          <div style="font-size:11px;color:#C8D0DC;line-height:1.7;">
            <strong style="color:#FFFFFF;font-weight:600;">Engineers4Humanity</strong><br/>
            Kigali, Rwanda<br/>
            <a href="mailto:contact@engineers4humanity.org" style="color:#0284C7;text-decoration:none;">contact@engineers4humanity.org</a>
          </div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- HEADER TITLE STRIP -->
  <tr><td style="background:linear-gradient(135deg,#0C1A3A 0%,#0F2657 100%);padding:20px 40px 32px;border-top:1px solid rgba(255,255,255,0.08);">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td valign="bottom" style="width:55%;">
          <div style="font-size:8px;color:#7A8CA8;text-transform:uppercase;letter-spacing:3px;font-weight:600;margin-bottom:8px;">INBOUND INQUIRY</div>
          <div style="font-size:44px;font-weight:800;color:#FFFFFF;line-height:0.9;letter-spacing:0.5px;font-family:Arial,sans-serif;">NEW<br/><span style="color:#16A34A;">CONTACT</span></div>
        </td>
        <td valign="bottom" style="width:45%;text-align:right;padding-bottom:4px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-left:auto;">
            <tr>
              <td style="font-size:9px;color:#7A8CA8;text-transform:uppercase;letter-spacing:2px;padding:0 12px 0 0;text-align:right;">RECEIVED</td>
              <td style="font-size:11px;color:#FFFFFF;font-weight:700;">${date}</td>
            </tr>
            <tr>
              <td style="font-size:9px;color:#7A8CA8;text-transform:uppercase;letter-spacing:2px;padding:6px 12px 0 0;text-align:right;">FROM</td>
              <td style="font-size:11px;color:#FFFFFF;font-weight:700;padding-top:6px;">${safeName}</td>
            </tr>
            <tr>
              <td style="font-size:9px;color:#7A8CA8;text-transform:uppercase;letter-spacing:2px;padding:6px 12px 0 0;text-align:right;">CHANNEL</td>
              <td style="font-size:11px;color:#FFFFFF;font-weight:700;padding-top:6px;">Website Form</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- BODY -->
  <tr><td style="padding:40px 40px 36px;background-color:#FFFFFF;">

    <!-- Sender Details -->
    <div style="display:inline-block;font-size:9px;color:#0284C7;text-transform:uppercase;letter-spacing:3px;font-weight:700;border-bottom:3px solid #0C1A3A;padding-bottom:8px;margin-bottom:20px;">SENDER DETAILS</div>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:28px;background:linear-gradient(135deg,#f8fafc 0%,#ffffff 100%);border-left:4px solid #0284C7;border-radius:2px;">
      <tr><td style="padding:20px 24px;">
        <div style="font-size:22px;font-weight:700;color:#0C1A3A;letter-spacing:0.3px;font-family:Arial,sans-serif;margin-bottom:8px;">${safeName}</div>
        <div style="font-size:14px;color:#5A6670;margin-bottom:12px;">
          <a href="mailto:${safeEmail}" style="color:#0284C7;text-decoration:none;border-bottom:1px solid #0284C7;font-weight:500;">${safeEmail}</a>
        </div>
        <div style="font-size:11px;color:#8A949E;text-transform:uppercase;letter-spacing:1px;">Submitted: <strong style="color:#5A6670;font-weight:600;">${date}</strong></div>
      </td></tr>
    </table>

    <!-- Message Content -->
    <div style="font-size:9px;color:#16A34A;text-transform:uppercase;letter-spacing:3px;font-weight:700;margin-bottom:12px;">MESSAGE CONTENT</div>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#F0F9FF;border-left:4px solid #16A34A;border-radius:2px;">
      <tr><td style="padding:24px 26px;">
        <div style="font-size:15px;color:#0C1A3A;line-height:1.7;white-space:pre-wrap;font-weight:400;">${safeMessage}</div>
      </td></tr>
    </table>

    <!-- CTA -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr><td style="padding:32px 0 8px;text-align:center;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
          <tr><td style="background:linear-gradient(135deg,#0284C7 0%,#16A34A 100%);border-radius:4px;box-shadow:0 4px 12px rgba(2,132,199,0.3);">
            <a href="mailto:${safeEmail}?subject=Re: Your message to Engineers4Humanity" style="display:inline-block;padding:16px 40px;font-size:13px;font-weight:700;color:#FFFFFF;text-decoration:none;text-transform:uppercase;letter-spacing:2px;font-family:Arial,sans-serif;">&#9993; Reply to ${safeName}</a>
          </td></tr>
        </table>
      </td></tr>
    </table>

  </td></tr>

  <!-- FOOTER -->
  <tr><td style="background:linear-gradient(135deg,#0C1A3A 0%,#0F2657 100%);padding:24px 40px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td valign="middle" style="width:60%;">
          <div style="font-size:18px;font-weight:800;color:#FFFFFF;letter-spacing:1px;font-family:Arial,sans-serif;">Engineers<span style="color:#16A34A;">4</span>Humanity</div>
          <div style="font-size:10px;color:#7A8CA8;text-transform:uppercase;letter-spacing:2px;margin-top:6px;font-weight:500;">Engineering Change, Empowering Lives</div>
        </td>
        <td valign="middle" style="width:40%;text-align:right;">
          <div style="font-size:10px;color:#7A8CA8;letter-spacing:2px;font-weight:500;">&copy; ${year} Engineers4Humanity<br/><strong style="color:#FFFFFF;font-weight:600;">Kigali, Rwanda</strong></div>
        </td>
      </tr>
    </table>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);">
      <tr><td style="text-align:center;">
        <div style="font-size:9px;color:#5A6670;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;">STAY CONNECTED</div>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
          <tr>
            <td style="padding:0 8px;"><a href="https://engineers4humanity.org" style="color:#7A8CA8;text-decoration:none;font-size:11px;font-weight:500;">Website</a></td>
            <td style="color:#5A6670;">·</td>
            <td style="padding:0 8px;"><a href="mailto:contact@engineers4humanity.org" style="color:#7A8CA8;text-decoration:none;font-size:11px;font-weight:500;">Email</a></td>
          </tr>
        </table>
      </td></tr>
    </table>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

    await this.sendRawEmail(to, `New Contact Message from ${name}`, html, {
      replyTo: { email, name },
      attachments: attachment ? [attachment] : undefined,
    });
  }
}
