import { ExportService } from './export.service';
import { RequestWithAdmin } from "../../common/interfaces/admin.interface";
import { Response } from 'express';
export declare class ExportController {
    private readonly exportService;
    constructor(exportService: ExportService);
    exportSite(siteId: string, req: RequestWithAdmin, res: Response): Promise<void>;
}
