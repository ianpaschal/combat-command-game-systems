import {
  describe,
  expect,
  it,
} from 'vitest';

import { Alignment } from '../static/alignments';
import { Faction } from '../static/factions';
import { registrationDetails } from './registrationDetails';

describe('FlamesOfWarV4.registrationDetails', () => {

  const schema = registrationDetails.createSchema();

  it('accepts valid data.', () => {
    const result = schema.safeParse({
      alignment: Alignment.Allies,
      faction: Faction.UnitedStates,
    });
    expect(result.success).toBe(true);
  });

  it('accepts data with required alignment.', () => {
    const schemaWithRequired = registrationDetails.createSchema({ alignment: true });
    const result = schemaWithRequired.safeParse({
      alignment: Alignment.Axis,
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing alignment when required.', () => {
    const schemaWithRequired = registrationDetails.createSchema({ alignment: true });
    const result = schemaWithRequired.safeParse({});
    expect(result.success).toBe(false);
  });
});
