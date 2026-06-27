import { z } from 'zod';

import { createEnumSchemaFromKeys } from '../../../common/_internal';
import { emptyToUndefined } from '../../../common/_internal/emptyToUndefined';
import { commandCard } from '../../_shared/schema/commandCard';
import { createFormationSchema } from '../../_shared/schema/formation';
import { applyListDataRefinements, ListDataOptions } from '../../_shared/schema/listData';
import { createUnitSchema } from '../../_shared/schema/unit';
import { Alignment, alignments } from '../static/alignments';
import { Faction, factions } from '../static/factions';
import { ForceDiagram, forceDiagrams } from '../static/forceDiagrams';
import { Unit, units } from '../static/units';

const context = {
  alignments,
  factions,
  forceDiagrams,
  units,
} as const;

export type ListDataFormData = {
  meta: {
    forceDiagram: ForceDiagram | null;
    faction: Faction | null;
    alignment: Alignment | null;
    pointsLimit: number;
  };
  formations: z.infer<ReturnType<typeof createFormationSchema<z.ZodNativeEnum<typeof Unit>>>>[];
  units: z.infer<ReturnType<typeof createUnitSchema<z.ZodNativeEnum<typeof Unit>>>>[];
  commandCards: z.infer<typeof commandCard>[];
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createSchema = (options?: ListDataOptions) => z.object({
  meta: z.object({
    forceDiagram: emptyToUndefined(z.string()),
    faction: emptyToUndefined(z.string()),
    alignment: emptyToUndefined(z.string()),
    pointsLimit: z.coerce.number({
      invalid_type_error: 'Please set a points limit.',
    }).min(0, 'Points limit must be 0 or greater.'),
  }),
  formations: z.array(createFormationSchema(createEnumSchemaFromKeys(context.units, {
    errorMap: () => ({ message: 'Please select a formation.' }),
  }))),
  units: z.array(createUnitSchema(createEnumSchemaFromKeys(context.units, {
    errorMap: () => ({ message: 'Please select a unit.' }),
  }))),
  commandCards: z.array(commandCard),
}).superRefine((data, ctx) => applyListDataRefinements(data, ctx, context, options));

export const listData = {
  schema: createSchema(),
  createSchema,
  defaultValues: {
    meta: {
      forceDiagram: null,
      faction: null,
      alignment: null,
      pointsLimit: 100,
    },
    formations: [],
    units: [],
    commandCards: [],
  } satisfies ListDataFormData,
} as const;

export type ListData = z.infer<ReturnType<typeof listData.createSchema>>;
