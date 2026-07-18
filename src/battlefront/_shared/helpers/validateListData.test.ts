import {
  describe,
  expect,
  it,
} from 'vitest';

import { ValidateListDataResult } from '../../../common';
import { alignments } from '../../flamesOfWarV4/static/alignments';
import { Alignment } from '../../flamesOfWarV4/static/alignments';
import { eras } from '../../flamesOfWarV4/static/eras';
import { Era } from '../../flamesOfWarV4/static/eras';
import { factions } from '../../flamesOfWarV4/static/factions';
import { Faction } from '../../flamesOfWarV4/static/factions';
import { ForceDiagram, forceDiagrams } from '../../flamesOfWarV4/static/forceDiagrams';
import { series } from '../../flamesOfWarV4/static/series';
import { Unit, units } from '../../flamesOfWarV4/static/units';
import { getIssueMessages } from '../_fixtures/getIssueMessages';
import {
  ListDataContext,
  ListDataOptions,
  validateListData,
} from './validateListData';
import { hasNoDuplicateIds } from './validateListData.validators';

const context: ListDataContext = {
  alignments,
  factions,
  eras,
  series,
  forceDiagrams,
  units,
};

const validData = {
  meta: {
    forceDiagram: ForceDiagram.BerlinGerman as string | undefined,
    faction: Faction.Germany as string | undefined,
    alignment: Alignment.Axis as string | undefined,
    era: Era.LW as string | undefined,
    pointsLimit: 100,
  },
  formations: [
    { id: 'form00', sourceId: Unit.LG469 },
  ],
  units: [
    { id: 'unit00', sourceId: Unit.LG469, formationId: 'form00', slotId: 'slot00' },
    { id: 'unit01', sourceId: Unit.LG469, formationId: 'form00', slotId: 'slot01' },
  ],
  commandCards: [] as { id?: string; sourceId?: string; appliedTo?: string }[],
};

const runRefinements = (
  data: unknown,
  testContext: ListDataContext = context,
  options?: ListDataOptions,
): ValidateListDataResult<unknown> => validateListData(data, testContext, options);

