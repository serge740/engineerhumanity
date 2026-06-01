"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const body_parser_1 = require("body-parser");
const path_1 = require("path");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.use((0, body_parser_1.json)({ limit: '10mb' }));
    app.use((0, body_parser_1.urlencoded)({ extended: true, limit: '10mb' }));
    app.enableCors({
        origin: process.env.FRONTEND_URL_ONLY || 'http://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.use('/uploads', express.static((0, path_1.join)(__dirname, '..', 'Uploads'), {
        setHeaders: (res) => {
            res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
            res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL_ONLY || 'http://localhost:5173');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
        },
    }));
    await app.listen(process.env.PORT ?? 3001);
    console.log(`🚀 Backend running on http://localhost:${process.env.PORT ?? 3001}`);
}
bootstrap();
//# sourceMappingURL=main.js.map