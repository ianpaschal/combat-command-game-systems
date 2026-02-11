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
import {
  commandCard,
  formation,
  listData,
  unit,
} from './listData';

describe('TeamYankeeV2.formation', () => {
  describe('.id', () => {
    it('should emit an error if value is missing.', () => {
      const result = formation.safeParse({ sourceId: 'some-formation' });
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
    it('should emit an error if value is an empty string.', () => {
      const result = formation.safeParse({ id: 'form00', sourceId: '' });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'sourceId')).toContain('Please select a formation');
    });
  });
});

describe('TeamYankeeV2.unit', () => {
  describe('.id', () => {
    it('should emit an error if value is missing.', () => {
      const result = unit.safeParse({
        sourceId: 'some-unit',
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
    it('should emit an error if value is an empty string.', () => {
      const result = unit.safeParse({
        id: 'unit00',
        sourceId: '',
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
        sourceId: 'some-unit',
        slotId: 'hq_0',
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'formationId')).not.toHaveLength(0);
    });
    it('should accept "support" as a formationId.', () => {
      const result = unit.safeParse({
        id: 'unit00',
        sourceId: 'some-unit',
        formationId: 'support',
        slotId: 'hq_0',
      });
      expect(result.success).toBe(true);
    });
  });
  describe('.slotId', () => {
    it('should emit an error if value is missing.', () => {
      const result = unit.safeParse({
        id: 'unit00',
        sourceId: 'some-unit',
        formationId: 'form00',
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'slotId')).not.toHaveLength(0);
    });
  });
});

describe('TeamYankeeV2.commandCard', () => {
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

describe('TeamYankeeV2.listData.createSchema', () => {
  it('accepts valid data.', () => {
    const result = listData.createSchema().safeParse({
      meta: {
        forceDiagram: ForceDiagram.American,
        faction: Faction.UnitedStates,
        alignment: Alignment.Nato,
        era: Era.Default,
        pointsLimit: 100,
      },
      formations: [{ id: 'form00', sourceId: 'some-formation' }],
      units: [{ id: 'unit00', sourceId: 'some-unit', formationId: 'form00', slotId: 'hq_0' }],
      commandCards: [],
    });
    expect(result.success).toBe(true);
  });
});
