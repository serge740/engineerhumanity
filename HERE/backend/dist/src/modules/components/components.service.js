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
exports.ComponentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ComponentsService = class ComponentsService {
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
        return this.prisma.component.findMany({
            where: { siteId },
            orderBy: { createdAt: 'asc' },
        });
    }
    async findOne(siteId, id, adminId) {
        await this.assertSiteOwner(siteId, adminId);
        const component = await this.prisma.component.findFirst({
            where: { id, siteId },
        });
        if (!component)
            throw new common_1.NotFoundException('Component not found');
        return component;
    }
    async create(siteId, adminId, dto) {
        await this.assertSiteOwner(siteId, adminId);
        if (!dto.name?.trim())
            throw new common_1.BadRequestException('Name is required');
        if (!dto.tag?.trim())
            throw new common_1.BadRequestException('Tag is required');
        return this.prisma.component.create({
            data: {
                siteId,
                name: dto.name.trim(),
                tag: dto.tag.trim(),
                html: dto.html ?? {},
            },
        });
    }
    async update(siteId, id, adminId, dto) {
        await this.assertSiteOwner(siteId, adminId);
        const component = await this.prisma.component.findFirst({
            where: { id, siteId },
        });
        if (!component)
            throw new common_1.NotFoundException('Component not found');
        const data = {};
        if (dto.name !== undefined)
            data.name = dto.name.trim();
        if (dto.tag !== undefined)
            data.tag = dto.tag.trim();
        if (dto.html !== undefined)
            data.html = dto.html;
        return this.prisma.component.update({ where: { id }, data });
    }
    async remove(siteId, id, adminId) {
        await this.assertSiteOwner(siteId, adminId);
        const component = await this.prisma.component.findFirst({
            where: { id, siteId },
        });
        if (!component)
            throw new common_1.NotFoundException('Component not found');
        await this.prisma.component.delete({ where: { id } });
        return { message: 'Component deleted' };
    }
};
exports.ComponentsService = ComponentsService;
exports.ComponentsService = ComponentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ComponentsService);
//# sourceMappingURL=components.service.js.map