import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { ReorderStoriesDto } from './dto/reorder-stories.dto';
import { AdminJwtAuthGuard } from 'src/guards/adminGuard.guard';
import { RequestWithAdmin } from 'src/common/interfaces/admin.interface';

@Controller('sites/:siteId/stories')
@UseGuards(AdminJwtAuthGuard)
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Get()
  async findAll(
    @Param('siteId') siteId: string,
    @Query('group') group: string | undefined,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.storiesService.findAll(siteId, req.admin.id, group);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post()
  async create(
    @Param('siteId') siteId: string,
    @Body() dto: CreateStoryDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.storiesService.create(siteId, req.admin.id, dto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Patch(':id')
  async update(
    @Param('siteId') siteId: string,
    @Param('id') id: string,
    @Body() dto: UpdateStoryDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.storiesService.update(siteId, id, req.admin.id, dto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Post('reorder')
  async reorder(
    @Param('siteId') siteId: string,
    @Body() dto: ReorderStoriesDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.storiesService.reorder(siteId, req.admin.id, dto);
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
      return await this.storiesService.remove(siteId, id, req.admin.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }
}
