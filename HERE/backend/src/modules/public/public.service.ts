import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async getPublicPage(slug: string) {
    const page = await this.prisma.page.findFirst({
      where: { slug, published: true },
      select: { slug: true, title: true, description: true, html: true, metadata: true },
    });
    if (!page) throw new NotFoundException('Page not found or not published');
    return page;
  }
}
