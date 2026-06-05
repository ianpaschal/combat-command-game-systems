import { createRegistrationDetailsSchema, GenericRegistrationDetails } from '../../_shared/schema/registrationDetails';
import { Alignment, alignments } from '../static/alignments';
import { Faction, factions } from '../static/factions';

/** @deprecated Use `ListData` instead. */
export type RegistrationDetails = GenericRegistrationDetails<Alignment, Faction>;

/** @deprecated Use `ListData` instead. */
export type RegistrationDetailFormData = {
  alignment: null;
  faction: null;
};

/** @deprecated Use `listData` instead. */
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
