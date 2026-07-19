/**
 * Reads a nested value out of `unknown` data by key path, returning `undefined`
 * instead of throwing if any step along the way isn't an object. The same array
 * also works as the `path` on a `ValidationIssue` for whatever value it reads.
 *
 * @param data - Raw, potentially malformed data
 * @param path - Keys to read, in order
 * @returns The value at `path`, or `undefined` if it doesn't resolve
 */
export const getValue = (data: unknown, path: (string | number)[]): unknown => (
  path.reduce<unknown>((current, key) => (
    typeof current === 'object' && current !== null && Object.prototype.hasOwnProperty.call(current, key) ? (
      (current as Record<string, unknown>)[key]
    ) : (
      undefined
    )
  ), data)
);
