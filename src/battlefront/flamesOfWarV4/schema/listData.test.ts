import {
  describe,
  expect,
  it,
} from 'vitest';

import { getIssueMessages } from '../../_shared/_fixtures/getIssueMessages';
import { Alignment } from '../static/alignments';
import { Era } from '../static/eras';
import { Faction } from '../static/factions';
import { ForceDiagram } from '../static/forceDiagrams';
import { Unit } from '../static/units';
import { gameSystemConfig } from './gameSystemConfig';
import { listData,ListDataFormData } from './listData';

describe('FlamesOfWarV4.listData', () => {

  const validData: ListDataFormData = {
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

  it('accepts valid data.', async () => {
    const result = await listData.validate(validData);
    expect(result.success).toBe(true);
  });

  it('accepts data with unset optional meta fields.', async () => {
    const result = await listData.validate({
      ...validData,
      meta: {
        forceDiagram: null, faction: null, alignment: null, era: Era.LW, pointsLimit: 100,
      },
      formations: [],
      units: [],
    });
    expect(result.success).toBe(true);
  });

  describe('.meta.era', () => {
    it('should emit an error if value is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        meta: { ...validData.meta, era: null },
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.meta.forceDiagram', () => {
    it('should emit an error if value is missing and required.', async () => {
      const result = await listData.validate({
        ...validData,
        meta: { ...validData.meta, forceDiagram: null },
      }, { requiredFields: { forceDiagram: true } });
      expect(result.success).toBe(false);
    });
  });

  describe('.meta.pointsLimit', () => {

    it('should emit an error if value is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        meta: { ...validData.meta, pointsLimit: undefined as unknown as number },
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if value is negative.', async () => {
      const result = await listData.validate({
        ...validData,
        meta: { ...validData.meta, pointsLimit: -1 },
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.formations[n]', () => {

    it('should emit an error if .id is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        formations: [{ sourceId: Unit.LG469 } as ListDataFormData['formations'][number]],
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if .sourceId is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        formations: [{ id: 'form00' } as ListDataFormData['formations'][number]],
      });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['formations'])).toContain('Please select a formation.');
    });

    it('should emit an error if .sourceId is not a valid Flames of War V4 unit ID.', async () => {
      const result = await listData.validate({
        ...validData,
        formations: [{ id: 'form00', sourceId: 'not_a_real_unit' as Unit }],
      });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['formations'])).toContain('Please select a formation.');
    });
  });

  describe('.units[n]', () => {

    it('should emit an error if .id is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        units: [{ sourceId: Unit.LG469, formationId: 'form00', slotId: 'hq_0' } as ListDataFormData['units'][number]],
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if .sourceId is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        units: [{ id: 'unit00', formationId: 'form00', slotId: 'hq_0' } as ListDataFormData['units'][number]],
      });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['units'])).toContain('Please select a unit.');
    });

    it('should emit an error if .sourceId is not a valid Flames of War V4 unit ID.', async () => {
      const result = await listData.validate({
        ...validData,
        units: [{ id: 'unit00', sourceId: 'not_a_real_unit' as Unit, formationId: 'form00', slotId: 'hq_0' }],
      });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['units'])).toContain('Please select a unit.');
    });

    it('should emit an error if .formationId is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        units: [{ id: 'unit00', sourceId: Unit.LG469, slotId: 'hq_0' } as ListDataFormData['units'][number]],
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if .slotId is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        units: [{ id: 'unit00', sourceId: Unit.LG469, formationId: 'form00' } as ListDataFormData['units'][number]],
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

    it('should emit an error if .id is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        commandCards: [{ sourceId: 'some-card', appliedTo: 'unit00' } as ListDataFormData['commandCards'][number]],
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if .sourceId is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        commandCards: [{ id: 'card00', appliedTo: 'unit00' } as ListDataFormData['commandCards'][number]],
      });
      expect(result.success).toBe(false);
    });

    it.todo('should emit an error if value is not a valid Flames of War V4 command card ID.');

    it('should emit an error if .appliedTo is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        commandCards: [{ id: 'card00', sourceId: 'some-card' } as ListDataFormData['commandCards'][number]],
      });
      expect(result.success).toBe(false);
    });
  });
});
