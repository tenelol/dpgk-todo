import 'dotenv/config';
import { DataSource } from 'typeorm';
import { buildDatabaseOptions } from './config/database-options';
import { parseEnvironmentVariables } from './config/environment';

const environmentVariables = parseEnvironmentVariables(process.env);

export const AppDataSource = new DataSource(
  buildDatabaseOptions(environmentVariables),
);
