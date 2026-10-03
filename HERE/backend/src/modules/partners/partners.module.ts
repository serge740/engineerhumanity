import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminModule } from '../admin-management/admin.module';

@Module({
  imports: [PrismaModule, AdminModule],
  controllers: [PartnersController],
  providers: [PartnersService],
  exports: [PartnersService],
})
export class PartnersModule {}
