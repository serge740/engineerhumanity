import { Controller, Get, HttpException, Param, Query } from '@nestjs/common';
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

  @Get('team-members')
  async getTeamMembers(@Query('group') group: 'board' | 'management' | undefined) {
    try {
      return await this.publicService.getTeamMembers(group);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Get('events')
  async getEvents(@Query('status') status: 'upcoming' | 'past' | undefined) {
    try {
      return await this.publicService.getEvents(status);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Get('events/:id')
  async getEvent(@Param('id') id: string) {
    try {
      return await this.publicService.getEvent(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 404);
    }
  }

  @Get('stories')
  async getStories(@Query('group') group: string | undefined) {
    try {
      return await this.publicService.getStories(group);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
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
