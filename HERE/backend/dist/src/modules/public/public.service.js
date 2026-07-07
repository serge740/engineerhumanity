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
exports.PublicService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const collection_expansion_1 = require("../../common/collection-expansion");
let PublicService = class PublicService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getLandingPage() {
        const page = await this.prisma.page.findFirst({
            where: { isLanding: true, published: true },
            select: { slug: true, title: true },
        });
        if (!page)
            throw new common_1.NotFoundException('No landing page set');
        return page;
    }
    async getTeamMembers(group) {
        if (group && !['board', 'management'].includes(group)) {
            throw new common_1.NotFoundException('Invalid group');
        }
        return this.prisma.teamMember.findMany({
            where: group ? { group } : undefined,
            orderBy: { order: 'asc' },
        });
    }
    async getEvents(status) {
        if (status && !['upcoming', 'past'].includes(status)) {
            throw new common_1.NotFoundException('Invalid status');
        }
        return this.prisma.event.findMany({
            where: status ? { status } : undefined,
            orderBy: { order: 'asc' },
        });
    }
    async getEvent(id) {
        const event = await this.prisma.event.findFirst({ where: { id } });
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        return event;
    }
    async getStories(group) {
        if (group && !['success', 'success-summary', 'testimony'].includes(group)) {
            throw new common_1.NotFoundException('Invalid group');
        }
        return this.prisma.story.findMany({
            where: group ? { group } : undefined,
            orderBy: { order: 'asc' },
        });
    }
    async getPublicPage(slug) {
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
        if (!page)
            throw new common_1.NotFoundException('Page not found or not published');
        const html = await this.expandPageHtml(page.siteId, page.html);
        return {
            slug: page.slug,
            title: page.title,
            description: page.description,
            html,
            metadata: page.metadata,
        };
    }
    async expandPageHtml(siteId, html) {
        const tree = (Array.isArray(html) ? html : []);
        const [collections, components] = await Promise.all([
            this.prisma.collection.findMany({
                where: { siteId },
                include: { items: { orderBy: { order: 'asc' } } },
            }),
            this.prisma.component.findMany({ where: { siteId, type: 'dynamic' } }),
        ]);
        const collectionsById = new Map(collections.map(c => [
            c.id,
            {
                id: c.id,
                fields: c.fields,
                items: c.items.map(i => ({ data: i.data })),
            },
        ]));
        const componentsById = new Map(components.map(c => [
            c.id,
            {
                id: c.id,
                html: (Array.isArray(c.html) ? c.html : []),
                modalHtml: (Array.isArray(c.modalHtml) ? c.modalHtml : null),
            },
        ]));
        return (0, collection_expansion_1.expandCollectionNodes)(tree, collectionsById, componentsById);
    }
};
exports.PublicService = PublicService;
exports.PublicService = PublicService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PublicService);
//# sourceMappingURL=public.service.js.map