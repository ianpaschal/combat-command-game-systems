import {
  describe,
  expect,
  it,
} from 'vitest';
import { z } from 'zod';

import { getSchemaFieldErrors } from './getSchemaFieldErrors';

describe('getSchemaFieldErrors()', () => {

  it('returns empty array when parse succeeds.', () => {
    const schema = z.object({
      a: z.string(),
    });
    const result = schema.safeParse({
      a: 'ok',
    });
    expect(result.success).toBe(true);
    expect(getSchemaFieldErrors(result, 'a')).toEqual([]);
  });

  it('returns field errors when parse fails for that field.', () => {
    const schema = z.object({
      b: z.string().min(3, { message: 'b too short' }),
    });
    const result = schema.safeParse({ b: 'x' });
    expect(result.success).toBe(false);
    expect(getSchemaFieldErrors(result, 'b')).toEqual(['b too short']);
  });

  it('returns an empty array when parse fails but the field has no errors.', () => {
    const schema = z.object({
      a: z.string(),
      b: z.string().min(3, { message: 'b too short' }),
    });
    const result = schema.safeParse({ a: 'ok', b: 'x' });
    expect(result.success).toBe(false);
    expect(getSchemaFieldErrors(result, 'a')).toEqual([]);
  });

  it('returns field errors added via superRefine with custom code/path.', () => {
    const schema = z.object({
      b: z.number().optional(),
    }).superRefine((values, ctx) => {
      if (values.b !== 42) {
        ctx.addIssue({
          path: ['b'],
          message: 'b must be 42',
          code: z.ZodIssueCode.custom,
        });
      }
    });
    const result = schema.safeParse({ b: 5 });
    const errors = getSchemaFieldErrors(result, 'b');
    expect(result.success).toBe(false);
    expect(errors).toContain('b must be 42');
  });

  it('aggregates multiple (all) errors for a given field.', () => {
    const schema = z.object({
      d: z.string().min(3, { message: 'd too short' }),
    }).superRefine((values, ctx) => {
      if (values.d === '') {
        ctx.addIssue({
          path: ['d'],
          message: 'd cannot be empty',
          code: z.ZodIssueCode.custom,
        });
      }
    });
    const result = schema.safeParse({ d: '' });
    const errors = getSchemaFieldErrors(result, 'd');
    expect(result.success).toBe(false);
    expect(errors).toEqual(expect.arrayContaining([
      'd too short',
      'd cannot be empty',
    ]));
    expect(errors.length).toBeGreaterThanOrEqual(2);
  });
});
