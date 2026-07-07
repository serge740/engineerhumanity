"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const admin_module_1 = require("./modules/admin-management/admin.module");
const sites_module_1 = require("./modules/sites/sites.module");
const pages_module_1 = require("./modules/pages/pages.module");
const components_module_1 = require("./modules/components/components.module");
const collections_module_1 = require("./modules/collections/collections.module");
const assets_module_1 = require("./modules/assets/assets.module");
const public_module_1 = require("./modules/public/public.module");
const export_module_1 = require("./modules/export/export.module");
const team_module_1 = require("./modules/team/team.module");
const events_module_1 = require("./modules/events/events.module");
const stories_module_1 = require("./modules/stories/stories.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            admin_module_1.AdminModule,
            sites_module_1.SitesModule,
            pages_module_1.PagesModule,
            components_module_1.ComponentsModule,
            collections_module_1.CollectionsModule,
            assets_module_1.AssetsModule,
            public_module_1.PublicModule,
            export_module_1.ExportModule,
            team_module_1.TeamModule,
            events_module_1.EventsModule,
            stories_module_1.StoriesModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map