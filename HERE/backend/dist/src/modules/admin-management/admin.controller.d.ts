import { AdminService } from './admin.service';
import { Response } from 'express';
import { RequestWithAdmin } from "../../common/interfaces/admin.interface";
export declare class AdminController {
    private readonly adminServices;
    constructor(adminServices: AdminService);
    register(body: {
        adminName: string;
        adminEmail: string;
        password: string;
    }): Promise<{
        message: string;
        adminId: string;
    }>;
    login(body: {
        adminEmail: string;
        password: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(req: RequestWithAdmin): Promise<{
        admin: {
            id: string;
            adminEmail: string;
            adminName: string;
            createdAt: Date;
            updatedAt: Date;
        };
        authenticated: boolean;
    }>;
    changePassword(req: RequestWithAdmin, body: {
        currentPassword: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
    logout(res: Response): Promise<{
        message: string;
    }>;
}
