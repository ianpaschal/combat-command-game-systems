import {
  describe,
  expect,
  it,
} from 'vitest';

import { Alignment } from './alignments';
import { Faction, factions } from './factions';
import { getFactionAlignment, getFactionOptions } from './factions.helpers';

describe('BoltActionV3.getFactionOptions', () => {
  it('returns an option for every faction.', () => {
    const result = getFactionOptions();
    expect(result.length).toBe(Object.keys(factions).length);
    expect(result.some(({ value }) => value === Faction.Germany)).toBe(true);
  });
});

describe('BoltActionV3.getFactionAlignment', () => {
  it('returns the alignment for a known faction.', () => {
    expect(getFactionAlignment(Faction.Germany)).toBe(Alignment.Axis);
    expect(getFactionAlignment(Faction.SovietUnion)).toBe(Alignment.Allies);
    expect(getFactionAlignment(Faction.Italy)).toBe(Alignment.Flexible);
  });

  it('returns undefined for an unknown faction.', () => {
    expect(getFactionAlignment('atlantis')).toBeUndefined();
  });
});
