import { Module } from '@nestjs/common';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminModule } from '../admin-management/admin.module';

@Module({
  imports: [PrismaModule, AdminModule],
  controllers: [CollectionsController],
  providers: [CollectionsService],
  exports: [CollectionsService],
})
export class CollectionsModule {}
