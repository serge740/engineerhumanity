import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './modules/admin-management/admin.module';
import { SitesModule } from './modules/sites/sites.module';
import { PagesModule } from './modules/pages/pages.module';
import { ComponentsModule } from './modules/components/components.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { AssetsModule } from './modules/assets/assets.module';
import { PublicModule } from './modules/public/public.module';
import { ExportModule } from './modules/export/export.module';
import { TeamModule } from './modules/team/team.module';
import { EventsModule } from './modules/events/events.module';
import { StoriesModule } from './modules/stories/stories.module';
@Module({
  imports: [
    PrismaModule,
    AdminModule,
    SitesModule,
    PagesModule,
    ComponentsModule,
    CollectionsModule,
    AssetsModule,
    PublicModule,
    ExportModule,
    TeamModule,
    EventsModule,
    StoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
