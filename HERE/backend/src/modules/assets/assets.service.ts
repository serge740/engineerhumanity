import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import * as fs from 'fs';
import * as path from 'path';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AssetsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

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

    if (type === 'image') {
      const result = await this.cloudinary.uploadImageFromBuffer(
        file.buffer,
        `sites/${siteId}/assets`,
      );
      return this.prisma.asset.create({
        data: {
          siteId,
          type,
          name: file.originalname,
          url: result.secure_url,
          publicId: result.public_id,
          size: file.size,
        },
      });
    }

    // Fonts stay on local disk — Cloudinary's CDN/transform features don't
    // apply to font binaries, and the interceptor now uses memoryStorage()
    // for every upload, so we write the buffer out ourselves here.
    const uploadsDir = path.join(process.cwd(), 'Uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    const filename = `${uuid()}${extname(file.originalname)}`;
    fs.writeFileSync(path.join(uploadsDir, filename), file.buffer);

    return this.prisma.asset.create({
      data: {
        siteId,
        type,
        name: file.originalname,
        url: `/uploads/${filename}`,
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

    if (asset.publicId) {
      // Cloudinary-backed asset — best-effort remote cleanup.
      await this.cloudinary.deleteImage(asset.publicId);
    } else if (asset.url.startsWith('/uploads/')) {
      // Legacy local-disk asset.
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
