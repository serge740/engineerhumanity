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
        type: string;
        url: string;
        size: number;
    }[]>;
    upload(siteId: string, file: Express.Multer.File, type: "image" | "font" | undefined, req: RequestWithAdmin): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        siteId: string;
        type: string;
        url: string;
        size: number;
    }>;
    remove(siteId: string, id: string, req: RequestWithAdmin): Promise<{
        message: string;
    }>;
}
