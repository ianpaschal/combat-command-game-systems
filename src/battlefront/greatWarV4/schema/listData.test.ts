import {
  describe,
  expect,
  it,
} from 'vitest';

import { getIssueMessages } from '../../_shared/_fixtures/getIssueMessages';
import { Alignment } from '../static/alignments';
import { Faction } from '../static/factions';
import { ForceDiagram } from '../static/forceDiagrams';
import { Unit } from '../static/units';
import { listData,ListDataFormData } from './listData';

describe('GreatWarV4.listData', () => {

  const validData: ListDataFormData = {
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

  it('accepts valid data.', async () => {
    const result = await listData.validate(validData);
    expect(result.success).toBe(true);
  });

  it('accepts data with unset optional meta fields.', async () => {
    const result = await listData.validate({
      ...validData,
      meta: {
        forceDiagram: null, faction: null, alignment: null, pointsLimit: 100,
      },
      formations: [],
      units: [],
    });
    expect(result.success).toBe(true);
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

  describe('.formations[n].id', () => {
    it('should emit an error if value is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        formations: [{ sourceId: 'some-formation' as Unit } as ListDataFormData['formations'][number]],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.formations[n].sourceId', () => {
    it('should emit an error if value is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        formations: [{ id: 'form00' } as ListDataFormData['formations'][number]],
      });
      expect(result.success).toBe(false);
    });
    it('should emit an error if value is an empty string.', async () => {
      const result = await listData.validate({
        ...validData,
        formations: [{ id: 'form00', sourceId: '' as Unit }],
      });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['formations'])).toContain('Please select a formation.');
    });
  });

  describe('.units[n].id', () => {
    it('should emit an error if value is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        units: [{ sourceId: 'some-unit' as Unit, formationId: 'form00', slotId: 'hq_0' } as ListDataFormData['units'][number]],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.units[n].sourceId', () => {
    it('should emit an error if value is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        units: [{ id: 'unit00', formationId: 'form00', slotId: 'hq_0' } as ListDataFormData['units'][number]],
      });
      expect(result.success).toBe(false);
    });
    it('should emit an error if value is an empty string.', async () => {
      const result = await listData.validate({
        ...validData,
        units: [{ id: 'unit00', sourceId: '' as Unit, formationId: 'form00', slotId: 'hq_0' }],
      });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['units'])).toContain('Please select a unit.');
    });
  });

  describe('.units[n].formationId', () => {
    it('should emit an error if value is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        units: [{ id: 'unit00', sourceId: 'some-unit' as Unit, slotId: 'hq_0' } as ListDataFormData['units'][number]],
      });
      expect(result.success).toBe(false);
    });
    it('should accept "support" as a formationId.', async () => {
      const result = await listData.validate({
        ...validData,
        units: [{ id: 'unit00', sourceId: Unit.GWB101, formationId: 'support', slotId: 'hq_0' }],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('.units[n].slotId', () => {
    it('should emit an error if value is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        units: [{ id: 'unit00', sourceId: 'some-unit' as Unit, formationId: 'form00' } as ListDataFormData['units'][number]],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.commandCards[n].id', () => {
    it('should emit an error if value is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        commandCards: [{ sourceId: 'some-card', appliedTo: 'unit00' } as ListDataFormData['commandCards'][number]],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.commandCards[n].sourceId', () => {
    it('should emit an error if value is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        commandCards: [{ id: 'card00', appliedTo: 'unit00' } as ListDataFormData['commandCards'][number]],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.commandCards[n].appliedTo', () => {
    it('should emit an error if value is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        commandCards: [{ id: 'card00', sourceId: 'some-card' } as ListDataFormData['commandCards'][number]],
      });
      expect(result.success).toBe(false);
    });
  });

});
