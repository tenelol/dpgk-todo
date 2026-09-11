import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createObserveModule } from '@nestjs/observe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { buildDatabaseOptions } from './config/database-options.js';
import {
  parseEnvironmentVariables,
  type EnvironmentVariables,
} from './config/environment.js';
import { HelloController } from './hello/hello.controller';
import { TodoModule } from './todo/todo.module';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: parseEnvironmentVariables,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables, true>) =>
        buildDatabaseOptions({
          NODE_ENV: configService.get('NODE_ENV', { infer: true }),
          PORT: configService.get('PORT', { infer: true }),
          DB_HOST: configService.get('DB_HOST', { infer: true }),
          DB_PORT: configService.get('DB_PORT', { infer: true }),
          DB_NAME: configService.get('DB_NAME', { infer: true }),
          DB_USERNAME: configService.get('DB_USERNAME', { infer: true }),
          DB_PASSWORD: configService.get('DB_PASSWORD', { infer: true }),
        }),
    }),

    TodoModule,
  ],
  controllers: [AppController, HelloController],
  providers: [AppService],
})
export class AppModule {}
