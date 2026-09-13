import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import type { EnvironmentVariables } from './config/environment.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  const configService =
    app.get<ConfigService<EnvironmentVariables, true>>(ConfigService);

  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = configService.get('PORT', { infer: true });

  if (configService.get('NODE_ENV', { infer: true }) === 'development') {
    app.enableCors({ origin: 'http://localhost:3001' });
  }
  await app.listen(port, '0.0.0.0');
}
bootstrap();
