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
import { TeamService } from './team.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { ReorderTeamMembersDto } from './dto/reorder-team-members.dto';
import { AdminJwtAuthGuard } from 'src/guards/adminGuard.guard';
import { RequestWithAdmin } from 'src/common/interfaces/admin.interface';

@Controller('sites/:siteId/team-members')
@UseGuards(AdminJwtAuthGuard)
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async findAll(
    @Param('siteId') siteId: string,
    @Query('group') group: string | undefined,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.teamService.findAll(siteId, req.admin.id, group);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post()
  async create(
    @Param('siteId') siteId: string,
    @Body() dto: CreateTeamMemberDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.teamService.create(siteId, req.admin.id, dto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Patch(':id')
  async update(
    @Param('siteId') siteId: string,
    @Param('id') id: string,
    @Body() dto: UpdateTeamMemberDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.teamService.update(siteId, id, req.admin.id, dto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Post('reorder')
  async reorder(
    @Param('siteId') siteId: string,
    @Body() dto: ReorderTeamMembersDto,
    @Req() req: RequestWithAdmin,
  ) {
    try {
      return await this.teamService.reorder(siteId, req.admin.id, dto);
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
      return await this.teamService.remove(siteId, id, req.admin.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }
}
