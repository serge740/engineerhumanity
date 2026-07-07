import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { ReorderTeamMembersDto } from './dto/reorder-team-members.dto';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  private async assertSiteOwner(siteId: string, adminId: string) {
    const site = await this.prisma.site.findFirst({
      where: { id: siteId, adminId },
    });
    if (!site) throw new NotFoundException('Site not found');
    return site;
  }

  private async assertMember(siteId: string, id: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    const member = await this.prisma.teamMember.findFirst({
      where: { id, siteId },
    });
    if (!member) throw new NotFoundException('Team member not found');
    return member;
  }

  async findAll(siteId: string, adminId: string, group?: string) {
    await this.assertSiteOwner(siteId, adminId);
    return this.prisma.teamMember.findMany({
      where: { siteId, ...(group ? { group } : {}) },
      orderBy: { order: 'asc' },
    });
  }

  async create(siteId: string, adminId: string, dto: CreateTeamMemberDto) {
    await this.assertSiteOwner(siteId, adminId);
    if (!dto.group || !['board', 'management'].includes(dto.group)) {
      throw new BadRequestException('group must be "board" or "management"');
    }
    if (!dto.name?.trim()) throw new BadRequestException('Name is required');
    if (!dto.title?.trim()) throw new BadRequestException('Title is required');

    const last = await this.prisma.teamMember.findFirst({
      where: { siteId, group: dto.group },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    return this.prisma.teamMember.create({
      data: {
        siteId,
        group: dto.group,
        name: dto.name.trim(),
        title: dto.title.trim(),
        credentials: dto.credentials ?? null,
        image: dto.image ?? null,
        linkedIn: dto.linkedIn ?? null,
        bio: dto.bio ?? null,
        role: dto.group === 'board' ? (dto.role ?? null) : null,
        category: dto.group === 'management' ? (dto.category ?? null) : null,
        order: (last?.order ?? -1) + 1,
      },
    });
  }

  async update(
    siteId: string,
    id: string,
    adminId: string,
    dto: UpdateTeamMemberDto,
  ) {
    const member = await this.assertMember(siteId, id, adminId);

    const data: Record<string, unknown> = {};
    if (dto.name !== undefined) data.name = dto.name.trim();
    if (dto.title !== undefined) data.title = dto.title.trim();
    if (dto.credentials !== undefined) data.credentials = dto.credentials;
    if (dto.image !== undefined) data.image = dto.image;
    if (dto.linkedIn !== undefined) data.linkedIn = dto.linkedIn;
    if (dto.bio !== undefined) data.bio = dto.bio;
    if (dto.role !== undefined && member.group === 'board') data.role = dto.role;
    if (dto.category !== undefined && member.group === 'management')
      data.category = dto.category;

    return this.prisma.teamMember.update({ where: { id }, data });
  }

  async remove(siteId: string, id: string, adminId: string) {
    await this.assertMember(siteId, id, adminId);
    await this.prisma.teamMember.delete({ where: { id } });
    return { message: 'Team member deleted' };
  }

  async reorder(
    siteId: string,
    adminId: string,
    dto: ReorderTeamMembersDto,
  ) {
    await this.assertSiteOwner(siteId, adminId);
    await this.prisma.$transaction(
      dto.items.map(({ id, order }) =>
        this.prisma.teamMember.updateMany({
          where: { id, siteId },
          data: { order },
        }),
      ),
    );
    return { message: 'Reordered' };
  }
}
