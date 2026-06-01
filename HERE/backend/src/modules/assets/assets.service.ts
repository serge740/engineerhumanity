import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AssetsService {
  constructor(private readonly prisma: PrismaService) {}

  private async assertSiteOwner(siteId: string, adminId: string) {
    const site = await this.prisma.site.findFirst({
      where: { id: siteId, adminId },
    });
    if (!site) throw new NotFoundException('Site not found');
    return site;
  }

  async findAll(siteId: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    return this.prisma.asset.findMany({
      where: { siteId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(
    siteId: string,
    adminId: string,
    file: Express.Multer.File,
    type: 'image' | 'font',
  ) {
    await this.assertSiteOwner(siteId, adminId);

    const url = `/uploads/${file.filename}`;

    return this.prisma.asset.create({
      data: {
        siteId,
        type,
        name: file.originalname,
        url,
        size: file.size,
      },
    });
  }

  async remove(siteId: string, id: string, adminId: string) {
    await this.assertSiteOwner(siteId, adminId);
    const asset = await this.prisma.asset.findFirst({
      where: { id, siteId },
    });
    if (!asset) throw new NotFoundException('Asset not found');

    // Remove file from disk if it's a local upload
    if (asset.url.startsWith('/uploads/')) {
      const filename = asset.url.replace('/uploads/', '');
      const filePath = path.join(process.cwd(), 'Uploads', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await this.prisma.asset.delete({ where: { id } });
    return { message: 'Asset deleted' };
  }
}
