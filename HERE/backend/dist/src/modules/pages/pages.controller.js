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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagesController = void 0;
const common_1 = require("@nestjs/common");
const pages_service_1 = require("./pages.service");
const create_page_dto_1 = require("./dto/create-page.dto");
const update_page_dto_1 = require("./dto/update-page.dto");
const adminGuard_guard_1 = require("../../guards/adminGuard.guard");
let PagesController = class PagesController {
    pagesService;
    constructor(pagesService) {
        this.pagesService = pagesService;
    }
    async findAll(siteId, req) {
        try {
            return await this.pagesService.findAll(siteId, req.admin.id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 500);
        }
    }
    async findOne(siteId, slug, req) {
        try {
            return await this.pagesService.findOne(siteId, slug, req.admin.id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 500);
        }
    }
    async create(siteId, dto, req) {
        try {
            return await this.pagesService.create(siteId, req.admin.id, dto);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 400);
        }
    }
    async update(siteId, slug, dto, req) {
        try {
            return await this.pagesService.update(siteId, slug, req.admin.id, dto);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 400);
        }
    }
    async publish(siteId, slug, req) {
        try {
            return await this.pagesService.publish(siteId, slug, req.admin.id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 400);
        }
    }
    async unpublish(siteId, slug, req) {
        try {
            return await this.pagesService.unpublish(siteId, slug, req.admin.id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 400);
        }
    }
    async duplicate(siteId, slug, req) {
        try {
            return await this.pagesService.duplicate(siteId, slug, req.admin.id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 400);
        }
    }
    async remove(siteId, slug, req) {
        try {
            return await this.pagesService.remove(siteId, slug, req.admin.id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 400);
        }
    }
};
exports.PagesController = PagesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('siteId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('siteId')),
    __param(1, (0, common_1.Param)('slug')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('siteId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_page_dto_1.CreatePageDto, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':slug'),
    __param(0, (0, common_1.Param)('siteId')),
    __param(1, (0, common_1.Param)('slug')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_page_dto_1.UpdatePageDto, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':slug/publish'),
    __param(0, (0, common_1.Param)('siteId')),
    __param(1, (0, common_1.Param)('slug')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "publish", null);
__decorate([
    (0, common_1.Post)(':slug/unpublish'),
    __param(0, (0, common_1.Param)('siteId')),
    __param(1, (0, common_1.Param)('slug')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "unpublish", null);
__decorate([
    (0, common_1.Post)(':slug/duplicate'),
    __param(0, (0, common_1.Param)('siteId')),
    __param(1, (0, common_1.Param)('slug')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "duplicate", null);
__decorate([
    (0, common_1.Delete)(':slug'),
    __param(0, (0, common_1.Param)('siteId')),
    __param(1, (0, common_1.Param)('slug')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "remove", null);
exports.PagesController = PagesController = __decorate([
    (0, common_1.Controller)('sites/:siteId/pages'),
    (0, common_1.UseGuards)(adminGuard_guard_1.AdminJwtAuthGuard),
    __metadata("design:paramtypes", [pages_service_1.PagesService])
], PagesController);
//# sourceMappingURL=pages.controller.js.map