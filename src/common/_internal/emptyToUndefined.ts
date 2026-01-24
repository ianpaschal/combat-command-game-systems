import { z } from 'zod';

export const emptyToUndefined = <T extends z.ZodTypeAny>(
  schema: T,
): z.ZodEffects<T, z.output<T>, unknown> => z.preprocess((val) => (val === '' || val === null ? undefined : val), schema);
