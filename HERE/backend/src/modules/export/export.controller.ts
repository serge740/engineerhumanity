import { Controller, Get, Param, Res, UseGuards, Req } from '@nestjs/common';
import { ExportService } from './export.service';
import { AdminJwtAuthGuard } from 'src/guards/adminGuard.guard';
import { RequestWithAdmin } from 'src/common/interfaces/admin.interface';
import { Response } from 'express';

@Controller('sites/:siteId/export')
@UseGuards(AdminJwtAuthGuard)
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get()
  async exportSite(
    @Param('siteId') siteId: string,
    @Req()  req: RequestWithAdmin,
    @Res()  res: Response,
  ) {
    await this.exportService.streamSiteZip(siteId, req.admin.id, res);
  }
}
