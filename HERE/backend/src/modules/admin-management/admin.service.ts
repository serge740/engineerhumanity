import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AdminService {
  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtServices: JwtService,
  ) {}

  async findAdminById(id: string) {
    if (!id) throw new BadRequestException('Admin ID is required');
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    if (!admin) return null;
    const { password, ...safe } = admin;
    return safe;
  }

  async findAdminByEmail(email: string) {
    return this.prisma.admin.findUnique({ where: { adminEmail: email } });
  }

  async registerAdmin(data: {
    adminName: string;
    adminEmail: string;
    password: string;
  }) {
    const { adminEmail, adminName, password } = data;

    if (!adminEmail || !adminName || !password) {
      throw new BadRequestException('All fields are required');
    }
    if (!this.emailRegex.test(adminEmail)) {
      throw new BadRequestException('Invalid email format');
    }

    const existing = await this.findAdminByEmail(adminEmail);
    if (existing) throw new BadRequestException('Admin already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await this.prisma.admin.create({
      data: { adminEmail, adminName, password: hashedPassword },
    });

    return { message: 'Admin registered successfully', adminId: newAdmin.id };
  }

  async adminLogin(data: { adminEmail: string; password: string }) {
    const { adminEmail, password } = data;

    if (!adminEmail || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const admin = await this.prisma.admin.findUnique({
      where: { adminEmail },
    });
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtServices.sign({ id: admin.id, role: 'admin' });

    return {
      token,
      authenticated: true,
      message: 'Login successful',
      admin: {
        id: admin.id,
        adminName: admin.adminName,
        adminEmail: admin.adminEmail,
      },
    };
  }

  async getProfile(adminId: string) {
    const admin = await this.findAdminById(adminId);
    if (!admin) throw new NotFoundException('Admin not found');
    return { admin, authenticated: true };
  }

  async changePassword(
    adminId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    if (!adminId) throw new BadRequestException('Admin ID is required');
    if (!currentPassword || !newPassword) {
      throw new BadRequestException('Both current and new password are required');
    }
    if (newPassword.length < 6) {
      throw new BadRequestException('New password must be at least 6 characters');
    }

    const admin = await this.prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) throw new NotFoundException('Admin not found');

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) throw new UnauthorizedException('Current password is incorrect');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.admin.update({
      where: { id: adminId },
      data: { password: hashedPassword },
    });

    return { message: 'Password updated successfully' };
  }

  async logout(res: Response) {
    res.clearCookie('AccessAdminToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { message: 'Logged out successfully' };
  }
}
