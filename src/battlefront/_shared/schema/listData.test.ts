import {
  describe,
  expect,
  it,
} from 'vitest';

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
import { createListDataSchema } from './listData';
import { hasNoDuplicateIds } from './listData.validators';

const context = {
  alignments,
  factions,
  eras,
  series,
  forceDiagrams,
  units,
} as const;

const validData = {
  meta: {
    forceDiagram: ForceDiagram.BerlinGerman,
    faction: Faction.Germany,
    alignment: Alignment.Axis,
    era: Era.LW,
    pointsLimit: 100,
  },
  formations: [
    { id: 'form00', sourceId: Unit.LG469 },
  ],
  units: [
    { id: 'unit00', sourceId: Unit.LG469, formationId: 'form00', slotId: 'hq_0' },
    { id: 'unit01', sourceId: Unit.LG469, formationId: 'form00', slotId: 'infantry_0' },
  ],
  commandCards: [],
};

describe('createListDataSchema', () => {

  it('accepts valid data.', () => {
    const result = createListDataSchema(context).safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe('.meta.forceDiagram', () => {
    it('should emit an error if value is missing and required.', () => {
      const result = createListDataSchema(context, {
        requiredFields: { forceDiagram: true },
      }).safeParse({ ...validData, meta: { ...validData.meta, forceDiagram: undefined } });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'forceDiagram'])).toContain('Please select a force diagram.');
    });
    it('should emit an error if value is not a recognized force diagram key.', () => {
      const result = createListDataSchema(context).safeParse({
        ...validData,
        meta: { ...validData.meta, forceDiagram: 'not_a_force_diagram' },
      });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'forceDiagram'])).toContain('Please select a force diagram.');
    });
    it('should emit an error if value does not match the selected faction.', () => {
      const result = createListDataSchema(context).safeParse({
        ...validData,
        meta: { ...validData.meta, faction: Faction.SovietUnion },
      });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'forceDiagram'])).toContain('The selected force diagram is not a valid option for the selected faction.');
    });
  });

  describe('.meta.faction', () => {
    it('should emit an error if value is missing and required.', () => {
      const result = createListDataSchema(context, {
        requiredFields: { faction: true },
      }).safeParse({ ...validData, meta: { ...validData.meta, faction: undefined } });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'faction'])).toContain('Please select a faction.');
    });
    it('should emit an error if value is not a recognized faction key.', () => {
      const result = createListDataSchema(context).safeParse({
        ...validData,
        meta: { ...validData.meta, faction: 'not_a_faction' },
      });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'faction'])).toContain('Please select a faction.');
    });
  });

  describe('.meta.alignment', () => {
    it('should emit an error if value is missing and required.', () => {
      const result = createListDataSchema(context, {
        requiredFields: { alignment: true },
      }).safeParse({ ...validData, meta: { ...validData.meta, alignment: undefined } });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'alignment'])).toContain('Please select an alignment.');
    });
    it('should emit an error if value is not a recognized alignment key.', () => {
      const result = createListDataSchema(context).safeParse({
        ...validData,
        meta: { ...validData.meta, alignment: 'not_an_alignment' },
      });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'alignment'])).toContain('Please select an alignment.');
    });
    it('should emit an error if value does not match the selected faction.', () => {
      const result = createListDataSchema(context).safeParse({
        ...validData,
        meta: { ...validData.meta, alignment: Alignment.Allies },
      });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'alignment'])).toContain('Alignment does not match the selected faction.');
    });
  });

  describe('.meta.era', () => {
    it('should not emit an era error if context has no eras.', () => {
       
      const { eras: _eras, ...contextWithoutEras } = context;
      const result = createListDataSchema(contextWithoutEras).safeParse({ ...validData, meta: { ...validData.meta, era: 'not_an_era' } });
      expect(getIssueMessages(result, ['meta', 'era'])).toHaveLength(0);
    });
    it('should emit an error if value is missing.', () => {
      const result = createListDataSchema(context).safeParse({ ...validData, meta: { ...validData.meta, era: undefined } });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'era'])).not.toHaveLength(0);
    });
    it('should emit an error if value is not a recognized era key.', () => {
      const result = createListDataSchema(context).safeParse({
        ...validData,
        meta: { ...validData.meta, era: 'not_an_era' },
      });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'era'])).toContain('Please select an era.');
    });
    it('should emit an error if value does not match the force diagram.', () => {
      const result = createListDataSchema(context).safeParse({
        ...validData,
        meta: { ...validData.meta, era: Era.MW },
      });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'era'])).toContain('Era does not match the force diagram.');
    });
  });

  describe('.meta.pointsLimit', () => {
    it('should emit an error if value is missing.', () => {
      const result = createListDataSchema(context).safeParse({ ...validData, meta: { ...validData.meta, pointsLimit: undefined } });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'pointsLimit'])).toContain('Please set a points limit.');
    });
    it('should emit an error if value is less than 0.', () => {
      const result = createListDataSchema(context).safeParse({
        ...validData,
        meta: { ...validData.meta, pointsLimit: -1 },
      });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['meta', 'pointsLimit'])).toContain('Points limit must be 0 or greater.');
    });
  });

  describe('.formations', () => {
    it('should emit an error if requireLegal is set and formations is empty.', () => {
      const result = createListDataSchema(context, {
        requireLegal: true,
      }).safeParse({ ...validData, formations: [], units: [] });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['formations'])).toContain('At least one formation is required.');
    });
    it('should emit an error if a formation does not match the force diagram era.', () => {
      const result = createListDataSchema(context).safeParse({
        ...validData,
        formations: [{ id: 'form00', sourceId: Unit.MG101 }],
        units: [
          { id: 'unit00', sourceId: Unit.LG469, formationId: 'form00', slotId: 'hq_0' },
        ],
      });
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
      const result = createListDataSchema(contextWithUnknownFd).safeParse({
        ...validData,
        formations: [{ id: 'form00', sourceId: 'unit_with_unknown_fd' }],
        units: [],
      });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['formations'])).toContain('Formation source has an unrecognized force diagram.');
    });
  });

  describe('.units', () => {
    it('should emit an error if requireLegal is set and units is empty.', () => {
      const result = createListDataSchema(context, {
        requireLegal: true,
      }).safeParse({ ...validData, formations: [], units: [] });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['units'])).toContain('At least one unit is required.');
    });
    it('should emit an error if a unit references a non-existent formation.', () => {
      const result = createListDataSchema(context).safeParse({
        ...validData,
        formations: [],
        units: [
          { id: 'unit00', sourceId: Unit.LG469, formationId: 'form00', slotId: 'hq_0' },
        ],
      });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['units'])).toContain('Unit references a non-existent formation.');
    });
    it('should accept empty formations and units.', () => {
      const result = createListDataSchema(context).safeParse({
        ...validData,
        formations: [],
        units: [],
      });
      expect(result.success).toBe(true);
    });
    it('should emit an error if a unit does not match the force diagram era.', () => {
      const result = createListDataSchema(context).safeParse({
        ...validData,
        units: [
          { id: 'unit00', sourceId: Unit.MG101, formationId: 'form00', slotId: 'hq_0' },
        ],
      });
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
      const result = createListDataSchema(contextWithUnknownFd).safeParse({
        ...validData,
        units: [
          { id: 'unit00', sourceId: 'unit_with_unknown_fd', formationId: 'form00', slotId: 'hq_0' },
        ],
      });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['units'])).toContain('Unit source has an unrecognized force diagram.');
    });
  });

  describe('.commandCards', () => {
    it('should emit an error if a command card references a non-existent target.', () => {
      const result = createListDataSchema(context).safeParse({
        ...validData,
        commandCards: [{ id: 'card00', sourceId: 'some-card', appliedTo: 'nope00' }],
      });
      expect(result.success).toBe(false);
      expect(getIssueMessages(result, ['commandCards'])).toContain('Command card references a non-existent target.');
    });
  });

  describe('duplicate IDs', () => {
    it('should emit an error if any IDs are duplicated.', () => {
      const result = createListDataSchema(context).safeParse({
        ...validData,
        units: [
          { id: 'unit00', sourceId: Unit.LG469, formationId: 'form00', slotId: 'hq_0' },
          { id: 'unit00', sourceId: Unit.LG469, formationId: 'form00', slotId: 'infantry_0' },
        ],
      });
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
});
