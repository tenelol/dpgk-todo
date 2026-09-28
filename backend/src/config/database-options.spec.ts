import { describe, expect, it } from 'vitest';
import { buildDatabaseOptions } from './database-options';
import { parseEnvironmentVariables } from './environment';

describe('database connection configuration', () => {
  const shared = { DB_NAME: 'todo', DB_USERNAME: 'todo' };

  it('uses a local socket without a database password', () => {
    const environment = parseEnvironmentVariables({
      ...shared,
      DB_SOCKET: '/run/mysqld/mysqld.sock',
      BIND_HOST: '127.0.0.1',
    });
    expect(environment.BIND_HOST).toBe('127.0.0.1');
    expect(buildDatabaseOptions(environment)).toMatchObject({
      socketPath: '/run/mysqld/mysqld.sock',
      username: 'todo',
      database: 'todo',
    });
  });

  it('keeps the existing TCP configuration valid', () => {
    const environment = parseEnvironmentVariables({
      ...shared,
      DB_HOST: 'db',
      DB_PORT: 3306,
      DB_PASSWORD: 'secret',
    });
    expect(environment.BIND_HOST).toBe('0.0.0.0');
    expect(buildDatabaseOptions(environment)).toMatchObject({
      host: 'db',
      port: 3306,
      password: 'secret',
    });
  });

  it('rejects an incomplete TCP configuration', () => {
    expect(() => parseEnvironmentVariables(shared)).toThrow();
  });
});
