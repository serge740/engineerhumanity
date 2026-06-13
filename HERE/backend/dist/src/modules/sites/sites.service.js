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
exports.SitesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SitesService = class SitesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(adminId) {
        const sites = await this.prisma.site.findMany({
            where: { adminId },
            orderBy: { createdAt: 'desc' },
            include: {
                _count: { select: { pages: true, components: true, assets: true } },
            },
        });
        if (sites.length > 0)
            return sites;
        const defaultSite = await this.prisma.site.create({
            data: {
                adminId,
                name: 'My Site',
                domain: null,
                metadata: {},
                globalCSS: '',
                globalJS: '',
            },
            include: {
                _count: { select: { pages: true, components: true, assets: true } },
            },
        });
        return [defaultSite];
    }
    async findOne(id, adminId) {
        const site = await this.prisma.site.findFirst({
            where: { id, adminId },
            include: {
                pages: {
                    orderBy: { createdAt: 'asc' },
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        published: true,
                        version: true,
                        updatedAt: true,
                    },
                },
                components: true,
                assets: true,
            },
        });
        if (!site)
            throw new common_1.NotFoundException('Site not found');
        return site;
    }
    async create(adminId, dto) {
        if (!dto.name?.trim())
            throw new common_1.BadRequestException('Site name is required');
        return this.prisma.site.create({
            data: {
                adminId,
                name: dto.name.trim(),
                domain: dto.domain ?? null,
                metadata: dto.metadata ?? {},
                globalCSS: dto.globalCSS ?? '',
                globalJS: dto.globalJS ?? '',
            },
        });
    }
    async update(id, adminId, dto) {
        await this.assertOwner(id, adminId);
        const data = {};
        if (dto.name !== undefined)
            data.name = dto.name.trim();
        if (dto.domain !== undefined)
            data.domain = dto.domain || null;
        if (dto.metadata !== undefined)
            data.metadata = dto.metadata;
        if (dto.globalCSS !== undefined)
            data.globalCSS = dto.globalCSS;
        if (dto.globalJS !== undefined)
            data.globalJS = dto.globalJS;
        if (dto.published !== undefined) {
            data.published = dto.published;
            data.version = { increment: 1 };
        }
        return this.prisma.site.update({ where: { id }, data });
    }
    async remove(id, adminId) {
        await this.assertOwner(id, adminId);
        await this.prisma.site.delete({ where: { id } });
        return { message: 'Site deleted' };
    }
    async assertOwner(siteId, adminId) {
        const site = await this.prisma.site.findFirst({
            where: { id: siteId, adminId },
        });
        if (!site)
            throw new common_1.NotFoundException('Site not found');
        return site;
    }
};
exports.SitesService = SitesService;
exports.SitesService = SitesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SitesService);
//# sourceMappingURL=sites.service.js.map