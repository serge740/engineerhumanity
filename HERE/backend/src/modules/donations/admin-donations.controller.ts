import { Controller, Get, HttpException, Param, Post, Query, UseGuards } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { AdminJwtAuthGuard } from 'src/guards/adminGuard.guard';

@Controller('admin/donations')
@UseGuards(AdminJwtAuthGuard)
export class AdminDonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Get()
  async findAll(
    @Query('status') status: string | undefined,
    @Query('search') search: string | undefined,
    @Query('dateFrom') dateFrom: string | undefined,
    @Query('dateTo') dateTo: string | undefined,
    @Query('page') page: string | undefined,
    @Query('limit') limit: string | undefined,
  ) {
    try {
      return await this.donationsService.findAllForAdmin({
        status,
        search,
        dateFrom,
        dateTo,
        page: page ? parseInt(page, 10) : undefined,
        limit: limit ? parseInt(limit, 10) : undefined,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get('stats')
  async stats() {
    try {
      return await this.donationsService.getStats();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post('sync')
  async sync() {
    try {
      return await this.donationsService.syncPendingDonations();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.donationsService.findOneForAdmin(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 404);
    }
  }
}
