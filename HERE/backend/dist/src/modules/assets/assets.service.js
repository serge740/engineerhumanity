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
const fs = require("fs");
const path = require("path");
let AssetsService = class AssetsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
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
    async remove(siteId, id, adminId) {
        await this.assertSiteOwner(siteId, adminId);
        const asset = await this.prisma.asset.findFirst({
            where: { id, siteId },
        });
        if (!asset)
            throw new common_1.NotFoundException('Asset not found');
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
};
exports.AssetsService = AssetsService;
exports.AssetsService = AssetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssetsService);
//# sourceMappingURL=assets.service.js.map