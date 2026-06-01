import { PrismaService } from "../../prisma/prisma.service";
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
export declare class AdminService {
    private readonly prisma;
    private readonly jwtServices;
    private emailRegex;
    constructor(prisma: PrismaService, jwtServices: JwtService);
    findAdminById(id: string): Promise<{
        id: string;
        adminEmail: string;
        adminName: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findAdminByEmail(email: string): Promise<{
        id: string;
        adminEmail: string;
        adminName: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    registerAdmin(data: {
        adminName: string;
        adminEmail: string;
        password: string;
    }): Promise<{
        message: string;
        adminId: string;
    }>;
    adminLogin(data: {
        adminEmail: string;
        password: string;
    }): Promise<{
        token: string;
        authenticated: boolean;
        message: string;
        admin: {
            id: string;
            adminName: string;
            adminEmail: string;
        };
    }>;
    getProfile(adminId: string): Promise<{
        admin: {
            id: string;
            adminEmail: string;
            adminName: string;
            createdAt: Date;
            updatedAt: Date;
        };
        authenticated: boolean;
    }>;
    changePassword(adminId: string, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    logout(res: Response): Promise<{
        message: string;
    }>;
}
