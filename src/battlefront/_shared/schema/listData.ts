import { z } from 'zod';

import { createEnumSchemaFromKeys } from '../../../common/_internal';
import {
  AlignmentMetadata,
  EraMetadata,
  FactionMetadata,
  ForceDiagramMetadata,
  SeriesMetadata,
  UnitMetadata,
} from '../types';
import { commandCard } from './commandCard';
import { createFormationSchema } from './formation';
import {
  hasNoDuplicateIds,
  validateAlignment,
  validateCommandCard,
  validateEra,
  validateFaction,
  validateForceDiagram,
  validateFormation,
  validateLegality,
  validateUnit,
} from './listData.validators';
import { createUnitSchema } from './unit';

export const createListDataSchema = <
  TAlignment extends string,
  TFaction extends string,
  TEra extends string,
  TSeries extends string,
  TForceDiagram extends string,
>(
  context: {
    alignments: Record<TAlignment, AlignmentMetadata>;
    factions: Record<TFaction, FactionMetadata<TAlignment>>;
    eras: Record<TEra, EraMetadata>;
    series: Record<TSeries, SeriesMetadata<TEra>>;
    forceDiagrams: Record<TForceDiagram, ForceDiagramMetadata<TFaction, TSeries>>;
    units: Record<string, UnitMetadata<TForceDiagram>>;
  },
  options?: {
    requiredFields?: {
      forceDiagram?: boolean;
      faction?: boolean;
      alignment?: boolean;
    };
    requireLegal?: boolean;
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => z.object({
  meta: z.object({
    forceDiagram: z.string().optional(),
    faction: z.string().optional(),
    alignment: z.string().optional(),
    era: z.string(),
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
}).superRefine((data, ctx) => {

  // Validate all metadata fields:
  validateForceDiagram(ctx, data, context, options);
  validateFaction(ctx, data, context, options);
  validateAlignment(ctx, data, context, options);
  validateEra(ctx, data, context);

  // Units & Formations
  if (!hasNoDuplicateIds(data)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Duplicate IDs found.',
      path: [],
    });
  }

  for (const formation of data.formations) {
    validateFormation(ctx, data, formation, context);
  }

  for (const unit of data.units) {
    validateUnit(ctx, data, unit, context);
  }

  for (const card of data.commandCards) {
    validateCommandCard(ctx, data, card);
  }

  if (options?.requireLegal) {
    validateLegality(ctx, data);
  }
});

export type GenericListData = z.infer<ReturnType<typeof createListDataSchema>>;
export type CreateListDataSchemaContext = Parameters<typeof createListDataSchema>[0];
export type CreateListDataSchemaOptions = Parameters<typeof createListDataSchema>[1];
