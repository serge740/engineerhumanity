import { PrismaService } from "../../prisma/prisma.service";
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class AssetsService {
    private readonly prisma;
    private readonly cloudinary;
    constructor(prisma: PrismaService, cloudinary: CloudinaryService);
    private assertSiteOwner;
    findAll(siteId: string, adminId: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        siteId: string;
        url: string;
        type: string;
        publicId: string | null;
        size: number;
    }[]>;
    create(siteId: string, adminId: string, file: Express.Multer.File, type: 'image' | 'font'): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        siteId: string;
        url: string;
        type: string;
        publicId: string | null;
        size: number;
    }>;
    remove(siteId: string, id: string, adminId: string): Promise<{
        message: string;
    }>;
}
