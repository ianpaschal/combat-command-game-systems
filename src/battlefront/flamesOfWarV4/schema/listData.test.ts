import {
  describe,
  expect,
  it,
} from 'vitest';

import { getSchemaFieldErrors } from '../../../common/_internal/getSchemaFieldErrors';
import { Alignment } from '../static/alignments';
import { Era } from '../static/eras';
import { Faction } from '../static/factions';
import { ForceDiagram } from '../static/forceDiagrams';
import { Unit } from '../static/units';
import { gameSystemConfig } from './gameSystemConfig';
import { ListData, listData } from './listData';

describe('FlamesOfWarV4.listData', () => {

  const validData: ListData = {
    meta: {
      forceDiagram: ForceDiagram.BerlinGerman,
      faction: Faction.Germany,
      alignment: Alignment.Axis,
      era: Era.LW,
      pointsLimit: 100,
    },
    formations: [{ id: 'form00', sourceId: Unit.LG469 }],
    units: [{ id: 'unit00', sourceId: Unit.LG469, formationId: 'form00', slotId: 'hq_0' }],
    commandCards: [],
  };

  it('accepts valid data.', () => {
    const result = listData.schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe('.meta.forceDiagram', () => {
    it('should emit an error if value is missing and required.', () => {
      const result = listData.createSchema({ requiredFields: { forceDiagram: true } }).safeParse({
        ...validData,
        meta: { ...validData.meta, forceDiagram: undefined },
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.meta.pointsLimit', () => {

    it('should emit an error if value is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        meta: { ...validData.meta, pointsLimit: undefined },
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.formations[n]', () => {

    it('should emit an error if .id is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        formations: [{ sourceId: Unit.LG469 }],
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if .sourceId is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        formations: [{ id: 'form00' }],
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'formations')).toContain('Please select a formation.');
    });

    it('should emit an error if .sourceId is not a valid Flames of War V4 unit ID.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        formations: [{ id: 'form00', sourceId: 'not_a_real_unit' }],
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'formations')).toContain('Please select a formation.');
    });
  });

  describe('.units[n]', () => {

    it('should emit an error if .id is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        units: [{ sourceId: Unit.LG469, formationId: 'form00', slotId: 'hq_0' }],
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if .sourceId is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        units: [{ id: 'unit00', formationId: 'form00', slotId: 'hq_0' }],
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'units')).toContain('Please select a unit.');
    });

    it('should emit an error if .sourceId is not a valid Flames of War V4 unit ID.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        units: [{ id: 'unit00', sourceId: 'not_a_real_unit', formationId: 'form00', slotId: 'hq_0' }],
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'units')).toContain('Please select a unit.');
    });

    it('should emit an error if .formationId is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        units: [{ id: 'unit00', sourceId: Unit.LG469, slotId: 'hq_0' }],
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if .slotId is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        units: [{ id: 'unit00', sourceId: Unit.LG469, formationId: 'form00' }],
      });
      expect(result.success).toBe(false);
    });

    it.skip('should emit an error if .slotId is not a valid Flames of War V4 slot ID.', () => {});
  });

  describe('.getDefaultValues', () => {
    it('returns default values with era and pointsLimit seeded from config.', () => {
      const result = listData.getDefaultValues(gameSystemConfig.defaultValues);
      expect(result.meta.era).toBe(gameSystemConfig.defaultValues.era);
      expect(result.meta.pointsLimit).toBe(gameSystemConfig.defaultValues.points);
      expect(result.meta.faction).toBeNull();
      expect(result.meta.alignment).toBeNull();
      expect(result.meta.forceDiagram).toBeNull();
    });

    it('throws if config is not a valid game system config.', () => {
      expect(() => listData.getDefaultValues({ invalid: true })).toThrow();
    });
  });

  describe('.commandCards[n]', () => {

    it('should emit an error if .id is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        commandCards: [{ sourceId: 'some-card', appliedTo: 'unit00' }],
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if .sourceId is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        commandCards: [{ id: 'card00', appliedTo: 'unit00' }],
      });
      expect(result.success).toBe(false);
    });

    it.todo('should emit an error if value is not a valid Flames of War V4 command card ID.');

    it('should emit an error if .appliedTo is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        commandCards: [{ id: 'card00', sourceId: 'some-card' }],
      });
      expect(result.success).toBe(false);
    });
  });
});
