import { createRegistrationDetailsSchema, GenericRegistrationDetails } from '../../_shared/schema/registrationDetails';
import { Alignment, alignments } from '../static/alignments';
import { Faction, factions } from '../static/factions';

export type RegistrationDetails = GenericRegistrationDetails<Alignment, Faction>;

export type RegistrationDetailFormData = {
  alignment: null;
  faction: null;
};

/**
 * Useful to single import both schema and default values.
 */
export const registrationDetails = {
  createSchema: (
    requiredFields?: {
      alignment?: boolean;
      faction?: boolean;
      forceDiagram?: boolean;
    },
  ) => createRegistrationDetailsSchema({ alignments, factions }, requiredFields),
  defaultValues: {
    alignment: null,
    faction: null,
  } satisfies RegistrationDetailFormData,
} as const;
