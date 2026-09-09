import { DataSource } from 'typeorm';
import { Todo } from './todo/entity/todo.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'todo',
  password: 'todo',
  database: 'todo',
  synchronize: true,
  entities: [Todo],
  migrations: ['src/migration/*.ts'],
})
