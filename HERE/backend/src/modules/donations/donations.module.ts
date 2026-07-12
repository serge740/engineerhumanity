import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { StripeService } from './stripe.service';
import { DonationsController } from './donations.controller';
import { AdminDonationsController } from './admin-donations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminModule } from '../admin-management/admin.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [PrismaModule, AdminModule, EmailModule],
  controllers: [DonationsController, AdminDonationsController],
  providers: [DonationsService, StripeService],
})
export class DonationsModule {}
