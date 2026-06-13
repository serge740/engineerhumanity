import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import { join } from 'path';
import * as express from 'express';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware
  app.use(cookieParser());
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  // CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL_ONLY || 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global API prefix — all routes become /api/...
  app.setGlobalPrefix('api');

  // Ensure uploads directory exists
  const uploadsDir = join(process.cwd(), 'Uploads');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  // Static uploads — process.cwd() is always the backend project root,
  // whereas __dirname resolves to dist/src/ in the compiled output.
  app.use(
    '/uploads',
    express.static(uploadsDir, {
      setHeaders: (res) => {
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
        res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL_ONLY || 'http://localhost:5173');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
  console.log(`🚀 Backend running on http://localhost:${process.env.PORT ?? 3001}`);
}
bootstrap();
