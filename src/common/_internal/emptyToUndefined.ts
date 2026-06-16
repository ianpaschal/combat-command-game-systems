import { z } from 'zod';

export const emptyToUndefined = <T extends z.ZodTypeAny>(
  schema: T,
): z.ZodEffects<z.ZodOptional<z.ZodNullable<T>>, z.output<T> | undefined, z.input<T> | null | undefined> => (
  schema.nullable().optional().transform((val) => (val === '' || val === null ? undefined : val))
);
