import {
  describe,
  expect,
  it,
} from 'vitest';

import { ValidateListDataResult } from '../../../common';
import { alignments } from '../static/alignments';
import { Alignment } from '../static/alignments';
import { factions } from '../static/factions';
import { Faction } from '../static/factions';
import { ListDataContext, validateListData } from './validateListData';

const context: ListDataContext = {
  alignments,
  factions,
  platoons: {},
  units: {},
};

/**
 * A context with catalogued platoons and units, to exercise the checks which
 * only apply once there is anything to check a source against.
 */
const populatedContext: ListDataContext = {
  alignments,
  factions,
  platoons: { infantry_platoon: {} },
  units: { rifle_squad: {} },
};

const validData = {
  meta: {
    faction: Faction.Germany,
    alignment: Alignment.Axis,
    pointsLimit: 1000,
  },
  platoons: [{ id: 'plat00', sourceId: 'infantry_platoon' }],
  units: [{ id: 'unit00', sourceId: 'rifle_squad', platoonId: 'plat00', slotId: 'hq_0' }],
};

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

describe('validateListData()', () => {

  it('accepts a valid list.', () => {
    expect(validateListData(validData, context).success).toBe(true);
  });

  it('accepts a valid list against a populated catalogue.', () => {
    expect(validateListData(validData, populatedContext).success).toBe(true);
  });

  it.each([
    ['a string', 'not a list'],
    ['null', null],
    ['a number', 42],
  ])('rejects %s outright.', (_label, data) => {
    const result = validateListData(data, context);
    expect(result.success).toBe(false);
    expect(getIssueMessages(result, [])).toContain('Invalid list data.');
  });

  describe('meta.faction', () => {

    it('emits an error when missing and required.', () => {
      const result = validateListData({
        ...validData,
        meta: { ...validData.meta, faction: null, alignment: null },
      }, context, { requiredFields: { faction: true } });
      expect(getIssueMessages(result, ['meta', 'faction'])).toContain('Please select a faction.');
    });

    it('emits an error when not a recognized faction.', () => {
      const result = validateListData({
        ...validData,
        meta: { ...validData.meta, faction: 'atlantis' },
      }, context);
      expect(getIssueMessages(result, ['meta', 'faction'])).toContain('Please select a faction.');
    });

    it('accepts an unset faction when it is not required.', () => {
      const result = validateListData({
        ...validData,
        meta: { ...validData.meta, faction: null, alignment: null },
      }, context);
      expect(result.success).toBe(true);
    });
  });

  describe('meta.alignment', () => {

    it('emits an error when missing and required.', () => {
      const result = validateListData({
        ...validData,
        meta: { ...validData.meta, faction: null, alignment: null },
      }, context, { requiredFields: { alignment: true } });
      expect(getIssueMessages(result, ['meta', 'alignment'])).toContain('Please select an alignment.');
    });

    it('emits an error when not a recognized alignment.', () => {
      const result = validateListData({
        ...validData,
        meta: { ...validData.meta, alignment: 'neutral' },
      }, context);
      expect(getIssueMessages(result, ['meta', 'alignment'])).toContain('Please select an alignment.');
    });

    it('emits an error when it does not match the selected faction.', () => {
      const result = validateListData({
        ...validData,
        meta: { ...validData.meta, alignment: Alignment.Allies },
      }, context);
      expect(getIssueMessages(result, ['meta', 'alignment'])).toContain(
        'Alignment does not match the selected faction.',
      );
    });

    it('does not check the faction\u{2019}s alignment when the faction is unrecognized.', () => {
      const result = validateListData({
        ...validData,
        meta: { ...validData.meta, faction: 'atlantis' },
      }, context);
      expect(getIssueMessages(result, ['meta', 'alignment'])).toHaveLength(0);
    });

    it('accepts a flexible faction on either side.', () => {
      const result = validateListData({
        ...validData,
        meta: { ...validData.meta, faction: Faction.Italy, alignment: Alignment.Flexible },
      }, context);
      expect(result.success).toBe(true);
    });
  });

  describe('meta.pointsLimit', () => {

    it.each([
      ['missing', undefined],
      ['not a number', 'lots'],
      ['not finite', Number.POSITIVE_INFINITY],
    ])('emits an error when %s.', (_label, pointsLimit) => {
      const result = validateListData({
        ...validData,
        meta: { ...validData.meta, pointsLimit },
      }, context);
      expect(getIssueMessages(result, ['meta', 'pointsLimit'])).toContain('Please set a points limit.');
    });

    it('emits an error when negative.', () => {
      const result = validateListData({
        ...validData,
        meta: { ...validData.meta, pointsLimit: -1 },
      }, context);
      expect(getIssueMessages(result, ['meta', 'pointsLimit'])).toContain(
        'Points limit must be 0 or greater.',
      );
    });
  });

  describe('duplicate IDs', () => {

    it('emits an error when a platoon and a unit share an ID.', () => {
      const result = validateListData({
        ...validData,
        units: [{ ...validData.units[0], id: 'plat00' }],
      }, context);
      expect(getIssueMessages(result, [])).toContain('Duplicate IDs found.');
    });

    it('ignores entries without a string ID when checking for duplicates.', () => {
      const result = validateListData({
        ...validData,
        platoons: [{ sourceId: 'infantry_platoon' }, { sourceId: 'infantry_platoon' }],
        units: [],
      }, context);
      expect(getIssueMessages(result, [])).toHaveLength(0);
    });
  });

  describe('platoons', () => {

    it('emits an error when platoons is not a list.', () => {
      const result = validateListData({ ...validData, platoons: 'none' }, context);
      expect(getIssueMessages(result, ['platoons'])).toContain('Platoons must be a list.');
    });

    it('emits an error when a platoon has no valid ID.', () => {
      const result = validateListData({
        ...validData,
        platoons: [{ id: '', sourceId: 'infantry_platoon' }],
        units: [],
      }, context);
      expect(getIssueMessages(result, ['platoons'])).toContain('Please set an ID.');
    });

    it('emits an error when a platoon has no source.', () => {
      const result = validateListData({
        ...validData,
        platoons: [{ id: 'plat00', sourceId: '' }],
        units: [],
      }, context);
      expect(getIssueMessages(result, ['platoons'])).toContain('Please select a platoon.');
    });

    it('emits an error when a platoon source is not in the catalogue.', () => {
      const result = validateListData({
        ...validData,
        platoons: [{ id: 'plat00', sourceId: 'made_up_platoon' }],
        units: [],
      }, populatedContext);
      expect(getIssueMessages(result, ['platoons'])).toContain('Please select a platoon.');
    });

    it('accepts any source while no platoons are catalogued.', () => {
      const result = validateListData({
        ...validData,
        platoons: [{ id: 'plat00', sourceId: 'made_up_platoon' }],
        units: [],
      }, context);
      expect(getIssueMessages(result, ['platoons'])).toHaveLength(0);
    });
  });

  describe('units', () => {

    it('emits an error when units is not a list.', () => {
      const result = validateListData({ ...validData, units: 'none' }, context);
      expect(getIssueMessages(result, ['units'])).toContain('Units must be a list.');
    });

    it('emits an error when a unit has no valid ID.', () => {
      const result = validateListData({
        ...validData,
        units: [{ ...validData.units[0], id: '' }],
      }, context);
      expect(getIssueMessages(result, ['units'])).toContain('Please set an ID.');
    });

    it('emits an error when a unit has no source.', () => {
      const result = validateListData({
        ...validData,
        units: [{ ...validData.units[0], sourceId: '' }],
      }, context);
      expect(getIssueMessages(result, ['units'])).toContain('Please select a unit.');
    });

    it('emits an error when a unit source is not in the catalogue.', () => {
      const result = validateListData({
        ...validData,
        units: [{ ...validData.units[0], sourceId: 'made_up_unit' }],
      }, populatedContext);
      expect(getIssueMessages(result, ['units'])).toContain('Please select a unit.');
    });

    it('emits an error when a unit has no slot.', () => {
      const result = validateListData({
        ...validData,
        units: [{ ...validData.units[0], slotId: '' }],
      }, context);
      expect(getIssueMessages(result, ['units'])).toContain('Please select a slot.');
    });

    it('emits an error when a unit references a platoon which is not in the list.', () => {
      const result = validateListData({
        ...validData,
        units: [{ ...validData.units[0], platoonId: 'plat99' }],
      }, context);
      expect(getIssueMessages(result, ['units'])).toContain('Unit references a non-existent platoon.');
    });

    it('emits an error when a unit has no platoon at all.', () => {
      const result = validateListData({
        ...validData,
        units: [{ id: 'unit00', sourceId: 'rifle_squad', slotId: 'hq_0' }],
      }, context);
      expect(getIssueMessages(result, ['units'])).toContain('Unit references a non-existent platoon.');
    });

    it('ignores platoons without a string ID when resolving a unit\u{2019}s platoon.', () => {
      const result = validateListData({
        ...validData,
        platoons: 'none',
      }, context);
      expect(getIssueMessages(result, ['units'])).toContain('Unit references a non-existent platoon.');
    });
  });

  describe('requireLegal', () => {

    it('accepts a list with at least one platoon and unit.', () => {
      expect(validateListData(validData, context, { requireLegal: true }).success).toBe(true);
    });

    it('emits an error when there are no platoons.', () => {
      const result = validateListData({
        ...validData,
        platoons: [],
        units: [],
      }, context, { requireLegal: true });
      expect(getIssueMessages(result, ['platoons'])).toContain('At least one platoon is required.');
    });

    it('emits an error when there are no units.', () => {
      const result = validateListData({
        ...validData,
        units: [],
      }, context, { requireLegal: true });
      expect(getIssueMessages(result, ['units'])).toContain('At least one unit is required.');
    });

    it('emits an error when platoons and units are not lists at all.', () => {
      const result = validateListData({
        ...validData,
        platoons: 'none',
        units: 'none',
      }, context, { requireLegal: true });
      expect(getIssueMessages(result, ['platoons'])).toContain('At least one platoon is required.');
      expect(getIssueMessages(result, ['units'])).toContain('At least one unit is required.');
    });
  });
});
