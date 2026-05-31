import {
  describe,
  expect,
  it,
} from 'vitest';

import { getSchemaFieldErrors } from '../../../common/_internal/getSchemaFieldErrors';
import { Alignment } from '../static/alignments';
import { Faction } from '../static/factions';
import { ForceDiagram } from '../static/forceDiagrams';
import { Unit } from '../static/units';
import { ListData, listData } from './listData';

describe('GreatWarV4.listData', () => {

  const validData: ListData = {
    meta: {
      forceDiagram: ForceDiagram.American,
      faction: Faction.UnitedStates,
      alignment: Alignment.AlliedPowers,
      pointsLimit: 100,
    },
    formations: [{ id: 'form00', sourceId: Unit.GWB101 }],
    units: [{ id: 'unit00', sourceId: Unit.GWB101, formationId: 'form00', slotId: 'hq_0' }],
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

  describe('.formations[n].id', () => {
    it('should emit an error if value is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        formations: [{ sourceId: 'some-formation' }],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.formations[n].sourceId', () => {
    it('should emit an error if value is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        formations: [{ id: 'form00' }],
      });
      expect(result.success).toBe(false);
    });
    it('should emit an error if value is an empty string.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        formations: [{ id: 'form00', sourceId: '' }],
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'formations')).toContain('Please select a formation.');
    });
  });

  describe('.units[n].id', () => {
    it('should emit an error if value is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        units: [{ sourceId: 'some-unit', formationId: 'form00', slotId: 'hq_0' }],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.units[n].sourceId', () => {
    it('should emit an error if value is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        units: [{ id: 'unit00', formationId: 'form00', slotId: 'hq_0' }],
      });
      expect(result.success).toBe(false);
    });
    it('should emit an error if value is an empty string.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        units: [{ id: 'unit00', sourceId: '', formationId: 'form00', slotId: 'hq_0' }],
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'units')).toContain('Please select a unit.');
    });
  });

  describe('.units[n].formationId', () => {
    it('should emit an error if value is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        units: [{ id: 'unit00', sourceId: 'some-unit', slotId: 'hq_0' }],
      });
      expect(result.success).toBe(false);
    });
    it('should accept "support" as a formationId.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        units: [{ id: 'unit00', sourceId: Unit.GWB101, formationId: 'support', slotId: 'hq_0' }],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('.units[n].slotId', () => {
    it('should emit an error if value is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        units: [{ id: 'unit00', sourceId: 'some-unit', formationId: 'form00' }],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.commandCards[n].id', () => {
    it('should emit an error if value is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        commandCards: [{ sourceId: 'some-card', appliedTo: 'unit00' }],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.commandCards[n].sourceId', () => {
    it('should emit an error if value is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        commandCards: [{ id: 'card00', appliedTo: 'unit00' }],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.commandCards[n].appliedTo', () => {
    it('should emit an error if value is missing.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        commandCards: [{ id: 'card00', sourceId: 'some-card' }],
      });
      expect(result.success).toBe(false);
    });
  });

});
