import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  expandCollectionNodes,
  PageElement,
  CollectionForExpansion,
  ComponentForExpansion,
} from 'src/common/collection-expansion';

@Injectable()
export class PublicService {
  constructor(private readonly prisma: PrismaService) {}

  async getLandingPage() {
    const page = await this.prisma.page.findFirst({
      where: { isLanding: true, published: true },
      select: { slug: true, title: true },
    });
    if (!page) throw new NotFoundException('No landing page set');
    return page;
  }

  async getTeamMembers(group?: 'board' | 'management') {
    if (group && !['board', 'management'].includes(group)) {
      throw new NotFoundException('Invalid group');
    }
    return this.prisma.teamMember.findMany({
      where: group ? { group } : undefined,
      orderBy: { order: 'asc' },
    });
  }

  async getEvents(status?: 'upcoming' | 'past') {
    if (status && !['upcoming', 'past'].includes(status)) {
      throw new NotFoundException('Invalid status');
    }
    return this.prisma.event.findMany({
      where: status ? { status } : undefined,
      orderBy: { order: 'asc' },
    });
  }

  async getEvent(id: string) {
    const event = await this.prisma.event.findFirst({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async getStories(group?: string) {
    if (group && !['success', 'success-summary', 'testimony'].includes(group)) {
      throw new NotFoundException('Invalid group');
    }
    return this.prisma.story.findMany({
      where: group ? { group } : undefined,
      orderBy: { order: 'asc' },
    });
  }

  async getPublicPage(slug: string) {
    const page = await this.prisma.page.findFirst({
      where: { slug, published: true },
      select: {
        siteId: true,
        slug: true,
        title: true,
        description: true,
        html: true,
        metadata: true,
      },
    });
    if (!page) throw new NotFoundException('Page not found or not published');

    const html = await this.expandPageHtml(page.siteId, page.html);
    return {
      slug: page.slug,
      title: page.title,
      description: page.description,
      html,
      metadata: page.metadata,
    };
  }

  /** Resolves any `_collection` marker nodes in a page's html into real, repeated card instances. */
  private async expandPageHtml(siteId: string, html: unknown): Promise<PageElement[]> {
    const tree = (Array.isArray(html) ? html : []) as PageElement[];

    const [collections, components] = await Promise.all([
      this.prisma.collection.findMany({
        where: { siteId },
        include: { items: { orderBy: { order: 'asc' } } },
      }),
      this.prisma.component.findMany({ where: { siteId, type: 'dynamic' } }),
    ]);

    const collectionsById = new Map<string, CollectionForExpansion>(
      collections.map(c => [
        c.id,
        {
          id: c.id,
          fields: c.fields as any,
          items: c.items.map(i => ({ data: i.data as Record<string, unknown> })),
        },
      ]),
    );
    const componentsById = new Map<string, ComponentForExpansion>(
      components.map(c => [
        c.id,
        {
          id: c.id,
          html: (Array.isArray(c.html) ? c.html : []) as PageElement[],
          modalHtml: (Array.isArray(c.modalHtml) ? c.modalHtml : null) as PageElement[] | null,
        },
      ]),
    );

    return expandCollectionNodes(tree, collectionsById, componentsById);
  }
}
