import { z } from 'zod';

import { commandCard } from '../../_shared/schema/commandCard';
import { createFormationSchema } from '../../_shared/schema/formation';
import { createListDataSchema, CreateListDataSchemaOptions } from '../../_shared/schema/listData';
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

export const listData = {
  schema: createListDataSchema(context),
  createSchema: (options?: CreateListDataSchemaOptions) => createListDataSchema(context, options),
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
