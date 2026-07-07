import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { ReorderStoriesDto } from './dto/reorder-stories.dto';

const GROUPS = ['success', 'success-summary', 'testimony'];

@Injectable()
export class StoriesService {
  constructor(private readonly prisma: PrismaService) {}

  private async assertSiteOwner(siteId: string, adminId: string) {
    const site = await this.prisma.site.findFirst({
      where: { id: siteId, adminId },
    });
    if (!site) throw new NotFoundException('Site not found');
    return site;
  }

  private async assertStory(siteId: string, id: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    const story = await this.prisma.story.findFirst({
      where: { id, siteId },
    });
    if (!story) throw new NotFoundException('Story not found');
    return story;
  }

  async findAll(siteId: string, adminId: string, group?: string) {
    await this.assertSiteOwner(siteId, adminId);
    return this.prisma.story.findMany({
      where: { siteId, ...(group ? { group } : {}) },
      orderBy: { order: 'asc' },
    });
  }

  async create(siteId: string, adminId: string, dto: CreateStoryDto) {
    await this.assertSiteOwner(siteId, adminId);
    if (!dto.group || !GROUPS.includes(dto.group)) {
      throw new BadRequestException(
        'group must be "success", "success-summary" or "testimony"',
      );
    }
    if (!dto.name?.trim()) throw new BadRequestException('Name is required');

    const last = await this.prisma.story.findFirst({
      where: { siteId, group: dto.group },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const isSummary = dto.group === 'success-summary';

    return this.prisma.story.create({
      data: {
        siteId,
        group: dto.group,
        name: dto.name.trim(),
        role: isSummary ? null : (dto.role ?? null),
        image: isSummary ? null : (dto.image ?? null),
        summary: isSummary ? null : (dto.summary ?? null),
        story: isSummary ? (dto.story ?? null) : null,
        intro: isSummary ? null : (dto.intro ?? null),
        sections: isSummary ? undefined : (dto.sections ?? []),
        order: (last?.order ?? -1) + 1,
      },
    });
  }

  async update(siteId: string, id: string, adminId: string, dto: UpdateStoryDto) {
    const existing = await this.assertStory(siteId, id, adminId);
    const isSummary = existing.group === 'success-summary';

    const data: Record<string, unknown> = {};
    if (dto.name !== undefined) data.name = dto.name.trim();
    if (!isSummary) {
      if (dto.role !== undefined) data.role = dto.role;
      if (dto.image !== undefined) data.image = dto.image;
      if (dto.summary !== undefined) data.summary = dto.summary;
      if (dto.intro !== undefined) data.intro = dto.intro;
      if (dto.sections !== undefined) data.sections = dto.sections;
    } else if (dto.story !== undefined) {
      data.story = dto.story;
    }

    return this.prisma.story.update({ where: { id }, data });
  }

  async remove(siteId: string, id: string, adminId: string) {
    await this.assertStory(siteId, id, adminId);
    await this.prisma.story.delete({ where: { id } });
    return { message: 'Story deleted' };
  }

  async reorder(siteId: string, adminId: string, dto: ReorderStoriesDto) {
    await this.assertSiteOwner(siteId, adminId);
    await this.prisma.$transaction(
      dto.items.map(({ id, order }) =>
        this.prisma.story.updateMany({
          where: { id, siteId },
          data: { order },
        }),
      ),
    );
    return { message: 'Reordered' };
  }
}
