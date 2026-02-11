import {
  describe,
  expect,
  it,
} from 'vitest';
import { z } from 'zod';

import { getSchemaFieldErrors } from '../../../common/_internal/getSchemaFieldErrors';
import { ForceDiagram } from '../static/forceDiagrams';
import { Unit } from '../static/units';
import {
  commandCard,
  formation,
  ListData,
  listData,
  unit,
} from './listData';

/**
 * Helper to extract error messages for a specific issue path from a SafeParseReturnType.
 * Unlike getSchemaFieldErrors (which uses flatten() and only supports top-level fields),
 * this supports nested paths like ['meta', 'forceDiagram'].
 */
const getIssueMessages = (
  result: z.SafeParseReturnType<unknown, unknown>,
  path: (string | number)[],
): string[] => {
  if (result.success) {
    return [];
  }
  return result.error.issues
    .filter(
      (i) =>
        i.path.length === path.length &&
        i.path.every((p, idx) => p === path[idx]),
    )
    .map((i) => i.message);
};

const validFormation = {
  id: 'form00',
  sourceId: Unit.LG469,
};

const unit0 = {
  id: 'unit00',
  sourceId: Unit.LG469,
  formationId: 'form00',
  slotId: 'hq_0',
};

const unit1 = {
  id: 'unit01',
  sourceId: Unit.LG469,
  formationId: 'form00',
  slotId: 'infantry_0',
};

const unit2 = {
  id: 'unit02',
  sourceId: Unit.LG469,
  formationId: 'form00',
  slotId: 'infantry_1',
};

describe('FlamesOfWarV4.listData', () => {

  const validData: ListData = {
    meta: {
      forceDiagram: ForceDiagram.BerlinGerman,
      pointsLimit: 100,
    },
    formations: [validFormation],
    units: [
      unit0,
      unit1,
      unit2,
    ],
    commandCards: [],
  };

  it('accepts valid data.', () => {
    const result = listData.schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe('.meta', () => {
    describe('.forceDiagram', () => {
      it('should emit an error if value is missing.', () => {
        const result = listData.schema.safeParse({
          ...validData,
          meta: {
            ...validData.meta,
            forceDiagram: undefined,
          },
        });
        expect(result.success).toBe(false);
        expect(getIssueMessages(result, ['meta', 'forceDiagram'])).toContain('Please select a force diagram');
      });
    });
    describe('.pointsLimit', () => {
      it('should emit an error if value is missing.', () => {
        const result = listData.schema.safeParse({
          ...validData,
          meta: {
            ...validData.meta,
            pointsLimit: undefined,
          },
        });
        expect(result.success).toBe(false);
        expect(getIssueMessages(result, ['meta', 'pointsLimit'])).toContain('Please set a points limit.');
      });
      it('should emit an error if value is less than 0.', () => {
        const result = listData.schema.safeParse({
          ...validData,
          meta: {
            ...validData.meta,
            pointsLimit: -1,
          },
        });
        expect(result.success).toBe(false);
        expect(getIssueMessages(result, ['meta', 'pointsLimit'])).toContain('Points limit must be 0 or greater.');
      });
    });
  });

  it('should emit an error if there are duplicate IDs.', () => {
    const result = listData.schema.safeParse({
      ...validData,
      units: [
        unit0,
        { ...unit1, id: unit0.id }, // duplicate ID
        unit2,
      ],
    });
    expect(result.success).toBe(false);
    expect(getIssueMessages(result, [])).toContain('Duplicate IDs found.');
  });

  describe('.formations', () => {
    it('should emit an error if there are no formations.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        formations: [],
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'formations')).toContain('At least one formation is required.');
    });
    it('should emit an error if any formation\'s era does not match the force diagram\'s era.', () => {
      // Unit.MG101 is from AfrikaKorps (NorthAfrica series = Mid-War).
      // BerlinGerman is Berlin series = Late War. Era mismatch.
      const result = listData.schema.safeParse({
        ...validData,
        formations: [{ ...validFormation, sourceId: Unit.MG101 }],
        units: [
          { ...unit0, sourceId: Unit.MG101 },
          { ...unit1, sourceId: Unit.MG101 },
          { ...unit2, sourceId: Unit.MG101 },
        ],
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'formations')).toContain('Formation does not match the force diagram\'s era.');
    });
  });

  describe('.units', () => {
    it('should emit an error if there are no units.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        units: [],
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'units')).toContain('At least one unit is required.');
    });
    it('should emit an error if any unit is assigned to a non-existent formation ID.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        units: [
          { ...unit0, formationId: 'nope00' },
        ],
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'units')).toContain('Unit references a non-existent formation.');
    });
    it('should emit an error if any unit\'s era does not match the force diagram\'s era.', () => {
      // Unit.MG101 is Mid-War, BerlinGerman is Late War.
      const result = listData.schema.safeParse({
        ...validData,
        units: [
          { ...unit0, sourceId: Unit.MG101 },
        ],
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'units')).toContain('Unit does not match the force diagram\'s era.');
    });
  });

  describe('.commandCards', () => {
    it('should emit an error if any card is applied to a non-existent formation/unit ID.', () => {
      const result = listData.schema.safeParse({
        ...validData,
        commandCards: [
          { id: 'card00', sourceId: 'some-card', appliedTo: 'nope00' },
        ],
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'commandCards')).toContain('Command card references a non-existent target.');
    });
    // No CommandCard static enum exists yet, so era validation cannot be performed on sourceId.
    it.todo('should emit an error if any card\'s era does not match the force diagram\'s era.');
  });
});

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
