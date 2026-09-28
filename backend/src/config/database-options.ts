import type { DataSourceOptions } from 'typeorm';
import { Todo } from '../todo/entity/todo.entity';
import type { EnvironmentVariables } from './environment';

export function buildDatabaseOptions(
  environmentVariables: EnvironmentVariables,
): DataSourceOptions {
  return {
    type: 'mysql',
    ...(environmentVariables.DB_SOCKET
      ? { socketPath: environmentVariables.DB_SOCKET }
      : {
          host: environmentVariables.DB_HOST,
          port: environmentVariables.DB_PORT,
          password: environmentVariables.DB_PASSWORD,
        }),
    username: environmentVariables.DB_USERNAME,
    database: environmentVariables.DB_NAME,

    synchronize: false,

    entities: [Todo],
    migrations: [__dirname + '/../migrations/*{.js,.ts}'],
  };
}
