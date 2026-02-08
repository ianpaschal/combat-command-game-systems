import { z } from 'zod';

/**
 * Creates a Zod enum schema from a TypeScript enum object.
 * This is a compatibility layer for libraries that don't support z.nativeEnum().
 * 
 * @param enumObj - The TypeScript enum object
 * @param options - Optional Zod enum options (errorMap, etc.)
 * @returns A Zod enum schema
 * 
 * @example
 * ```typescript
 * enum Color {
 *   Red = 'red',
 *   Green = 'green',
 *   Blue = 'blue'
 * }
 * 
 * const colorSchema = createEnumSchema(Color);
 * // Equivalent to: z.enum(['red', 'green', 'blue'])
 * 
 * const colorSchemaWithError = createEnumSchema(Color, {
 *   errorMap: () => ({ message: 'Please select a color.' })
 * });
 * ```
 */
export function createEnumSchema<T extends Record<string, string | number>>(
  enumObj: T,
  options?: {
    errorMap?: () => { message: string };
  },
): z.ZodLiteral<T[keyof T]> | z.ZodUnion<[z.ZodLiteral<T[keyof T]>, z.ZodLiteral<T[keyof T]>, ...z.ZodLiteral<T[keyof T]>[]]> {
  const values = Object.values(enumObj) as [T[keyof T], ...T[keyof T][]];
  
  // z.union requires at least 2 elements, so handle single-element case
  if (values.length === 1) {
    return z.literal(values[0], options);
  }
  
  const literals = values.map((value) => z.literal(value));
  return z.union(literals as [z.ZodLiteral<T[keyof T]>, z.ZodLiteral<T[keyof T]>, ...z.ZodLiteral<T[keyof T]>[]], options);
}

/**
 * Creates a Zod enum schema from the keys of a Record object.
 *
 * @param record - The Record object whose keys will become the enum values
 * @returns A Zod schema that validates against the record's keys
 *
 * @example
 * ```typescript
 * const factions = {
 *   axis: { name: 'Axis' },
 *   allies: { name: 'Allies' },
 * };
 *
 * const factionSchema = createEnumSchemaFromKeys(factions);
 * // Equivalent to: z.enum(['axis', 'allies'])
 * ```
 */
export function createEnumSchemaFromKeys<K extends string>(
  record: Record<K, unknown>,
): z.ZodLiteral<K> | z.ZodUnion<[z.ZodLiteral<K>, z.ZodLiteral<K>, ...z.ZodLiteral<K>[]]> {
  const keys = Object.keys(record) as K[];

  if (keys.length === 0) {
    throw new Error('createEnumSchemaFromKeys requires a non-empty record. The provided record has no keys.');
  }

  if (keys.length === 1) {
    return z.literal(keys[0]);
  }

  const literals = keys.map((key) => z.literal(key));
  return z.union(literals as [z.ZodLiteral<K>, z.ZodLiteral<K>, ...z.ZodLiteral<K>[]]);
}
