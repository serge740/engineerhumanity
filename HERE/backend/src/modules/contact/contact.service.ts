import { BadRequestException, Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly emailService: EmailService) {}

  async send(dto: CreateContactDto, file?: Express.Multer.File) {
    if (!dto.first_name?.trim()) throw new BadRequestException('Name, email, and message are required.');
    if (!dto.email?.trim()) throw new BadRequestException('Name, email, and message are required.');
    if (!dto.message?.trim()) throw new BadRequestException('Name, email, and message are required.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dto.email.trim())) {
      throw new BadRequestException('Please provide a valid email address.');
    }

    const name = `${dto.first_name} ${dto.last_name || ''}`.trim();
    const recipient = process.env.CONTACT_RECIPIENT_EMAIL || 'contact@engineers4humanity.org';

    // Sending the notification IS the point of this request (nothing is
    // persisted), so unlike the donation emails a failure here must propagate
    // as an error rather than being swallowed.
    await this.emailService.sendContactNotificationEmail({
      to: recipient,
      name,
      email: dto.email.trim(),
      message: dto.message.trim(),
      attachment: file
        ? { name: file.originalname, content: file.buffer.toString('base64') }
        : undefined,
    });

    return { message: 'Your message has been sent successfully!' };
  }
}
