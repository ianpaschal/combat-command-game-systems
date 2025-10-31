import {
  describe,
  expect,
  it,
} from 'vitest';
import { z } from 'zod';

import { createEnumSchema } from './createEnumSchema';

describe('createEnumSchema()', () => {

  describe('with multiple enum values', () => {
    enum Color {
      Red = 'red',
      Green = 'green',
      Blue = 'blue',
    }

    const schema = createEnumSchema(Color);

    it('should parse valid enum values.', () => {
      expect(schema.parse('red')).toBe('red');
      expect(schema.parse('green')).toBe('green');
      expect(schema.parse('blue')).toBe('blue');
    });

    it('rejects invalid enum values.', () => {
      expect(() => schema.parse('yellow')).toThrow();
      expect(() => schema.parse('')).toThrow();
      expect(() => schema.parse(123)).toThrow();
      expect(() => schema.parse(null)).toThrow();
      expect(() => schema.parse(undefined)).toThrow();
    });

    it('returns a union schema for multiple values.', () => {
      expect(schema instanceof z.ZodUnion).toBe(true);
    });
  });

  it('returns a literal schema (not a union) for a single-value enum.', () => {
    enum SingleValue {
      Only = 'only',
    }

    const schema = createEnumSchema(SingleValue);

    expect(schema instanceof z.ZodLiteral).toBe(true);
  });
});
