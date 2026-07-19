import {
  describe,
  expect,
  it,
} from 'vitest';

import { getDisplayAdjective } from './getDisplayAdjective';

describe('getDisplayAdjective()', () => {
  const data = {
    foo: { displayAdjective: 'Fooish' },
    bar: { displayAdjective: 'Barish' },
    baz: { displayAdjective: 'Bazish' },
  } as const;

  it('returns the display adjective for a valid key.', () => {
    const result = getDisplayAdjective(data, 'foo');
    expect(result).toBe('Fooish');
  });

  it('returns undefined for an invalid key.', () => {
    const result = getDisplayAdjective(data, 'qux' as keyof typeof data);
    expect(result).toBeUndefined();
  });

  it('returns undefined when search is undefined.', () => {
    const result = getDisplayAdjective(data, undefined);
    expect(result).toBeUndefined();
  });
});
