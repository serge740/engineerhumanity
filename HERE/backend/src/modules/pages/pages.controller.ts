import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { AdminJwtAuthGuard } from 'src/guards/adminGuard.guard';
import { RequestWithAdmin } from 'src/common/interfaces/admin.interface';

@Controller('sites/:siteId/pages')
@UseGuards(AdminJwtAuthGuard)
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  async findAll(
    @Param('siteId') siteId: string,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.pagesService.findAll(siteId, req.admin.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get(':slug')
  async findOne(
    @Param('siteId') siteId: string,
    @Param('slug') slug: string,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.pagesService.findOne(siteId, slug, req.admin.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post()
  async create(
    @Param('siteId') siteId: string,
    @Body() dto: CreatePageDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.pagesService.create(siteId, req.admin.id, dto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Patch(':slug')
  async update(
    @Param('siteId') siteId: string,
    @Param('slug') slug: string,
    @Body() dto: UpdatePageDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.pagesService.update(siteId, slug, req.admin.id, dto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Post(':slug/publish')
  async publish(
    @Param('siteId') siteId: string,
    @Param('slug') slug: string,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.pagesService.publish(siteId, slug, req.admin.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Post(':slug/unpublish')
  async unpublish(
    @Param('siteId') siteId: string,
    @Param('slug') slug: string,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.pagesService.unpublish(siteId, slug, req.admin.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Post(':slug/duplicate')
  async duplicate(
    @Param('siteId') siteId: string,
    @Param('slug') slug: string,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.pagesService.duplicate(siteId, slug, req.admin.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Delete(':slug')
  async remove(
    @Param('siteId') siteId: string,
    @Param('slug') slug: string,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.pagesService.remove(siteId, slug, req.admin.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }
}
