import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminJwtAuthGuard } from 'src/guards/adminGuard.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.Jwt_SECRET_KEY || 'secretkey',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminJwtAuthGuard],
  exports: [AdminService, AdminJwtAuthGuard, JwtModule],
})
export class AdminModule {}
