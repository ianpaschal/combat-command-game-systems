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

describe('TeamYankeeV2.getForceDiagramOptions', () => {
  it('returns all force diagrams when called with no filters.', () => {
    const result = getForceDiagramOptions();
    expect(result.length).toBeGreaterThan(0);
    expect(result.some(({ value }) => value === ForceDiagram.American)).toBe(true);
    expect(result.some(({ value }) => value === ForceDiagram.Soviet)).toBe(true);
  });

  it('returns all force diagrams when called with an empty filter object.', () => {
    const all = getForceDiagramOptions();
    const filtered = getForceDiagramOptions({});
    expect(filtered.length).toBe(all.length);
  });

  describe('faction filter', () => {
    it('returns only force diagrams for the given faction.', () => {
      const result = getForceDiagramOptions({ faction: Faction.UnitedStates });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(({ value }) => value === ForceDiagram.American)).toBe(true);
    });

    it('returns an empty array if no force diagrams match.', () => {
      const result = getForceDiagramOptions({ faction: 'nonexistent_faction' as Faction });
      expect(result).toEqual([]);
    });
  });

  describe('alignment filter', () => {
    it('returns only force diagrams for the given alignment.', () => {
      const nato = getForceDiagramOptions({ alignment: Alignment.Nato });
      const warsawPact = getForceDiagramOptions({ alignment: Alignment.WarsawPact });
      expect(nato.length).toBeGreaterThan(0);
      expect(warsawPact.length).toBeGreaterThan(0);
      expect(nato.some(({ value }) => value === ForceDiagram.American)).toBe(true);
      expect(warsawPact.some(({ value }) => value === ForceDiagram.Soviet)).toBe(true);
      expect(nato.some(({ value }) => value === ForceDiagram.Soviet)).toBe(false);
    });
  });

  describe('series filter', () => {
    it('returns only force diagrams for the given series.', () => {
      const result = getForceDiagramOptions({ series: Series.NatoForces });
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(({ value }) => value === ForceDiagram.NatoForcesAnzac)).toBe(true);
      expect(result.some(({ value }) => value === ForceDiagram.American)).toBe(false);
    });
  });

  describe('era filter', () => {
    it('returns only force diagrams for the given era.', () => {
      const result = getForceDiagramOptions({ era: Era.Default });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(({ value }) => getForceDiagramEra(value) === Era.Default)).toBe(true);
    });

    it('returns an empty array if no force diagrams match.', () => {
      const result = getForceDiagramOptions({ era: Era.Early });
      expect(result).toEqual([]);
    });
  });

  describe('combined filters', () => {
    it('returns force diagrams matching all provided filters.', () => {
      const result = getForceDiagramOptions({ alignment: Alignment.Nato, era: Era.Default, series: Series.Default });
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(({ value }) => value === ForceDiagram.American)).toBe(true);
      expect(result.some(({ value }) => value === ForceDiagram.NatoForcesAnzac)).toBe(false);
      expect(result.some(({ value }) => value === ForceDiagram.Soviet)).toBe(false);
    });
  });
});
