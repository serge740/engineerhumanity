"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AdminService = class AdminService {
    prisma;
    jwtServices;
    emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    constructor(prisma, jwtServices) {
        this.prisma = prisma;
        this.jwtServices = jwtServices;
    }
    async findAdminById(id) {
        if (!id)
            throw new common_1.BadRequestException('Admin ID is required');
        const admin = await this.prisma.admin.findUnique({ where: { id } });
        if (!admin)
            return null;
        const { password, ...safe } = admin;
        return safe;
    }
    async findAdminByEmail(email) {
        return this.prisma.admin.findUnique({ where: { adminEmail: email } });
    }
    async registerAdmin(data) {
        const { adminEmail, adminName, password } = data;
        if (!adminEmail || !adminName || !password) {
            throw new common_1.BadRequestException('All fields are required');
        }
        if (!this.emailRegex.test(adminEmail)) {
            throw new common_1.BadRequestException('Invalid email format');
        }
        const existing = await this.findAdminByEmail(adminEmail);
        if (existing)
            throw new common_1.BadRequestException('Admin already exists');
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await this.prisma.admin.create({
            data: { adminEmail, adminName, password: hashedPassword },
        });
        return { message: 'Admin registered successfully', adminId: newAdmin.id };
    }
    async adminLogin(data) {
        const { adminEmail, password } = data;
        if (!adminEmail || !password) {
            throw new common_1.BadRequestException('Email and password are required');
        }
        const admin = await this.prisma.admin.findUnique({
            where: { adminEmail },
        });
        if (!admin)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid)
            throw new common_1.UnauthorizedException('Invalid credentials');
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
    async getProfile(adminId) {
        const admin = await this.findAdminById(adminId);
        if (!admin)
            throw new common_1.NotFoundException('Admin not found');
        return { admin, authenticated: true };
    }
    async changePassword(adminId, currentPassword, newPassword) {
        if (!adminId)
            throw new common_1.BadRequestException('Admin ID is required');
        if (!currentPassword || !newPassword) {
            throw new common_1.BadRequestException('Both current and new password are required');
        }
        if (newPassword.length < 6) {
            throw new common_1.BadRequestException('New password must be at least 6 characters');
        }
        const admin = await this.prisma.admin.findUnique({ where: { id: adminId } });
        if (!admin)
            throw new common_1.NotFoundException('Admin not found');
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch)
            throw new common_1.UnauthorizedException('Current password is incorrect');
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.admin.update({
            where: { id: adminId },
            data: { password: hashedPassword },
        });
        return { message: 'Password updated successfully' };
    }
    async logout(res) {
        res.clearCookie('AccessAdminToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return { message: 'Logged out successfully' };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AdminService);
//# sourceMappingURL=admin.service.js.map