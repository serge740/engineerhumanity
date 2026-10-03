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
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { ReorderPartnersDto } from './dto/reorder-partners.dto';
import { AdminJwtAuthGuard } from 'src/guards/adminGuard.guard';
import { RequestWithAdmin } from 'src/common/interfaces/admin.interface';

@Controller('sites/:siteId/partners')
@UseGuards(AdminJwtAuthGuard)
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Get()
  async findAll(@Param('siteId') siteId: string, @Req() req: RequestWithAdmin) {
    try {
      return await this.partnersService.findAll(siteId, req.admin.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post()
  async create(
    @Param('siteId') siteId: string,
    @Body() dto: CreatePartnerDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.partnersService.create(siteId, req.admin.id, dto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Patch(':id')
  async update(
    @Param('siteId') siteId: string,
    @Param('id') id: string,
    @Body() dto: UpdatePartnerDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.partnersService.update(siteId, id, req.admin.id, dto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Post('reorder')
  async reorder(
    @Param('siteId') siteId: string,
    @Body() dto: ReorderPartnersDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.partnersService.reorder(siteId, req.admin.id, dto);
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
      return await this.partnersService.remove(siteId, id, req.admin.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }
}
