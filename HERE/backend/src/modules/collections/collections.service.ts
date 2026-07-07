import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CreateCollectionItemDto } from './dto/create-collection-item.dto';
import { UpdateCollectionItemDto } from './dto/update-collection-item.dto';
import { ReorderItemsDto } from './dto/reorder-items.dto';
import { assertValidFields } from 'src/common/component-field.interface';

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}

  private toSlug(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  private async uniqueSlug(siteId: string, base: string, excludeId?: string): Promise<string> {
    let slug = this.toSlug(base);
    let attempt = 0;

    while (true) {
      const candidate = attempt === 0 ? slug : `${slug}-${attempt + 1}`;
      const existing = await this.prisma.collection.findUnique({
        where: { siteId_slug: { siteId, slug: candidate } },
      });
      if (!existing || existing.id === excludeId) return candidate;
      attempt++;
    }
  }

  private async assertSiteOwner(siteId: string, adminId: string) {
    const site = await this.prisma.site.findFirst({ where: { id: siteId, adminId } });
    if (!site) throw new NotFoundException('Site not found');
    return site;
  }

  private async getOwnedCollection(siteId: string, id: string) {
    const collection = await this.prisma.collection.findFirst({ where: { id, siteId } });
    if (!collection) throw new NotFoundException('Collection not found');
    return collection;
  }

  async findAll(siteId: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    return this.prisma.collection.findMany({
      where: { siteId },
      orderBy: { createdAt: 'asc' },
      include: { _count: { select: { items: true } } },
    });
  }

  async findOne(siteId: string, id: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    const collection = await this.prisma.collection.findFirst({
      where: { id, siteId },
      include: { items: { orderBy: { order: 'asc' } } },
    });
    if (!collection) throw new NotFoundException('Collection not found');
    return collection;
  }

  async create(siteId: string, adminId: string, dto: CreateCollectionDto) {
    await this.assertSiteOwner(siteId, adminId);
    if (!dto.name?.trim()) throw new BadRequestException('Name is required');

    const fields = dto.fields ?? [];
    try {
      assertValidFields(fields, 'fields');
    } catch (e) {
      throw new BadRequestException((e as Error).message);
    }

    const slug = await this.uniqueSlug(siteId, dto.slug || dto.name);

    return this.prisma.collection.create({
      data: { siteId, name: dto.name.trim(), slug, fields: fields as unknown as Prisma.InputJsonValue },
    });
  }

  async update(siteId: string, id: string, adminId: string, dto: UpdateCollectionDto) {
    await this.assertSiteOwner(siteId, adminId);
    await this.getOwnedCollection(siteId, id);

    const data: Record<string, unknown> = {};
    if (dto.name !== undefined) data.name = dto.name.trim();
    if (dto.fields !== undefined) {
      try {
        assertValidFields(dto.fields, 'fields');
      } catch (e) {
        throw new BadRequestException((e as Error).message);
      }
      // Field `key`s are treated as stable identifiers referenced by {{key}} tokens
      // in dynamic Components and by CollectionItem.data keys. Renaming a key here
      // is indistinguishable from "remove old key, add new key" — any existing
      // item data under the old key is simply orphaned (harmless), not migrated.
      data.fields = dto.fields;
    }

    return this.prisma.collection.update({ where: { id }, data });
  }

  async remove(siteId: string, id: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    await this.getOwnedCollection(siteId, id);
    await this.prisma.collection.delete({ where: { id } });
    return { message: 'Collection deleted' };
  }

  // ── Items ────────────────────────────────────────────────────────────────

  async findItems(siteId: string, collectionId: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    await this.getOwnedCollection(siteId, collectionId);
    return this.prisma.collectionItem.findMany({
      where: { collectionId },
      orderBy: { order: 'asc' },
    });
  }

  async createItem(siteId: string, collectionId: string, adminId: string, dto: CreateCollectionItemDto) {
    await this.assertSiteOwner(siteId, adminId);
    await this.getOwnedCollection(siteId, collectionId);
    if (!dto.data || typeof dto.data !== 'object') throw new BadRequestException('data is required');

    const last = await this.prisma.collectionItem.findFirst({
      where: { collectionId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    return this.prisma.collectionItem.create({
      data: { collectionId, data: dto.data as Prisma.InputJsonValue, order: (last?.order ?? -1) + 1 },
    });
  }

  async updateItem(
    siteId: string,
    collectionId: string,
    itemId: string,
    adminId: string,
    dto: UpdateCollectionItemDto,
  ) {
    await this.assertSiteOwner(siteId, adminId);
    await this.getOwnedCollection(siteId, collectionId);
    const item = await this.prisma.collectionItem.findFirst({ where: { id: itemId, collectionId } });
    if (!item) throw new NotFoundException('Item not found');

    const data: Record<string, unknown> = {};
    if (dto.data !== undefined) data.data = dto.data;
    if (dto.order !== undefined) data.order = dto.order;

    return this.prisma.collectionItem.update({ where: { id: itemId }, data });
  }

  async removeItem(siteId: string, collectionId: string, itemId: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    await this.getOwnedCollection(siteId, collectionId);
    const item = await this.prisma.collectionItem.findFirst({ where: { id: itemId, collectionId } });
    if (!item) throw new NotFoundException('Item not found');
    await this.prisma.collectionItem.delete({ where: { id: itemId } });
    return { message: 'Item deleted' };
  }

  async reorderItems(siteId: string, collectionId: string, adminId: string, dto: ReorderItemsDto) {
    await this.assertSiteOwner(siteId, adminId);
    await this.getOwnedCollection(siteId, collectionId);
    if (!Array.isArray(dto.items)) throw new BadRequestException('items must be an array');

    await this.prisma.$transaction(
      dto.items.map(({ id, order }) =>
        this.prisma.collectionItem.update({ where: { id }, data: { order } }),
      ),
    );
    return { message: 'Reordered' };
  }
}
