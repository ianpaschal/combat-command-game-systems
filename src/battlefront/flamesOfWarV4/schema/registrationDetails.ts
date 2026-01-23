import { createRegistrationDetailsSchema, RegistrationDetails } from '../../_shared/schema/registrationDetails';
import { alignments } from '../static/alignments';
import { factions } from '../static/factions';

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
  } satisfies RegistrationDetails,
} as const;
