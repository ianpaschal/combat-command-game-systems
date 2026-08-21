import {
  describe,
  expect,
  it,
} from 'vitest';

import { ValidateListDataResult } from '../../../common';
import { Alignment } from '../static/alignments';
import { Faction } from '../static/factions';
import { gameSystemConfig } from './gameSystemConfig';
import { listData, ListDataFormData } from './listData';

const getIssueMessages = (
  result: ValidateListDataResult<unknown>,
  path: (string | number)[],
): string[] => {
  if (result.success) {
    return [];
  }
  return result.issues.filter((issue) => (
    issue.path.length === path.length && issue.path.every((part, i) => part === path[i])
  )).map((issue) => issue.message);
};

describe('BoltActionV3.listData', () => {

  const validData: ListDataFormData = {
    meta: {
      faction: Faction.UnitedStates,
      alignment: Alignment.Allies,
      pointsLimit: 1000,
    },
    platoons: [{ id: 'plat00', sourceId: 'some-selector' }],
    units: [{ id: 'unit00', sourceId: 'some-unit', platoonId: 'plat00', slotId: 'hq_0' }],
  };

  it('accepts valid data.', async () => {
    const result = await listData.validate(validData);
    expect(result.success).toBe(true);
  });

  it('accepts data with unset optional meta fields.', async () => {
    const result = await listData.validate({
      ...validData,
      meta: { faction: null, alignment: null, pointsLimit: 1000 },
      platoons: [],
      units: [],
    });
    expect(result.success).toBe(true);
  });

  describe('.meta.faction', () => {
    it('should emit an error if value is missing and required.', async () => {
      const result = await listData.validate({
        ...validData,
        meta: { ...validData.meta, faction: null },
      }, { requiredFields: { faction: true } });
      expect(result.success).toBe(false);
    });

    it('should emit an error if value is not a recognized faction.', async () => {
      const result = await listData.validate({
        ...validData,
        meta: { ...validData.meta, faction: 'atlantis' },
      });
      expect(getIssueMessages(result, ['meta', 'faction'])).toContain('Please select a faction.');
    });
  });

  describe('.meta.alignment', () => {
    it('should emit an error if it does not match the selected faction.', async () => {
      const result = await listData.validate({
        ...validData,
        meta: { ...validData.meta, alignment: Alignment.Axis },
      });
      expect(getIssueMessages(result, ['meta', 'alignment'])).toContain(
        'Alignment does not match the selected faction.',
      );
    });
  });

  describe('.meta.pointsLimit', () => {
    it('should emit an error if value is missing.', async () => {
      const result = await listData.validate({
        ...validData,
        meta: { ...validData.meta, pointsLimit: null },
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

  describe('.getDefaultValues()', () => {
    it('takes the points limit from the game system config.', () => {
      const result = listData.getDefaultValues({
        ...gameSystemConfig.defaultValues,
        points: 1500,
      });
      expect(result.meta.pointsLimit).toEqual(1500);
    });
  });

  describe('requireLegal', () => {
    it('should emit an error if there are no units at all.', async () => {
      const result = await listData.validate({
        ...validData,
        platoons: [],
        units: [],
      }, { requireLegal: true });
      expect(result.success).toBe(false);
    });
  });
});
