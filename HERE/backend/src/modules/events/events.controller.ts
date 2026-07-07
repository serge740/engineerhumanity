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
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ReorderEventsDto } from './dto/reorder-events.dto';
import { AdminJwtAuthGuard } from 'src/guards/adminGuard.guard';
import { RequestWithAdmin } from 'src/common/interfaces/admin.interface';

@Controller('sites/:siteId/events')
@UseGuards(AdminJwtAuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(
    @Param('siteId') siteId: string,
    @Query('status') status: string | undefined,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.eventsService.findAll(siteId, req.admin.id, status);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post()
  async create(
    @Param('siteId') siteId: string,
    @Body() dto: CreateEventDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.eventsService.create(siteId, req.admin.id, dto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Patch(':id')
  async update(
    @Param('siteId') siteId: string,
    @Param('id') id: string,
    @Body() dto: UpdateEventDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.eventsService.update(siteId, id, req.admin.id, dto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Post('reorder')
  async reorder(
    @Param('siteId') siteId: string,
    @Body() dto: ReorderEventsDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.eventsService.reorder(siteId, req.admin.id, dto);
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
      return await this.eventsService.remove(siteId, id, req.admin.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }
}
