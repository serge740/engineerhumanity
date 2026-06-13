import { Module } from '@nestjs/common';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminModule } from '../admin-management/admin.module';

@Module({
  imports: [PrismaModule, AdminModule],
  controllers: [ExportController],
  providers: [ExportService],
})
export class ExportModule {}