describe('validateListData', () => {

  it('accepts valid data.', () => {
    const result = runRefinements(validData, context);
    expect(result.success).toBe(true);
  });

  it('rejects non-object data instead of throwing.', () => {
    expect(runRefinements(undefined).success).toBe(false);
    expect(runRefinements(null).success).toBe(false);
    expect(runRefinements('nope').success).toBe(false);
  });

  it('treats missing formations/units/commandCards as empty instead of throwing.', () => {
    const result = runRefinements({ meta: validData.meta });
    expect(result.success).toBe(true);
  });

  it('treats a missing formations list as having no valid targets when checking units/commandCards, instead of throwing.', () => {
    const result = runRefinements({
      meta: validData.meta,
      units: [{ id: 'unit00', sourceId: Unit.LG469, formationId: 'form00', slotId: 'slot00' }],
      commandCards: [{ id: 'card00', sourceId: 'some-card', appliedTo: 'unit00' }],
    });
    expect(result.success).toBe(false);
    expect(getIssueMessages(result, ['units'])).toContain('Unit references a non-existent formation.');
  });

  describe('.meta.forceDiagram', () => {
    it('should emit an error if value is missing and required.', () => {
      const result = runRefinements(
        { ...validData, meta: { ...validData.meta, forceDiagram: undefined } },
        context,
        { requiredFields: { forceDiagram: true } },
      );
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'forceDiagram'])).toContain('Please select a force diagram.');
    });
    it('should emit an error if value is not a recognized force diagram key.', () => {
      const result = runRefinements({
        ...validData,
        meta: { ...validData.meta, forceDiagram: 'not_a_force_diagram' },
      }, context);
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'forceDiagram'])).toContain('Please select a force diagram.');
    });
    it('should emit an error if value does not match the selected faction.', () => {
      const result = runRefinements({
        ...validData,
        meta: { ...validData.meta, faction: Faction.SovietUnion },
      }, context);
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'forceDiagram'])).toContain('The selected force diagram is not a valid option for the selected faction.');
    });
  });

  describe('.meta.faction', () => {
    it('should emit an error if value is missing and required.', () => {
      const result = runRefinements(
        { ...validData, meta: { ...validData.meta, faction: undefined } },
        context,
        { requiredFields: { faction: true } },
      );
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'faction'])).toContain('Please select a faction.');
    });
    it('should emit an error if value is not a recognized faction key.', () => {
      const result = runRefinements({
        ...validData,
        meta: { ...validData.meta, faction: 'not_a_faction' },
      }, context);
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'faction'])).toContain('Please select a faction.');
    });
  });

  describe('.meta.alignment', () => {
    it('should emit an error if value is missing and required.', () => {
      const result = runRefinements(
        { ...validData, meta: { ...validData.meta, alignment: undefined } },
        context,
        { requiredFields: { alignment: true } },
      );
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'alignment'])).toContain('Please select an alignment.');
    });
    it('should emit an error if value is not a recognized alignment key.', () => {
      const result = runRefinements({
        ...validData,
        meta: { ...validData.meta, alignment: 'not_an_alignment' },
      }, context);
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'alignment'])).toContain('Please select an alignment.');
    });
    it('should emit an error if value does not match the selected faction.', () => {
      const result = runRefinements({
        ...validData,
        meta: { ...validData.meta, alignment: Alignment.Allies },
      }, context);
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'alignment'])).toContain('Alignment does not match the selected faction.');
    });
  });

  describe('.meta.era', () => {
    it('should not emit an era error if context has no eras.', () => {
      const { eras: _eras, ...contextWithoutEras } = context;
      const result = runRefinements(
        { ...validData, meta: { ...validData.meta, era: 'not_an_era' } },
        contextWithoutEras,
      );
      expect(getIssueMessages(result, ['meta', 'era'])).toHaveLength(0);
    });
    it('should emit an error if value is missing.', () => {
      const result = runRefinements({ ...validData, meta: { ...validData.meta, era: undefined } }, context);
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'era'])).not.toHaveLength(0);
    });
    it('should emit an error if value is not a recognized era key.', () => {
      const result = runRefinements({
        ...validData,
        meta: { ...validData.meta, era: 'not_an_era' },
      }, context);
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'era'])).toContain('Please select an era.');
    });
    it('should emit an error if value does not match the force diagram.', () => {
      const result = runRefinements({
        ...validData,
        meta: { ...validData.meta, era: Era.MW },
      }, context);
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'era'])).toContain('Era does not match the force diagram.');
    });
  });

  describe('.formations', () => {
    it('should emit an error if requireLegal is set and formations is empty.', () => {
      const result = runRefinements(
        { ...validData, formations: [], units: [] },
        context,
        { requireLegal: true },
      );
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['formations'])).toContain('At least one formation is required.');
    });
    it('should emit an error if a formation does not match the force diagram era.', () => {
      const result = runRefinements({
        ...validData,
        formations: [{ id: 'form00', sourceId: Unit.MG101 }],
        units: [
          { id: 'unit00', sourceId: Unit.LG469, formationId: 'form00' },
        ],
      }, context);
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['formations'])).toContain('Formation does not match the force diagram\'s era.');
    });
    it('should emit an error if a formation source has an unrecognized force diagram.', () => {
      const contextWithUnknownFd = {
        ...context,
        units: {
          ...context.units,
          unit_with_unknown_fd: { displayName: 'Unknown', sourceForceDiagram: 'unknown_fd' },
        },
      } as typeof context;
      const result = runRefinements(
        {
          ...validData,
          formations: [{ id: 'form00', sourceId: 'unit_with_unknown_fd' }],
          units: [],
        },
        contextWithUnknownFd,
      );
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['formations'])).toContain('Formation source has an unrecognized force diagram.');
    });
  });

  describe('.units', () => {
    it('should emit an error if requireLegal is set and units is empty.', () => {
      const result = runRefinements(
        { ...validData, formations: [], units: [] },
        context,
        { requireLegal: true },
      );
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['units'])).toContain('At least one unit is required.');
    });
    it('should emit an error if a unit references a non-existent formation.', () => {
      const result = runRefinements({
        ...validData,
        formations: [],
        units: [
          { id: 'unit00', sourceId: Unit.LG469, formationId: 'form00' },
        ],
      }, context);
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['units'])).toContain('Unit references a non-existent formation.');
    });
    it('should accept empty formations and units.', () => {
      const result = runRefinements({
        ...validData,
        formations: [],
        units: [],
      }, context);
      expect(result.success).toBe(true);
    });
    it('should emit an error if a unit does not match the force diagram era.', () => {
      const result = runRefinements({
        ...validData,
        units: [
          { id: 'unit00', sourceId: Unit.MG101, formationId: 'form00' },
        ],
      }, context);
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['units'])).toContain('Unit does not match the force diagram\'s era.');
    });
    it('should emit an error if a unit source has an unrecognized force diagram.', () => {
      const contextWithUnknownFd = {
        ...context,
        units: {
          ...context.units,
          unit_with_unknown_fd: { displayName: 'Unknown', sourceForceDiagram: 'unknown_fd' },
        },
      } as typeof context;
      const result = runRefinements(
        {
          ...validData,
          units: [
            { id: 'unit00', sourceId: 'unit_with_unknown_fd', formationId: 'form00' },
          ],
        },
        contextWithUnknownFd,
      );
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['units'])).toContain('Unit source has an unrecognized force diagram.');
    });
  });

  describe('.commandCards', () => {
    it('should emit an error if a command card references a non-existent target.', () => {
      const result = runRefinements({
        ...validData,
        commandCards: [{ id: 'card00', sourceId: 'some-card', appliedTo: 'nope00' }],
      }, context);
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['commandCards'])).toContain('Command card references a non-existent target.');
    });
  });

  describe('duplicate IDs', () => {
    it('should emit an error if any IDs are duplicated.', () => {
      const result = runRefinements({
        ...validData,
        units: [
          { id: 'unit00', sourceId: Unit.LG469, formationId: 'form00' },
          { id: 'unit00', sourceId: Unit.LG469, formationId: 'form00' },
        ],
      }, context);
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, [])).toContain('Duplicate IDs found.');
    });
  });
});

describe('hasNoDuplicateIds', () => {
  it('returns true when all IDs are unique.', () => {
    expect(hasNoDuplicateIds(validData)).toBe(true);
  });
  it('returns false when there are duplicate IDs.', () => {
    expect(hasNoDuplicateIds({
      ...validData,
      units: [validData.units[0], validData.units[0]],
    })).toBe(false);
  });
  it('treats missing formations/units/commandCards as having no IDs.', () => {
    expect(hasNoDuplicateIds({})).toBe(true);
  });
});
