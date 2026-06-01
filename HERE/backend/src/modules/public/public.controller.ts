import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { PublicService } from './public.service';

// No auth guard — these endpoints are fully public
@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('landing')
  async getLanding() {
    try {
      return await this.publicService.getLandingPage();
    } catch (error) {
      throw new HttpException(error.message, error.status || 404);
    }
  }

  @Get(':slug')
  async getPage(@Param('slug') slug: string) {
    try {
      return await this.publicService.getPublicPage(slug);
    } catch (error) {
      throw new HttpException(error.message, error.status || 404);
    }
  }
}
