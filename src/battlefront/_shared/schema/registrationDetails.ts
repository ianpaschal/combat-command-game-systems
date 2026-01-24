import { z } from 'zod';

import { createEnumSchemaFromKeys } from '../../../common/_internal';
import { emptyToUndefined } from '../../../common/_internal/emptyToUndefined';
import { AlignmentMetadata, FactionMetadata } from '../types';

export const createRegistrationDetailsSchema = <
  TAlignment extends string,
  TFaction extends string,
>(
  context: {
    alignments: Record<TAlignment, AlignmentMetadata>;
    factions: Record<TFaction, FactionMetadata<TAlignment>>;
  },
  requiredFields?: {
    alignment?: boolean;
    faction?: boolean;
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => z.object({
  alignment: emptyToUndefined(createEnumSchemaFromKeys(context.alignments).transform((val) => val as TAlignment).optional()),
  faction: emptyToUndefined(createEnumSchemaFromKeys(context.factions).transform((val) => val as TFaction).optional()),
}).superRefine((data, ctx) => {
  const { alignments, factions } = context;

  const alignment = data.alignment ? alignments[data.alignment] : undefined;
  const faction = data.faction ? factions[data.faction] : undefined;

  if (data.alignment && !alignment) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid alignment for this game system.',
      path: ['alignment'],
    });
  }

  if (!data.alignment && (data.faction || requiredFields?.alignment)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Required',
      path: ['alignment'],
    });
  }

  if (data.faction && !faction) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid faction for this game system.',
      path: ['faction'],
    });
  }

  if (data.alignment && faction && faction.alignment !== data.alignment) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Mismatch between alignment and faction.',
      path: ['alignment', 'faction'],
    });
  }
});

export type GenericRegistrationDetails<
  TAlignment extends string = string,
  TFaction extends string = string,
> = z.infer<ReturnType<typeof createRegistrationDetailsSchema<TAlignment, TFaction>>>;
