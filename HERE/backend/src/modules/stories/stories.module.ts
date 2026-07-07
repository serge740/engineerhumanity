import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminModule } from '../admin-management/admin.module';

@Module({
  imports: [PrismaModule, AdminModule],
  controllers: [StoriesController],
  providers: [StoriesService],
  exports: [StoriesService],
})
export class StoriesModule {}
