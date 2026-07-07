"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const fs = require("fs");
const path = require("path");
const path_1 = require("path");
const uuid_1 = require("uuid");
let AssetsService = class AssetsService {
    prisma;
    cloudinary;
    constructor(prisma, cloudinary) {
        this.prisma = prisma;
        this.cloudinary = cloudinary;
    }
    async assertSiteOwner(siteId, adminId) {
        const site = await this.prisma.site.findFirst({
            where: { id: siteId, adminId },
        });
        if (!site)
            throw new common_1.NotFoundException('Site not found');
        return site;
    }
    async findAll(siteId, adminId) {
        await this.assertSiteOwner(siteId, adminId);
        return this.prisma.asset.findMany({
            where: { siteId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async create(siteId, adminId, file, type) {
        await this.assertSiteOwner(siteId, adminId);
        if (type === 'image') {
            const result = await this.cloudinary.uploadImageFromBuffer(file.buffer, `sites/${siteId}/assets`);
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
        const uploadsDir = path.join(process.cwd(), 'Uploads');
        if (!fs.existsSync(uploadsDir))
            fs.mkdirSync(uploadsDir, { recursive: true });
        const filename = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
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
    async remove(siteId, id, adminId) {
        await this.assertSiteOwner(siteId, adminId);
        const asset = await this.prisma.asset.findFirst({
            where: { id, siteId },
        });
        if (!asset)
            throw new common_1.NotFoundException('Asset not found');
        if (asset.publicId) {
            await this.cloudinary.deleteImage(asset.publicId);
        }
        else if (asset.url.startsWith('/uploads/')) {
            const filename = asset.url.replace('/uploads/', '');
            const filePath = path.join(process.cwd(), 'Uploads', filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        await this.prisma.asset.delete({ where: { id } });
        return { message: 'Asset deleted' };
    }
};
exports.AssetsService = AssetsService;
exports.AssetsService = AssetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService])
], AssetsService);
//# sourceMappingURL=assets.service.js.map