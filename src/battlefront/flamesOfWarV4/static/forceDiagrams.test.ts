import {
  describe,
  expect,
  it,
} from 'vitest';

import { Alignment } from './alignments';
import { Faction } from './factions';
import { ForceDiagram, getForceDiagramOptions } from './forceDiagrams';
import { Series } from './series';

describe('FlamesOfWarV4.getForceDiagramOptions', () => {
  it('returns all force diagrams when called with no filters.', () => {
    const result = getForceDiagramOptions();
    expect(result.length).toBeGreaterThan(0);
    expect(result.some((o) => o.value === ForceDiagram.BerlinGerman)).toBe(true);
    expect(result.some((o) => o.value === ForceDiagram.BerlinSoviet)).toBe(true);
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
      expect(result.some((o) => o.value === ForceDiagram.BerlinGerman)).toBe(true);
      expect(result.some((o) => o.value === ForceDiagram.BerlinSoviet)).toBe(false);
    });

    it('returns an empty array if no force diagrams match.', () => {
      const result = getForceDiagramOptions({ faction: 'nonexistent_faction' as Faction });
      expect(result).toEqual([]);
    });
  });

  describe('alignment filter', () => {
    it('returns only force diagrams for the given alignment.', () => {
      const axis = getForceDiagramOptions({ alignment: Alignment.Axis });
      const allies = getForceDiagramOptions({ alignment: Alignment.Allies });
      expect(axis.length).toBeGreaterThan(0);
      expect(allies.length).toBeGreaterThan(0);
      expect(axis.some((o) => o.value === ForceDiagram.BerlinGerman)).toBe(true);
      expect(allies.some((o) => o.value === ForceDiagram.BerlinSoviet)).toBe(true);
      expect(axis.some((o) => o.value === ForceDiagram.BerlinSoviet)).toBe(false);
    });
  });

  describe('series filter', () => {
    it('returns only force diagrams for the given series.', () => {
      const result = getForceDiagramOptions({ series: Series.Berlin });
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((o) => o.value === ForceDiagram.BerlinGerman)).toBe(true);
      expect(result.some((o) => o.value === ForceDiagram.BerlinSoviet)).toBe(true);
      expect(result.some((o) => o.value === ForceDiagram.BulgeGerman)).toBe(false);
    });
  });

  describe('combined filters', () => {
    it('returns force diagrams matching all provided filters.', () => {
      const result = getForceDiagramOptions({ alignment: Alignment.Axis, series: Series.Berlin });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((o) => o.value === ForceDiagram.BerlinGerman)).toBe(true);
    });
  });
});
