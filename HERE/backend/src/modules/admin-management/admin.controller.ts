import {
  Body,
  Controller,
  Get,
  HttpException,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Response } from 'express';
import { AdminJwtAuthGuard } from 'src/guards/adminGuard.guard';
import { RequestWithAdmin } from 'src/common/interfaces/admin.interface';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminServices: AdminService) {}

  // ─── REGISTER (first-time setup) ────────────────────────────────
  @Post('register')
  async register(@Body() body: { adminName: string; adminEmail: string; password: string }) {
    try {
      return await this.adminServices.registerAdmin(body);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  // ─── LOGIN ───────────────────────────────────────────────────────
  @Post('login')
  async login(
    @Body() body: { adminEmail: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const result = await this.adminServices.adminLogin(body);

      res.cookie('AccessAdminToken', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(200).json(result);
    } catch (error) {
      throw new HttpException(error.message || 'Login failed', error.status || 400);
    }
  }

  // ─── GET PROFILE ─────────────────────────────────────────────────
  @Get('profile')
  @UseGuards(AdminJwtAuthGuard)
  async getProfile(@Req() req: RequestWithAdmin) {
    try {
      return await this.adminServices.getProfile(req.admin?.id as string);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  // ─── CHANGE PASSWORD ─────────────────────────────────────────────
  @Patch('change-password')
  @UseGuards(AdminJwtAuthGuard)
  async changePassword(
    @Req() req: RequestWithAdmin,
    @Body() body: { currentPassword: string; newPassword: string },
  ) {
    try {
      return await this.adminServices.changePassword(
        req.admin?.id as string,
        body.currentPassword,
        body.newPassword,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  // ─── LOGOUT ──────────────────────────────────────────────────────
  @Post('logout')
  @UseGuards(AdminJwtAuthGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    try {
      return await this.adminServices.logout(res);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
