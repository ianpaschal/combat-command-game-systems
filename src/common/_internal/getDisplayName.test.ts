import {
  describe,
  expect,
  it,
} from 'vitest';

import { getDisplayName } from './getDisplayName';

describe('getDisplayName()', () => {
  const data = {
    foo: { displayName: 'Foo' },
    bar: { displayName: 'Bar' },
    baz: { displayName: 'Baz' },
  } as const;

  it('returns the display name for a valid key.', () => {
    const result = getDisplayName(data, 'foo');
    expect(result).toBe('Foo');
  });

  it('returns undefined for an invalid key.', () => {
    const result = getDisplayName(data, 'qux' as keyof typeof data);
    expect(result).toBeUndefined();
  });

  it('returns undefined when search is undefined.', () => {
    const result = getDisplayName(data, undefined);
    expect(result).toBeUndefined();
  });
});
