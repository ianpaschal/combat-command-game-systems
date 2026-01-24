import {
  describe,
  expect,
  it,
} from 'vitest';
import { z } from 'zod';

import { createEnumSchema, createEnumSchemaFromKeys } from './createEnumSchema';

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

describe('createEnumSchemaFromKeys()', () => {

  describe('with multiple record keys', () => {
    const factions = {
      axis: { name: 'Axis' },
      allies: { name: 'Allies' },
      neutral: { name: 'Neutral' },
    };

    const schema = createEnumSchemaFromKeys(factions);

    it('should parse valid keys.', () => {
      expect(schema.parse('axis')).toBe('axis');
      expect(schema.parse('allies')).toBe('allies');
      expect(schema.parse('neutral')).toBe('neutral');
    });

    it('rejects invalid keys.', () => {
      expect(() => schema.parse('soviet')).toThrow();
      expect(() => schema.parse('')).toThrow();
      expect(() => schema.parse(123)).toThrow();
      expect(() => schema.parse(null)).toThrow();
      expect(() => schema.parse(undefined)).toThrow();
    });

    it('returns a union schema for multiple keys.', () => {
      expect(schema instanceof z.ZodUnion).toBe(true);
    });
  });

  it('returns a literal schema (not a union) for a single-key record.', () => {
    const singleKey = {
      only: { value: 1 },
    };

    const schema = createEnumSchemaFromKeys(singleKey);

    expect(schema instanceof z.ZodLiteral).toBe(true);
    expect(schema.parse('only')).toBe('only');
  });

  it('throws an error for an empty record.', () => {
    const emptyRecord = {};

    expect(() => createEnumSchemaFromKeys(emptyRecord)).toThrow(
      'createEnumSchemaFromKeys requires a non-empty record. The provided record has no keys.',
    );
  });
});
