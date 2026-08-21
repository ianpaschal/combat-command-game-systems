import {
  describe,
  expect,
  it,
} from 'vitest';

import { Alignment } from './alignments';
import { Era } from './eras';
import { Faction } from './factions';
import { ForceDiagram } from './forceDiagrams';
import { getForceDiagramEra, getForceDiagramOptions } from './forceDiagrams.helpers';
import { Series } from './series';

describe('FlamesOfWarV4.getForceDiagramOptions', () => {
  it('returns all force diagrams when called with no filters.', () => {
    const result = getForceDiagramOptions();
    expect(result.length).toBeGreaterThan(0);
    expect(result.some(({ value }) => value === ForceDiagram.BerlinGerman)).toBe(true);
    expect(result.some(({ value }) => value === ForceDiagram.BerlinSoviet)).toBe(true);
  });

  it('returns all force diagrams when called with an empty filter object.', () => {
    const all = getForceDiagramOptions();
    const filtered = getForceDiagramOptions({});
    expect(filtered.length).toBe(all.length);
  });

  it('returns all force diagrams when every filter is explicitly null.', () => {
    const all = getForceDiagramOptions();
    const filtered = getForceDiagramOptions({
      alignment: null,
      era: null,
      faction: null,
      series: null,
    });
    expect(filtered.length).toBe(all.length);
  });

  describe('faction filter', () => {
    it('returns only force diagrams for the given faction.', () => {
      const result = getForceDiagramOptions({ faction: Faction.Germany });
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(({ value }) => value === ForceDiagram.BerlinGerman)).toBe(true);
      expect(result.some(({ value }) => value === ForceDiagram.BerlinSoviet)).toBe(false);
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
      expect(axis.some(({ value }) => value === ForceDiagram.BerlinGerman)).toBe(true);
      expect(allies.some(({ value }) => value === ForceDiagram.BerlinSoviet)).toBe(true);
      expect(axis.some(({ value }) => value === ForceDiagram.BerlinSoviet)).toBe(false);
    });
  });

  describe('series filter', () => {
    it('returns only force diagrams for the given series.', () => {
      const result = getForceDiagramOptions({ series: Series.Berlin });
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(({ value }) => value === ForceDiagram.BerlinGerman)).toBe(true);
      expect(result.some(({ value }) => value === ForceDiagram.BerlinSoviet)).toBe(true);
      expect(result.some(({ value }) => value === ForceDiagram.BulgeGerman)).toBe(false);
    });
  });

  describe('era filter', () => {
    it('returns only force diagrams for the given era.', () => {
      const result = getForceDiagramOptions({ era: Era.LW });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(({ value }) => getForceDiagramEra(value) === Era.LW)).toBe(true);
    });
  });

  describe('combined filters', () => {
    it('returns force diagrams matching all provided filters.', () => {
      const result = getForceDiagramOptions({ alignment: Alignment.Axis, series: Series.Berlin });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(({ value }) => value === ForceDiagram.BerlinGerman)).toBe(true);
    });
  });
});
