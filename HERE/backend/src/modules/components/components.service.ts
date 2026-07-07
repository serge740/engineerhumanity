import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import {
  ComponentField,
  ComponentFieldType,
  assertValidFields,
} from 'src/common/component-field.interface';

const TOKEN_RE = /\{\{\s*(\w+)\s*\}\}/g;

function guessFieldType(attrKey: string, tag: unknown): ComponentFieldType {
  if (attrKey === 'src' || (tag === 'img' && attrKey !== 'alt')) return 'image';
  if (attrKey === 'href') return 'url';
  return 'text';
}

function titleCase(key: string): string {
  const spaced = key.replace(/([A-Z])/g, ' $1').replace(/[_-]+/g, ' ').trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** Scans a component's `html` tree for `{{key}}` tokens, guessing a field type per key from where it's used. */
function scanTemplateTokens(nodes: unknown): Map<string, ComponentFieldType> {
  const found = new Map<string, ComponentFieldType>();

  function visit(el: unknown) {
    if (!el || typeof el !== 'object') return;
    const rec = el as Record<string, unknown>;
    for (const [k, v] of Object.entries(rec)) {
      if (k === 'children') continue;
      if (typeof v === 'string') {
        let m: RegExpExecArray | null;
        TOKEN_RE.lastIndex = 0;
        while ((m = TOKEN_RE.exec(v)) !== null) {
          const key = m[1];
          const guessed = guessFieldType(k, rec.tag);
          const existing = found.get(key);
          if (!existing || existing === 'text') found.set(key, guessed);
        }
      }
    }
    if (Array.isArray(rec.children)) rec.children.forEach(visit);
  }

  if (Array.isArray(nodes)) nodes.forEach(visit);
  return found;
}

/** Merges several token maps (e.g. from the card + the modal templates), preferring a non-'text' guess when keys collide. */
function mergeTokenMaps(...maps: Map<string, ComponentFieldType>[]): Map<string, ComponentFieldType> {
  const merged = new Map<string, ComponentFieldType>();
  for (const m of maps) {
    for (const [key, guessed] of m) {
      const existing = merged.get(key);
      if (!existing || existing === 'text') merged.set(key, guessed);
    }
  }
  return merged;
}

/** Adds newly-discovered keys (with a guessed type/label), keeps existing entries for keys still referenced, drops the rest. */
function syncSchema(
  detected: Map<string, ComponentFieldType>,
  previous: ComponentField[],
): ComponentField[] {
  const prevByKey = new Map(previous.map(f => [f.key, f]));
  return Array.from(detected.keys()).map(key => {
    const prev = prevByKey.get(key);
    if (prev) return prev;
    return { key, label: titleCase(key), type: detected.get(key)! };
  });
}

@Injectable()
export class ComponentsService {
  constructor(private readonly prisma: PrismaService) {}

  private async assertSiteOwner(siteId: string, adminId: string) {
    const site = await this.prisma.site.findFirst({ where: { id: siteId, adminId } });
    if (!site) throw new NotFoundException('Site not found');
    return site;
  }

  private async assertCollectionInSite(siteId: string, collectionId: string) {
    const collection = await this.prisma.collection.findFirst({ where: { id: collectionId, siteId } });
    if (!collection) throw new BadRequestException('collectionId does not belong to this site');
  }

  private validateType(type?: string) {
    if (type !== undefined && type !== 'static' && type !== 'dynamic') {
      throw new BadRequestException('type must be "static" or "dynamic"');
    }
  }

  async findAll(siteId: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    return this.prisma.component.findMany({
      where: { siteId },
      orderBy: { createdAt: 'asc' },
      include: { collection: { select: { id: true, name: true, slug: true } } },
    });
  }

  async findOne(siteId: string, id: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    const component = await this.prisma.component.findFirst({
      where: { id, siteId },
      include: { collection: { select: { id: true, name: true, slug: true } } },
    });
    if (!component) throw new NotFoundException('Component not found');
    return component;
  }

  async create(siteId: string, adminId: string, dto: CreateComponentDto) {
    await this.assertSiteOwner(siteId, adminId);
    if (!dto.name?.trim()) throw new BadRequestException('Name is required');
    if (!dto.tag?.trim()) throw new BadRequestException('Tag is required');
    this.validateType(dto.type);
    if (dto.schema !== undefined) {
      try {
        assertValidFields(dto.schema, 'schema');
      } catch (e) {
        throw new BadRequestException((e as Error).message);
      }
    }
    if (dto.collectionId) await this.assertCollectionInSite(siteId, dto.collectionId);

    const html = dto.html ?? [];
    const modalHtml = dto.modalHtml ?? null;
    const type = dto.type ?? 'static';
    const schema = type === 'dynamic'
      ? syncSchema(mergeTokenMaps(scanTemplateTokens(html), scanTemplateTokens(modalHtml)), dto.schema ?? [])
      : null;

    return this.prisma.component.create({
      data: {
        siteId,
        name: dto.name.trim(),
        tag: dto.tag.trim(),
        html,
        modalHtml: (modalHtml ?? undefined) as Prisma.InputJsonValue | undefined,
        type,
        schema: (schema ?? undefined) as Prisma.InputJsonValue | undefined,
        collectionId: dto.collectionId ?? null,
      },
    });
  }

  async update(siteId: string, id: string, adminId: string, dto: UpdateComponentDto) {
    await this.assertSiteOwner(siteId, adminId);
    const component = await this.prisma.component.findFirst({ where: { id, siteId } });
    if (!component) throw new NotFoundException('Component not found');

    this.validateType(dto.type);
    if (dto.schema !== undefined) {
      try {
        assertValidFields(dto.schema, 'schema');
      } catch (e) {
        throw new BadRequestException((e as Error).message);
      }
    }
    if (dto.collectionId) await this.assertCollectionInSite(siteId, dto.collectionId);

    const data: Record<string, unknown> = {};
    if (dto.name !== undefined) data.name = dto.name.trim();
    if (dto.tag !== undefined) data.tag = dto.tag.trim();
    if (dto.html !== undefined) data.html = dto.html;
    if (dto.modalHtml !== undefined) data.modalHtml = dto.modalHtml;
    if (dto.type !== undefined) data.type = dto.type;
    if (dto.collectionId !== undefined) data.collectionId = dto.collectionId;

    const nextType = dto.type ?? component.type;
    const nextHtml = dto.html !== undefined ? dto.html : component.html;
    const nextModalHtml = dto.modalHtml !== undefined ? dto.modalHtml : component.modalHtml;

    if (nextType === 'dynamic') {
      const previousSchema = dto.schema ?? ((component.schema as unknown as ComponentField[] | null) ?? []);
      data.schema = syncSchema(mergeTokenMaps(scanTemplateTokens(nextHtml), scanTemplateTokens(nextModalHtml)), previousSchema);
    } else if (dto.type === 'static') {
      data.schema = null;
    }

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
