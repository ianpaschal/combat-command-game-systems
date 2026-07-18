import {
  describe,
  expect,
  it,
} from 'vitest';

import { Faction } from './factions';
import { getFactionOptions } from './factions.helpers';

describe('FlamesOfWarV4.getFactionOptions', () => {
  it('returns all factions when called with no filters.', () => {
    const result = getFactionOptions();
    expect(result.length).toBeGreaterThan(0);
    expect(result.some(({ value }) => value === Faction.Germany)).toBe(true);
  });

  it('returns all factions when called with an empty filter object.', () => {
    const all = getFactionOptions();
    const filtered = getFactionOptions({});
    expect(filtered.length).toBe(all.length);
  });

  it('returns all factions when every filter is explicitly null.', () => {
    const all = getFactionOptions();
    const filtered = getFactionOptions({ alignment: null, era: null });
    expect(filtered.length).toBe(all.length);
  });
});
