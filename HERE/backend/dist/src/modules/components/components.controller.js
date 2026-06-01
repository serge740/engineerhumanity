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
exports.ComponentsController = void 0;
const common_1 = require("@nestjs/common");
const components_service_1 = require("./components.service");
const create_component_dto_1 = require("./dto/create-component.dto");
const update_component_dto_1 = require("./dto/update-component.dto");
const adminGuard_guard_1 = require("../../guards/adminGuard.guard");
let ComponentsController = class ComponentsController {
    componentsService;
    constructor(componentsService) {
        this.componentsService = componentsService;
    }
    async findAll(siteId, req) {
        try {
            return await this.componentsService.findAll(siteId, req.admin.id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 500);
        }
    }
    async findOne(siteId, id, req) {
        try {
            return await this.componentsService.findOne(siteId, id, req.admin.id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 500);
        }
    }
    async create(siteId, dto, req) {
        try {
            return await this.componentsService.create(siteId, req.admin.id, dto);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 400);
        }
    }
    async update(siteId, id, dto, req) {
        try {
            return await this.componentsService.update(siteId, id, req.admin.id, dto);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 400);
        }
    }
    async remove(siteId, id, req) {
        try {
            return await this.componentsService.remove(siteId, id, req.admin.id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 400);
        }
    }
};
exports.ComponentsController = ComponentsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('siteId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ComponentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('siteId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ComponentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('siteId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_component_dto_1.CreateComponentDto, Object]),
    __metadata("design:returntype", Promise)
], ComponentsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('siteId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_component_dto_1.UpdateComponentDto, Object]),
    __metadata("design:returntype", Promise)
], ComponentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('siteId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ComponentsController.prototype, "remove", null);
exports.ComponentsController = ComponentsController = __decorate([
    (0, common_1.Controller)('sites/:siteId/components'),
    (0, common_1.UseGuards)(adminGuard_guard_1.AdminJwtAuthGuard),
    __metadata("design:paramtypes", [components_service_1.ComponentsService])
], ComponentsController);
//# sourceMappingURL=components.controller.js.map