import { merge } from 'lodash';
import { z } from 'zod';

import { commandCard } from '../../_shared/schema/commandCard';
import { createFormationSchema } from '../../_shared/schema/formation';
import { createListDataSchema, CreateListDataSchemaOptions } from '../../_shared/schema/listData';
import { createUnitSchema } from '../../_shared/schema/unit';
import { Alignment, alignments } from '../static/alignments';
import { Era, eras } from '../static/eras';
import { Faction, factions } from '../static/factions';
import { ForceDiagram, forceDiagrams } from '../static/forceDiagrams';
import { series } from '../static/series';
import { Unit, units } from '../static/units';
import { gameSystemConfig } from './gameSystemConfig';

const context = {
  alignments,
  factions,
  eras,
  series,
  forceDiagrams,
  units,
} as const;

export type ListDataFormData = {
  meta: {
    forceDiagram: ForceDiagram | null;
    faction: Faction | null;
    alignment: Alignment | null;
    era: Era | null;
    pointsLimit: number;
  };
  formations: z.infer<ReturnType<typeof createFormationSchema<z.ZodNativeEnum<typeof Unit>>>>[];
  units: z.infer<ReturnType<typeof createUnitSchema<z.ZodNativeEnum<typeof Unit>>>>[];
  commandCards: z.infer<typeof commandCard>[];
};

const defaultValues: ListDataFormData = {
  meta: {
    forceDiagram: null,
    faction: null,
    alignment: null,
    era: null,
    pointsLimit: 100,
  },
  formations: [],
  units: [],
  commandCards: [],
};

export const listData = {
  schema: createListDataSchema(context),
  createSchema: (options?: CreateListDataSchemaOptions) => createListDataSchema(context, options),
  defaultValues,
  getDefaultValues: (config: unknown): ListDataFormData => {
    const { era, points } = gameSystemConfig.schema.parse(config);
    return merge({}, defaultValues, {
      meta: {
        era,
        pointsLimit: points,
      },
    });
  },
} as const;

export type ListData = z.infer<ReturnType<typeof listData.createSchema>>;
