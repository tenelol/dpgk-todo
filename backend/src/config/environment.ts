import { z } from 'zod';

export const environmentSchema = z
  .object({
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),

    PORT: z.coerce.number().int().min(1).max(65_535).default(3000),
    BIND_HOST: z.string().trim().min(1).default('0.0.0.0'),

    DB_SOCKET: z.string().trim().min(1).optional(),
    DB_HOST: z.string().trim().min(1).optional(),
    DB_PORT: z.coerce.number().int().min(1).max(65_535).optional(),
    DB_NAME: z.string().trim().min(1),
    DB_USERNAME: z.string().trim().min(1),
    DB_PASSWORD: z.string().min(1).optional(),
  })
  .superRefine((value, context) => {
    if (
      !value.DB_SOCKET &&
      (!value.DB_HOST || !value.DB_PORT || !value.DB_PASSWORD)
    ) {
      context.addIssue({
        code: 'custom',
        message:
          'DB_HOST, DB_PORT and DB_PASSWORD are required without DB_SOCKET',
      });
    }
  });

export type EnvironmentVariables = z.infer<typeof environmentSchema>;

export function parseEnvironmentVariables(
  rawEnvironmentVariables: Record<string, unknown>,
): EnvironmentVariables {
  return environmentSchema.parse(rawEnvironmentVariables);
}
