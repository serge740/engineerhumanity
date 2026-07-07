import { AssetsService } from './assets.service';
import { RequestWithAdmin } from "../../common/interfaces/admin.interface";
export declare class AssetsController {
    private readonly assetsService;
    constructor(assetsService: AssetsService);
    findAll(siteId: string, req: RequestWithAdmin): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        siteId: string;
        url: string;
        type: string;
        publicId: string | null;
        size: number;
    }[]>;
    upload(siteId: string, file: Express.Multer.File, type: "image" | "font" | undefined, req: RequestWithAdmin): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        siteId: string;
        url: string;
        type: string;
        publicId: string | null;
        size: number;
    }>;
    remove(siteId: string, id: string, req: RequestWithAdmin): Promise<{
        message: string;
    }>;
}
