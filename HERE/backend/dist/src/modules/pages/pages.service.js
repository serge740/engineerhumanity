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
exports.PagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PagesService = class PagesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    toSlug(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }
    async uniqueSlug(siteId, base, excludeId) {
        let slug = this.toSlug(base);
        let attempt = 0;
        while (true) {
            const candidate = attempt === 0 ? slug : `${slug}-${attempt + 1}`;
            const existing = await this.prisma.page.findUnique({
                where: { siteId_slug: { siteId, slug: candidate } },
            });
            if (!existing || existing.id === excludeId)
                return candidate;
            attempt++;
        }
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
        return this.prisma.page.findMany({
            where: { siteId },
            orderBy: { createdAt: 'asc' },
            select: {
                id: true,
                slug: true,
                title: true,
                description: true,
                published: true,
                isLanding: true,
                version: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async findOne(siteId, slug, adminId) {
        await this.assertSiteOwner(siteId, adminId);
        const page = await this.prisma.page.findUnique({
            where: { siteId_slug: { siteId, slug } },
        });
        if (!page)
            throw new common_1.NotFoundException('Page not found');
        return page;
    }
    async create(siteId, adminId, dto) {
        await this.assertSiteOwner(siteId, adminId);
        if (!dto.title?.trim())
            throw new common_1.BadRequestException('Title is required');
        const slug = await this.uniqueSlug(siteId, dto.slug || dto.title);
        return this.prisma.page.create({
            data: {
                siteId,
                slug,
                title: dto.title.trim(),
                description: dto.description ?? null,
                html: dto.html ?? [],
                metadata: dto.metadata ?? {},
            },
        });
    }
    async update(siteId, slug, adminId, dto) {
        await this.assertSiteOwner(siteId, adminId);
        const page = await this.prisma.page.findUnique({
            where: { siteId_slug: { siteId, slug } },
        });
        if (!page)
            throw new common_1.NotFoundException('Page not found');
        const data = { version: { increment: 1 } };
        if (dto.title !== undefined)
            data.title = dto.title.trim();
        if (dto.slug !== undefined)
            data.slug = await this.uniqueSlug(siteId, dto.slug, page.id);
        if (dto.description !== undefined)
            data.description = dto.description;
        if (dto.html !== undefined)
            data.html = dto.html;
        if (dto.metadata !== undefined)
            data.metadata = dto.metadata;
        if (dto.isLanding !== undefined)
            data.isLanding = dto.isLanding;
        if (dto.isLanding === true) {
            await this.prisma.page.updateMany({
                where: { siteId, id: { not: page.id } },
                data: { isLanding: false },
            });
        }
        return this.prisma.page.update({ where: { id: page.id }, data });
    }
    async publish(siteId, slug, adminId) {
        await this.assertSiteOwner(siteId, adminId);
        const page = await this.prisma.page.findUnique({
            where: { siteId_slug: { siteId, slug } },
        });
        if (!page)
            throw new common_1.NotFoundException('Page not found');
        return this.prisma.page.update({
            where: { id: page.id },
            data: { published: true },
        });
    }
    async unpublish(siteId, slug, adminId) {
        await this.assertSiteOwner(siteId, adminId);
        const page = await this.prisma.page.findUnique({
            where: { siteId_slug: { siteId, slug } },
        });
        if (!page)
            throw new common_1.NotFoundException('Page not found');
        return this.prisma.page.update({
            where: { id: page.id },
            data: { published: false },
        });
    }
    async remove(siteId, slug, adminId) {
        await this.assertSiteOwner(siteId, adminId);
        const page = await this.prisma.page.findUnique({
            where: { siteId_slug: { siteId, slug } },
        });
        if (!page)
            throw new common_1.NotFoundException('Page not found');
        await this.prisma.page.delete({ where: { id: page.id } });
        return { message: 'Page deleted' };
    }
    async duplicate(siteId, slug, adminId) {
        await this.assertSiteOwner(siteId, adminId);
        const page = await this.prisma.page.findUnique({
            where: { siteId_slug: { siteId, slug } },
        });
        if (!page)
            throw new common_1.NotFoundException('Page not found');
        const newSlug = await this.uniqueSlug(siteId, `${page.slug}-copy`);
        return this.prisma.page.create({
            data: {
                siteId,
                slug: newSlug,
                title: `${page.title} (Copy)`,
                description: page.description,
                html: page.html,
                metadata: page.metadata,
                published: false,
            },
        });
    }
};
exports.PagesService = PagesService;
exports.PagesService = PagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PagesService);
//# sourceMappingURL=pages.service.js.map