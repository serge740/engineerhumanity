import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { ReorderPartnersDto } from './dto/reorder-partners.dto';

// The Footer renders `link` as an href, so only web URLs are accepted —
// otherwise a `javascript:` link would run in every visitor's browser.
function assertWebUrl(link: string) {
  let url: URL;
  try {
    url = new URL(link);
  } catch {
    throw new BadRequestException('Link must be a valid URL');
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new BadRequestException('Link must start with http:// or https://');
  }
}

@Injectable()
export class PartnersService {
  constructor(private readonly prisma: PrismaService) {}

  private async assertSiteOwner(siteId: string, adminId: string) {
    const site = await this.prisma.site.findFirst({
      where: { id: siteId, adminId },
    });
    if (!site) throw new NotFoundException('Site not found');
    return site;
  }

  private async assertPartner(siteId: string, id: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    const partner = await this.prisma.partner.findFirst({
      where: { id, siteId },
    });
    if (!partner) throw new NotFoundException('Partner not found');
    return partner;
  }

  async findAll(siteId: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    return this.prisma.partner.findMany({
      where: { siteId },
      orderBy: { order: 'asc' },
    });
  }

  async create(siteId: string, adminId: string, dto: CreatePartnerDto) {
    await this.assertSiteOwner(siteId, adminId);
    if (!dto.name?.trim()) throw new BadRequestException('Name is required');
    if (!dto.link?.trim()) throw new BadRequestException('Link is required');
    assertWebUrl(dto.link.trim());

    const last = await this.prisma.partner.findFirst({
      where: { siteId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    return this.prisma.partner.create({
      data: {
        siteId,
        name: dto.name.trim(),
        image: dto.image ?? null,
        link: dto.link.trim(),
        description: dto.description?.trim() || null,
        order: (last?.order ?? -1) + 1,
      },
    });
  }

  async update(siteId: string, id: string, adminId: string, dto: UpdatePartnerDto) {
    await this.assertPartner(siteId, id, adminId);

    const data: Record<string, unknown> = {};
    if (dto.name !== undefined) {
      if (!dto.name.trim()) throw new BadRequestException('Name is required');
      data.name = dto.name.trim();
    }
    if (dto.link !== undefined) {
      if (!dto.link.trim()) throw new BadRequestException('Link is required');
      assertWebUrl(dto.link.trim());
      data.link = dto.link.trim();
    }
    if (dto.image !== undefined) data.image = dto.image;
    if (dto.description !== undefined) data.description = dto.description?.trim() || null;

    return this.prisma.partner.update({ where: { id }, data });
  }

  async remove(siteId: string, id: string, adminId: string) {
    await this.assertPartner(siteId, id, adminId);
    await this.prisma.partner.delete({ where: { id } });
    return { message: 'Partner deleted' };
  }

  async reorder(siteId: string, adminId: string, dto: ReorderPartnersDto) {
    await this.assertSiteOwner(siteId, adminId);
    await this.prisma.$transaction(
      dto.items.map(({ id, order }) =>
        this.prisma.partner.updateMany({
          where: { id, siteId },
          data: { order },
        }),
      ),
    );
    return { message: 'Reordered' };
  }
}
