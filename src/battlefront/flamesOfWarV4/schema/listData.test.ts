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
import {
  commandCard,
  formation,
  listData,
  unit,
} from './listData';

describe('FlamesOfWarV4.formation', () => {
  describe('.id', () => {
    it('should emit an error if value is missing.', () => {
      const result = formation.safeParse({ sourceId: Unit.LG469 });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'id')).not.toHaveLength(0);
    });
  });
  describe('.sourceId', () => {
    it('should emit an error if value is missing.', () => {
      const result = formation.safeParse({ id: 'form00' });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'sourceId')).not.toHaveLength(0);
    });
    it('should emit an error if value is not a valid Flames of War V4 formation ID.', () => {
      const result = formation.safeParse({ id: 'form00', sourceId: 'not_a_real_unit' });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'sourceId')).toContain('Please select a formation');
    });
  });
});

describe('FlamesOfWarV4.unit', () => {
  describe('.id', () => {
    it('should emit an error if value is missing.', () => {
      const result = unit.safeParse({
        sourceId: Unit.LG469,
        formationId: 'form00',
        slotId: 'hq_0',
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'id')).not.toHaveLength(0);
    });
  });
  describe('.sourceId', () => {
    it('should emit an error if value is missing.', () => {
      const result = unit.safeParse({
        id: 'unit00',
        formationId: 'form00',
        slotId: 'hq_0',
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'sourceId')).not.toHaveLength(0);
    });
    it('should emit an error if value is not a valid Flames of War V4 unit ID.', () => {
      const result = unit.safeParse({
        id: 'unit00',
        sourceId: 'not_a_real_unit',
        formationId: 'form00',
        slotId: 'hq_0',
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'sourceId')).toContain('Please select a unit');
    });
  });
  describe('.formationId', () => {
    it('should emit an error if value is missing.', () => {
      const result = unit.safeParse({
        id: 'unit00',
        sourceId: Unit.LG469,
        slotId: 'hq_0',
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'formationId')).not.toHaveLength(0);
    });
  });
  describe('.slotId', () => {
    it('should emit an error if value is missing.', () => {
      const result = unit.safeParse({
        id: 'unit00',
        sourceId: Unit.LG469,
        formationId: 'form00',
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'slotId')).not.toHaveLength(0);
    });
    // Will add the strictly enforced format later, for now string is OK
    it.skip('should emit an error if value is not a valid Flames of War V4 slot ID.', () => {

    });
  });
});

describe('FlamesOfWarV4.commandCard', () => {
  describe('.id', () => {
    it('should emit an error if value is missing.', () => {
      const result = commandCard.safeParse({
        sourceId: 'some-card',
        appliedTo: 'unit00',
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'id')).not.toHaveLength(0);
    });
  });
  describe('.sourceId', () => {
    it('should emit an error if value is missing.', () => {
      const result = commandCard.safeParse({
        id: 'card00',
        appliedTo: 'unit00',
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'sourceId')).not.toHaveLength(0);
    });
    // No CommandCard static enum exists yet, so we can't validate sourceId values.
    it.todo('should emit an error if value is not a valid Flames of War V4 command card ID.');
  });
  describe('.appliedTo', () => {
    it('should emit an error if value is missing.', () => {
      const result = commandCard.safeParse({
        id: 'card00',
        sourceId: 'some-card',
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'appliedTo')).not.toHaveLength(0);
    });
  });
});

describe('FlamesOfWarV4.listData.createSchema', () => {
  it('accepts valid data.', () => {
    const result = listData.createSchema().safeParse({
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
    });
    expect(result.success).toBe(true);
  });
});
