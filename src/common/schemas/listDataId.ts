import { z } from 'zod';

export const listDataId = (
  options?: {
    errorMap?: () => { message: string };
    message?: string;
  },
): z.ZodString => z.string(options).regex(/^[0-9a-z]{6}$/, 'Invalid list data ID format.');

export type ListDataId = z.infer<ReturnType<typeof listDataId>>;
