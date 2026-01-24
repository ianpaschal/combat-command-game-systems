import {
  describe,
  expect,
  it,
} from 'vitest';

import { getSchemaFieldErrors } from '../../../common/_internal/getSchemaFieldErrors';
import { AlignmentMetadata, FactionMetadata } from '../types';
import { createRegistrationDetailsSchema, GenericRegistrationDetails } from './registrationDetails';

describe('createRegistrationDetailsSchema()', () => {

  enum Alignment {
    Allies = 'allies',
    Axis = 'axis',
  }

  enum Faction {
    USA = 'usa',
    UK = 'uk',
    Germany = 'germany',
  }

  const alignments: Record<Alignment, AlignmentMetadata> = {
    [Alignment.Allies]: { displayName: 'Allies' },
    [Alignment.Axis]: { displayName: 'Axis' },
  };

  const factions: Record<Faction, FactionMetadata<Alignment>> = {
    [Faction.USA]: { displayName: 'USA', alignment: Alignment.Allies },
    [Faction.UK]: { displayName: 'UK', alignment: Alignment.Allies },
    [Faction.Germany]: { displayName: 'Germany', alignment: Alignment.Axis },
  };

  const context = { alignments, factions };

  const validData: GenericRegistrationDetails<Alignment, Faction> = {
    alignment: Alignment.Allies,
    faction: Faction.USA,
  };

  const schema = createRegistrationDetailsSchema(context);

  it('accepts valid data.', () => {
    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('accepts data with only alignment.', () => {
    const result = schema.safeParse({
      alignment: Alignment.Allies,
    });
    expect(result.success).toBe(true);
  });

  it('accepts data with neither alignment nor faction.', () => {
    const result = schema.safeParse({});
    expect(result.success).toBe(true);
  });

  describe('.alignment', () => {
    it('should emit an error if value is not a valid alignment.', () => {
      const result = schema.safeParse({
        ...validData,
        alignment: 'invalid',
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if alignment is missing but faction is provided.', () => {
      const result = schema.safeParse({
        faction: Faction.USA,
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'alignment')).toContain('Required');
    });

    it('should emit an error if alignment is required and missing.', () => {
      const schemaWithRequired = createRegistrationDetailsSchema(context, { alignment: true });
      const result = schemaWithRequired.safeParse({});
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'alignment')).toContain('Required');
    });
  });

  describe('.faction', () => {
    it('should emit an error if value is not a valid faction.', () => {
      const result = schema.safeParse({
        ...validData,
        faction: 'invalid',
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if faction does not match alignment.', () => {
      const result = schema.safeParse({
        alignment: Alignment.Allies,
        faction: Faction.Germany,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessages = result.error.issues.map((issue) => issue.message);
        expect(errorMessages).toContain('Mismatch between alignment and faction.');
      }
    });

    it('accepts faction as undefined when alignment is provided.', () => {
      const result = schema.safeParse({
        alignment: Alignment.Axis,
        faction: undefined,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('converts empty strings to undefined.', () => {
      const result = schema.safeParse({
        alignment: '',
        faction: '',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.alignment).toBeUndefined();
        expect(result.data.faction).toBeUndefined();
      }
    });
  });
});
