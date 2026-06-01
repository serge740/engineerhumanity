import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(private readonly prisma: PrismaService) {}

  private toSlug(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  private async uniqueSlug(
    siteId: string,
    base: string,
    excludeId?: string,
  ): Promise<string> {
    let slug = this.toSlug(base);
    let attempt = 0;

    while (true) {
      const candidate = attempt === 0 ? slug : `${slug}-${attempt + 1}`;
      const existing = await this.prisma.page.findUnique({
        where: { siteId_slug: { siteId, slug: candidate } },
      });
      if (!existing || existing.id === excludeId) return candidate;
      attempt++;
    }
  }

  private async assertSiteOwner(siteId: string, adminId: string) {
    const site = await this.prisma.site.findFirst({
      where: { id: siteId, adminId },
    });
    if (!site) throw new NotFoundException('Site not found');
    return site;
  }

  async findAll(siteId: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    return this.prisma.page.findMany({
      where: { siteId },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        published: true,
        isLanding: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(siteId: string, slug: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    const page = await this.prisma.page.findUnique({
      where: { siteId_slug: { siteId, slug } },
    });
    if (!page) throw new NotFoundException('Page not found');
    return page;
  }

  async create(siteId: string, adminId: string, dto: CreatePageDto) {
    await this.assertSiteOwner(siteId, adminId);
    if (!dto.title?.trim()) throw new BadRequestException('Title is required');

    const slug = await this.uniqueSlug(
      siteId,
      dto.slug || dto.title,
    );

    return this.prisma.page.create({
      data: {
        siteId,
        slug,
        title: dto.title.trim(),
        description: dto.description ?? null,
        html: dto.html ?? [],
        metadata: dto.metadata ?? {},
      },
    });
  }

  async update(
    siteId: string,
    slug: string,
    adminId: string,
    dto: UpdatePageDto,
  ) {
    await this.assertSiteOwner(siteId, adminId);
    const page = await this.prisma.page.findUnique({
      where: { siteId_slug: { siteId, slug } },
    });
    if (!page) throw new NotFoundException('Page not found');

    const data: any = { version: { increment: 1 } };
    if (dto.title !== undefined) data.title = dto.title.trim();
    if (dto.slug !== undefined)
      data.slug = await this.uniqueSlug(siteId, dto.slug, page.id);
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.html !== undefined) data.html = dto.html;
    if (dto.metadata !== undefined) data.metadata = dto.metadata;
    if (dto.isLanding !== undefined) data.isLanding = dto.isLanding;

    // When marking this page as landing, clear the flag on all other pages first
    if (dto.isLanding === true) {
      await this.prisma.page.updateMany({
        where: { siteId, id: { not: page.id } },
        data: { isLanding: false },
      });
    }

    return this.prisma.page.update({ where: { id: page.id }, data });
  }

  async publish(siteId: string, slug: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    const page = await this.prisma.page.findUnique({
      where: { siteId_slug: { siteId, slug } },
    });
    if (!page) throw new NotFoundException('Page not found');

    return this.prisma.page.update({
      where: { id: page.id },
      data: { published: true },
    });
  }

  async unpublish(siteId: string, slug: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    const page = await this.prisma.page.findUnique({
      where: { siteId_slug: { siteId, slug } },
    });
    if (!page) throw new NotFoundException('Page not found');

    return this.prisma.page.update({
      where: { id: page.id },
      data: { published: false },
    });
  }

  async remove(siteId: string, slug: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    const page = await this.prisma.page.findUnique({
      where: { siteId_slug: { siteId, slug } },
    });
    if (!page) throw new NotFoundException('Page not found');

    await this.prisma.page.delete({ where: { id: page.id } });
    return { message: 'Page deleted' };
  }

  async duplicate(siteId: string, slug: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    const page = await this.prisma.page.findUnique({
      where: { siteId_slug: { siteId, slug } },
    });
    if (!page) throw new NotFoundException('Page not found');

    const newSlug = await this.uniqueSlug(siteId, `${page.slug}-copy`);

    return this.prisma.page.create({
      data: {
        siteId,
        slug: newSlug,
        title: `${page.title} (Copy)`,
        description: page.description,
        html: page.html as any,
        metadata: page.metadata as any,
        published: false,
      },
    });
  }
}
