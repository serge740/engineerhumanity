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
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CreateCollectionItemDto } from './dto/create-collection-item.dto';
import { UpdateCollectionItemDto } from './dto/update-collection-item.dto';
import { ReorderItemsDto } from './dto/reorder-items.dto';
import { AdminJwtAuthGuard } from 'src/guards/adminGuard.guard';
import { RequestWithAdmin } from 'src/common/interfaces/admin.interface';

@Controller('sites/:siteId/collections')
@UseGuards(AdminJwtAuthGuard)
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  async findAll(@Param('siteId') siteId: string, @Req() req: RequestWithAdmin) {
    try {
      return await this.collectionsService.findAll(siteId, req.admin.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get(':id')
  async findOne(
    @Param('siteId') siteId: string,
    @Param('id') id: string,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.collectionsService.findOne(siteId, id, req.admin.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post()
  async create(
    @Param('siteId') siteId: string,
    @Body() dto: CreateCollectionDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.collectionsService.create(siteId, req.admin.id, dto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Patch(':id')
  async update(
    @Param('siteId') siteId: string,
    @Param('id') id: string,
    @Body() dto: UpdateCollectionDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.collectionsService.update(siteId, id, req.admin.id, dto);
    } catch (error) {
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
      return await this.collectionsService.remove(siteId, id, req.admin.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Get(':id/items')
  async findItems(
    @Param('siteId') siteId: string,
    @Param('id') id: string,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.collectionsService.findItems(siteId, id, req.admin.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post(':id/items')
  async createItem(
    @Param('siteId') siteId: string,
    @Param('id') id: string,
    @Body() dto: CreateCollectionItemDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.collectionsService.createItem(siteId, id, req.admin.id, dto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Post(':id/items/reorder')
  async reorderItems(
    @Param('siteId') siteId: string,
    @Param('id') id: string,
    @Body() dto: ReorderItemsDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.collectionsService.reorderItems(siteId, id, req.admin.id, dto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Patch(':id/items/:itemId')
  async updateItem(
    @Param('siteId') siteId: string,
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateCollectionItemDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.collectionsService.updateItem(siteId, id, itemId, req.admin.id, dto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Delete(':id/items/:itemId')
  async removeItem(
    @Param('siteId') siteId: string,
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.collectionsService.removeItem(siteId, id, itemId, req.admin.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }
}
