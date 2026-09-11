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

  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get('PORT', { infer: true });

  app.enableCors();
  await app.listen(port, '0.0.0.0');
}
bootstrap();
