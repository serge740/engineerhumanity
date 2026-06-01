import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SitesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(adminId: string) {
    return this.prisma.site.findMany({
      where: { adminId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { pages: true, components: true, assets: true } },
      },
    });
  }

  async findOne(id: string, adminId: string) {
    const site = await this.prisma.site.findFirst({
      where: { id, adminId },
      include: {
        pages: {
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            slug: true,
            title: true,
            published: true,
            version: true,
            updatedAt: true,
          },
        },
        components: true,
        assets: true,
      },
    });
    if (!site) throw new NotFoundException('Site not found');
    return site;
  }

  async create(adminId: string, dto: CreateSiteDto) {
    if (!dto.name?.trim()) throw new BadRequestException('Site name is required');

    return this.prisma.site.create({
      data: {
        adminId,
        name: dto.name.trim(),
        domain: dto.domain ?? null,
        metadata: dto.metadata ?? {},
        globalCSS: dto.globalCSS ?? '',
        globalJS: dto.globalJS ?? '',
      },
    });
  }

  async update(id: string, adminId: string, dto: UpdateSiteDto) {
    await this.assertOwner(id, adminId);

    const data: any = {};
    if (dto.name !== undefined) data.name = dto.name.trim();
    if (dto.domain !== undefined) data.domain = dto.domain || null;
    if (dto.metadata !== undefined) data.metadata = dto.metadata;
    if (dto.globalCSS !== undefined) data.globalCSS = dto.globalCSS;
    if (dto.globalJS !== undefined) data.globalJS = dto.globalJS;
    if (dto.published !== undefined) {
      data.published = dto.published;
      data.version = { increment: 1 };
    }

    return this.prisma.site.update({ where: { id }, data });
  }

  async remove(id: string, adminId: string) {
    await this.assertOwner(id, adminId);
    await this.prisma.site.delete({ where: { id } });
    return { message: 'Site deleted' };
  }

  private async assertOwner(siteId: string, adminId: string) {
    const site = await this.prisma.site.findFirst({
      where: { id: siteId, adminId },
    });
    if (!site) throw new NotFoundException('Site not found');
    return site;
  }
}
