import {
  describe,
  expect,
  it,
} from 'vitest';

import { getValue } from './getValue';

describe('getValue()', () => {
  it('returns the value at a single-key path.', () => {
    expect(getValue({ foo: 'bar' }, ['foo'])).toBe('bar');
  });

  it('returns the value at a nested path.', () => {
    expect(getValue({ meta: { era: 'lw' } }, ['meta', 'era'])).toBe('lw');
  });

  it('returns undefined when a key is missing partway through the path.', () => {
    expect(getValue({ meta: {} }, ['meta', 'era'])).toBeUndefined();
  });

  it('returns undefined when the root value is not an object.', () => {
    expect(getValue('nope', ['meta', 'era'])).toBeUndefined();
  });

  it('returns undefined when the root value is null or undefined.', () => {
    expect(getValue(null, ['meta'])).toBeUndefined();
    expect(getValue(undefined, ['meta'])).toBeUndefined();
  });

  it('returns undefined when an intermediate value is null.', () => {
    expect(getValue({ meta: null }, ['meta', 'era'])).toBeUndefined();
  });

  it('returns the root value for an empty path.', () => {
    expect(getValue({ foo: 'bar' }, [])).toEqual({ foo: 'bar' });
  });

  it('supports array indices in the path.', () => {
    expect(getValue({ formations: [{ id: 'a' }, { id: 'b' }] }, ['formations', 1, 'id'])).toBe('b');
  });
});
