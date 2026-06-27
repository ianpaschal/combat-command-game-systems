import { z } from 'zod';

import {
  hasNoDuplicateIds,
  ListDataContext,
  ListDataOptions,
  ListDataShape,
  validateAlignment,
  validateCommandCard,
  validateEra,
  validateFaction,
  validateForceDiagram,
  validateFormation,
  validateLegality,
  validateUnit,
} from './listData.validators';

export type { ListDataContext, ListDataOptions, ListDataShape } from './listData.validators';

/**
 * Applies the cross-field validation rules shared by every game system's list data schema.
 * Each game system builds its own concrete `z.object({...})` (since `meta` shape varies, e.g.
 * `era`), then calls this from its own `.superRefine()`.
 */
export const applyListDataRefinements = (
  data: ListDataShape,
  ctx: z.RefinementCtx,
  context: ListDataContext,
  options?: ListDataOptions,
): void => {

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
};
