import { z } from 'zod';

import { createEnumSchemaFromKeys } from '../../../common/_internal';
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

export { commandCard };

export const formation = createFormationSchema(createEnumSchemaFromKeys(units, {
  errorMap: () => ({ message: 'Please select a formation' }),
}));

export const unit = createUnitSchema(createEnumSchemaFromKeys(units, {
  errorMap: () => ({ message: 'Please select a unit' }),
}));

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

export const listData = {
  createSchema: (options?: CreateListDataSchemaOptions) => createListDataSchema({
    alignments,
    factions,
    eras,
    series,
    forceDiagrams,
    units,
  }, options),
  defaultValues: {
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
  } satisfies ListDataFormData,
} as const;

export type ListData = z.infer<ReturnType<typeof listData.createSchema>>;
