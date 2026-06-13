import { PrismaService } from "../../prisma/prisma.service";
import { Response } from 'express';
export declare class ExportService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private assertOwner;
    streamSiteZip(siteId: string, adminId: string, res: Response): Promise<void>;
}
