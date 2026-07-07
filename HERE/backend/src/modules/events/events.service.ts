import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ReorderEventsDto } from './dto/reorder-events.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  private async assertSiteOwner(siteId: string, adminId: string) {
    const site = await this.prisma.site.findFirst({
      where: { id: siteId, adminId },
    });
    if (!site) throw new NotFoundException('Site not found');
    return site;
  }

  private async assertEvent(siteId: string, id: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    const event = await this.prisma.event.findFirst({
      where: { id, siteId },
    });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async findAll(siteId: string, adminId: string, status?: string) {
    await this.assertSiteOwner(siteId, adminId);
    return this.prisma.event.findMany({
      where: { siteId, ...(status ? { status } : {}) },
      orderBy: { order: 'asc' },
    });
  }

  async create(siteId: string, adminId: string, dto: CreateEventDto) {
    await this.assertSiteOwner(siteId, adminId);
    if (!dto.status || !['upcoming', 'past'].includes(dto.status)) {
      throw new BadRequestException('status must be "upcoming" or "past"');
    }
    if (!dto.title?.trim()) throw new BadRequestException('Title is required');
    if (!dto.date?.trim()) throw new BadRequestException('Date is required');
    if (!dto.location?.trim()) throw new BadRequestException('Location is required');

    const last = await this.prisma.event.findFirst({
      where: { siteId, status: dto.status },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    return this.prisma.event.create({
      data: {
        siteId,
        status: dto.status,
        title: dto.title.trim(),
        date: dto.date.trim(),
        time: dto.status === 'upcoming' ? (dto.time ?? null) : null,
        location: dto.location.trim(),
        attendees: dto.status === 'past' ? (dto.attendees ?? null) : null,
        description: dto.description ?? '',
        paragraphs: dto.paragraphs ?? [],
        highlights: dto.highlights ?? [],
        images: dto.images ?? [],
        contacts: dto.status === 'upcoming' ? (dto.contacts ?? []) : undefined,
        order: (last?.order ?? -1) + 1,
      },
    });
  }

  async update(siteId: string, id: string, adminId: string, dto: UpdateEventDto) {
    const event = await this.assertEvent(siteId, id, adminId);

    const data: Record<string, unknown> = {};
    if (dto.title !== undefined) data.title = dto.title.trim();
    if (dto.date !== undefined) data.date = dto.date.trim();
    if (dto.location !== undefined) data.location = dto.location.trim();
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.paragraphs !== undefined) data.paragraphs = dto.paragraphs;
    if (dto.highlights !== undefined) data.highlights = dto.highlights;
    if (dto.images !== undefined) data.images = dto.images;
    if (dto.time !== undefined && event.status === 'upcoming') data.time = dto.time;
    if (dto.attendees !== undefined && event.status === 'past') data.attendees = dto.attendees;
    if (dto.contacts !== undefined && event.status === 'upcoming') data.contacts = dto.contacts;

    return this.prisma.event.update({ where: { id }, data });
  }

  async remove(siteId: string, id: string, adminId: string) {
    await this.assertEvent(siteId, id, adminId);
    await this.prisma.event.delete({ where: { id } });
    return { message: 'Event deleted' };
  }

  async reorder(siteId: string, adminId: string, dto: ReorderEventsDto) {
    await this.assertSiteOwner(siteId, adminId);
    await this.prisma.$transaction(
      dto.items.map(({ id, order }) =>
        this.prisma.event.updateMany({
          where: { id, siteId },
          data: { order },
        }),
      ),
    );
    return { message: 'Reordered' };
  }
}
