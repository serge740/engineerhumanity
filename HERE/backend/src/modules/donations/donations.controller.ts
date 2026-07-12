import { Body, Controller, Get, HttpException, Param, Post, Query } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';

// No auth guard — donation creation and status verification are fully public
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  async create(@Body() dto: CreateDonationDto) {
    try {
      return await this.donationsService.create(dto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Get('verify/:sessionId')
  async verify(
    @Param('sessionId') sessionId: string,
    @Query('cancelled') cancelled: string | undefined,
  ) {
    try {
      return await this.donationsService.verifySession(sessionId, { cancelled: cancelled === '1' });
    } catch (error) {
      throw new HttpException(error.message, error.status || 404);
    }
  }
}
