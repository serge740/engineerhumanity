import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './modules/admin-management/admin.module';
import { SitesModule } from './modules/sites/sites.module';
import { PagesModule } from './modules/pages/pages.module';
import { ComponentsModule } from './modules/components/components.module';
import { AssetsModule } from './modules/assets/assets.module';
import { PublicModule } from './modules/public/public.module';
import { ExportModule } from './modules/export/export.module';
@Module({
  imports: [
    PrismaModule,
    AdminModule,
    SitesModule,
    PagesModule,
    ComponentsModule,
    AssetsModule,
    PublicModule,
    ExportModule,
  ],
})
export class AppModule {}
