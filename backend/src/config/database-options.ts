import type { DataSourceOptions } from 'typeorm';
import { Todo } from '../todo/entity/todo.entity';
import type { EnvironmentVariables } from './environment';

export function buildDatabaseOptions(
  environmentVariables: EnvironmentVariables,
): DataSourceOptions {
  return {
    type: 'mysql',
    host: environmentVariables.DB_HOST,
    port: environmentVariables.DB_PORT,
    username: environmentVariables.DB_USERNAME,
    password: environmentVariables.DB_PASSWORD,
    database: environmentVariables.DB_NAME,

    synchronize: false,

    entities: [Todo],
    migrations: [__dirname + '/../migrations/*{.js,.ts}'],
  };
}
