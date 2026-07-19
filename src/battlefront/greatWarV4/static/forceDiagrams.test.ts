import {
  describe,
  expect,
  it,
} from 'vitest';

import { Alignment } from './alignments';
import { Faction } from './factions';
import { ForceDiagram } from './forceDiagrams';
import { getForceDiagramOptions } from './forceDiagrams.helpers';

describe('GreatWarV4.getForceDiagramOptions', () => {
  it('returns all force diagrams when called with no filters.', () => {
    const result = getForceDiagramOptions();
    expect(result.length).toBeGreaterThan(0);
    expect(result.some(({ value }) => value === ForceDiagram.German)).toBe(true);
    expect(result.some(({ value }) => value === ForceDiagram.American)).toBe(true);
  });

  it('returns all force diagrams when called with an empty filter object.', () => {
    const all = getForceDiagramOptions();
    const filtered = getForceDiagramOptions({});
    expect(filtered.length).toBe(all.length);
  });

  describe('faction filter', () => {
    it('returns only force diagrams for the given faction.', () => {
      const result = getForceDiagramOptions({ faction: Faction.Germany });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(({ value }) => value === ForceDiagram.German)).toBe(true);
    });

    it('returns an empty array if no force diagrams match.', () => {
      const result = getForceDiagramOptions({ faction: 'nonexistent_faction' as Faction });
      expect(result).toEqual([]);
    });
  });

  describe('alignment filter', () => {
    it('returns only force diagrams for the given alignment.', () => {
      const central = getForceDiagramOptions({ alignment: Alignment.CentralPowers });
      const allied = getForceDiagramOptions({ alignment: Alignment.AlliedPowers });
      expect(central.length).toBeGreaterThan(0);
      expect(allied.length).toBeGreaterThan(0);
      expect(central.some(({ value }) => value === ForceDiagram.German)).toBe(true);
      expect(allied.some(({ value }) => value === ForceDiagram.American)).toBe(true);
      expect(central.some(({ value }) => value === ForceDiagram.American)).toBe(false);
    });
  });

  describe('combined filters', () => {
    it('returns force diagrams matching all provided filters.', () => {
      const result = getForceDiagramOptions({ alignment: Alignment.AlliedPowers, faction: Faction.France });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(({ value }) => value === ForceDiagram.French)).toBe(true);
    });
  });
});
