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
exports.PublicController = void 0;
const common_1 = require("@nestjs/common");
const public_service_1 = require("./public.service");
let PublicController = class PublicController {
    publicService;
    constructor(publicService) {
        this.publicService = publicService;
    }
    async getLanding() {
        try {
            return await this.publicService.getLandingPage();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 404);
        }
    }
    async getTeamMembers(group) {
        try {
            return await this.publicService.getTeamMembers(group);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 400);
        }
    }
    async getEvents(status) {
        try {
            return await this.publicService.getEvents(status);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 400);
        }
    }
    async getEvent(id) {
        try {
            return await this.publicService.getEvent(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 404);
        }
    }
    async getStories(group) {
        try {
            return await this.publicService.getStories(group);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 400);
        }
    }
    async getPage(slug) {
        try {
            return await this.publicService.getPublicPage(slug);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 404);
        }
    }
};
exports.PublicController = PublicController;
__decorate([
    (0, common_1.Get)('landing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getLanding", null);
__decorate([
    (0, common_1.Get)('team-members'),
    __param(0, (0, common_1.Query)('group')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getTeamMembers", null);
__decorate([
    (0, common_1.Get)('events'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getEvents", null);
__decorate([
    (0, common_1.Get)('events/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getEvent", null);
__decorate([
    (0, common_1.Get)('stories'),
    __param(0, (0, common_1.Query)('group')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getStories", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getPage", null);
exports.PublicController = PublicController = __decorate([
    (0, common_1.Controller)('public'),
    __metadata("design:paramtypes", [public_service_1.PublicService])
], PublicController);
//# sourceMappingURL=public.controller.js.map