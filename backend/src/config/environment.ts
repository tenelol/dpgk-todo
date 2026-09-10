import { z } from 'zod';

export const environmentSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  PORT: z.coerce.number().int().min(1).max(65_535).default(3000),

  DB_HOST: z.string().trim().min(1),
  DB_PORT: z.coerce.number().int().min(1).max(65_535),
  DB_NAME: z.string().trim().min(1),
  DB_USERNAME: z.string().trim().min(1),
  DB_PASSWORD: z.string().min(1),
});

export type EnvironmentVariables = z.infer<typeof environmentSchema>;

export function parseEnvironmentVariables(
  rawEnvironmentVariables: Record<string, unknown>,
): EnvironmentVariables {
  return environmentSchema.parse(rawEnvironmentVariables);
}
