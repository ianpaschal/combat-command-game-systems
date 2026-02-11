import { z } from 'zod';

import { createEnumSchema } from '../../../common/_internal';
import { listDataId } from '../../../common/schemas/listDataId';
import { ForceDiagram } from '../static/forceDiagrams';
import { Unit } from '../static/units';
import {
  hasAtLeastOneFormation,
  hasAtLeastOneUnit,
  hasNoDuplicateIds,
  isCommandCardTargetValid,
  isFormationEraValid,
  isUnitEraValid,
  isUnitFormationIdValid,
} from './listData.validators';

export const formation = z.object({
  id: listDataId({
    message: 'Please set an ID',
  }),
  sourceId: createEnumSchema(Unit, {
    errorMap: () => ({ message: 'Please select a formation' }),
  }),
});

export const unit = z.object({
  id: listDataId(),
  sourceId: createEnumSchema(Unit, {
    errorMap: () => ({ message: 'Please select a unit' }),
  }),
  formationId: z.union([listDataId(), z.literal('support')]), // Formation ID
  slotId: z.string(), // e.g. Armour 1
});

export const commandCard = z.object({
  id: listDataId(),
  sourceId: z.string(),
  appliedTo: listDataId(), // Formation ID or unit ID
});

export const listData = {
  schema: z.object({
    meta: z.object({
      forceDiagram: createEnumSchema(ForceDiagram, {
        errorMap: () => ({ message: 'Please select a force diagram' }),
      }),
      pointsLimit: z.coerce.number({
        invalid_type_error: 'Please set a points limit.',
      }).min(0, 'Points limit must be 0 or greater.'),
    }),
    formations: z.array(formation),
    units: z.array(unit),
    commandCards: z.array(commandCard),
  }).superRefine((data, ctx) => {
    if (!hasNoDuplicateIds(data)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Duplicate IDs found.',
      });
    }
    if (!hasAtLeastOneFormation(data)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one formation is required.',
        path: ['formations'],
      });
    }
    if (!hasAtLeastOneUnit(data)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one unit is required.',
        path: ['units'],
      });
    }
    for (const f of data.formations) {
      if (!isFormationEraValid(data, f.sourceId as Unit)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Formation does not match the force diagram\'s era.',
          path: ['formations'],
        });
      }
    }
    for (const u of data.units) {
      if (!isUnitEraValid(data, u.sourceId as Unit)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Unit does not match the force diagram\'s era.',
          path: ['units'],
        });
      }
    }
    for (const u of data.units) {
      if (!isUnitFormationIdValid(data, u.formationId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Unit references a non-existent formation.',
          path: ['units'],
        });
      }
    }
    for (const c of data.commandCards) {
      if (!isCommandCardTargetValid(data, c.appliedTo)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Command card references a non-existent target.',
          path: ['commandCards'],
        });
      }
    }
  }),
} as const;

// export type ListData = GenericRegistrationDetails<Alignment, Faction>;
export type ListData = z.infer<typeof listData.schema>;
