import { PrismaService } from "../../prisma/prisma.service";
export declare class AssetsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private assertSiteOwner;
    findAll(siteId: string, adminId: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        siteId: string;
        type: string;
        url: string;
        size: number;
    }[]>;
    create(siteId: string, adminId: string, file: Express.Multer.File, type: 'image' | 'font'): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        siteId: string;
        type: string;
        url: string;
        size: number;
    }>;
    remove(siteId: string, id: string, adminId: string): Promise<{
        message: string;
    }>;
}
