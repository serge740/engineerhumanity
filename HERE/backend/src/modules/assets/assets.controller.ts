import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AssetsService } from './assets.service';
import { AdminJwtAuthGuard } from 'src/guards/adminGuard.guard';
import { RequestWithAdmin } from 'src/common/interfaces/admin.interface';

@Controller('sites/:siteId/assets')
@UseGuards(AdminJwtAuthGuard)
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get()
  async findAll(
    @Param('siteId') siteId: string,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.assetsService.findAll(siteId, req.admin.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  async upload(
    @Param('siteId') siteId: string,
    @UploadedFile() file: Express.Multer.File,
    @Query('type') type: 'image' | 'font' = 'image',
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.assetsService.create(siteId, req.admin.id, file, type);
    } catch (error) {
      console.error('Asset upload failed:', error);
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Delete(':id')
  async remove(
    @Param('siteId') siteId: string,
    @Param('id') id: string,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.assetsService.remove(siteId, id, req.admin.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }
}
