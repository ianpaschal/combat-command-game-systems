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
export function createEnumSchema<T extends Record<string, string>>(
  enumObj: T,
  options?: {
    errorMap?: () => { message: string };
  },
) {
  const values = Object.values(enumObj) as [T[keyof T], ...T[keyof T][]];
  const literals = values.map((value) => z.literal(value));
  
  // z.union requires at least 2 elements, so handle single-element case
  if (literals.length === 1) {
    return literals[0];
  }
  
  return z.union(literals as [z.ZodLiteral<T[keyof T]>, z.ZodLiteral<T[keyof T]>, ...z.ZodLiteral<T[keyof T]>[]], options);
}
