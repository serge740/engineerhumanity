import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';

@Injectable()
export class ComponentsService {
  constructor(private readonly prisma: PrismaService) {}

  private async assertSiteOwner(siteId: string, adminId: string) {
    const site = await this.prisma.site.findFirst({ where: { id: siteId, adminId } });
    if (!site) throw new NotFoundException('Site not found');
    return site;
  }

  async findAll(siteId: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    return this.prisma.component.findMany({
      where: { siteId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(siteId: string, id: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    const component = await this.prisma.component.findFirst({ where: { id, siteId } });
    if (!component) throw new NotFoundException('Component not found');
    return component;
  }

  async create(siteId: string, adminId: string, dto: CreateComponentDto) {
    await this.assertSiteOwner(siteId, adminId);
    if (!dto.name?.trim()) throw new BadRequestException('Name is required');
    if (!dto.tag?.trim())  throw new BadRequestException('Tag is required');

    return this.prisma.component.create({
      data: {
        siteId,
        name: dto.name.trim(),
        tag:  dto.tag.trim(),
        html: dto.html ?? [],
      },
    });
  }

  async update(siteId: string, id: string, adminId: string, dto: UpdateComponentDto) {
    await this.assertSiteOwner(siteId, adminId);
    const component = await this.prisma.component.findFirst({ where: { id, siteId } });
    if (!component) throw new NotFoundException('Component not found');

    const data: any = {};
    if (dto.name !== undefined) data.name = dto.name.trim();
    if (dto.tag  !== undefined) data.tag  = dto.tag.trim();
    if (dto.html !== undefined) data.html = dto.html;

    return this.prisma.component.update({ where: { id }, data });
  }

  async remove(siteId: string, id: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    const component = await this.prisma.component.findFirst({ where: { id, siteId } });
    if (!component) throw new NotFoundException('Component not found');
    await this.prisma.component.delete({ where: { id } });
    return { message: 'Component deleted' };
  }
}
