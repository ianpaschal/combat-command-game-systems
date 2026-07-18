import { ValidateListDataResult, ValidationIssue } from '../../../common';
import { getValue } from '../../../common/_internal';
import {
  hasNoDuplicateIds,
  ListDataContext,
  ListDataOptions,
  validateAlignment,
  validateCommandCard,
  validateEra,
  validateFaction,
  validateForceDiagram,
  validateFormation,
  validateLegality,
  validatePointsLimit,
  validateSlot,
  validateUnit,
} from './validateListData.validators';

export type { ListDataContext, ListDataOptions } from './validateListData.validators';

/**
 * Validates a game system's list data end to end: runs the cross-field rules (force diagram/
 * faction/alignment/era consistency, duplicate IDs, per-unit slot and formation checks, points
 * limit) against `data`, tolerating whatever shape it actually turns out to be. Each game system
 * calls this from its own `validate` with its own static `context` and supplies `TListData` for
 * its concrete `ListData` type.
 *
 * @param data - Raw, potentially malformed input
 * @param context - Static game-system context (force diagrams, factions, etc.)
 * @param options - Required fields and legality options
 * @returns The validated, concretely-typed list data, or the collected issues
 */
export const validateListData = <TListData>(
  data: unknown,
  context: ListDataContext,
  options?: ListDataOptions,
): ValidateListDataResult<TListData> => {
  if (typeof data !== 'object' || data === null) {
    return {
      success: false,
      issues: [{ path: [], message: 'Invalid list data.' }],
    };
  }

  const issues: ValidationIssue[] = [];

  // Validate all metadata fields:
  issues.push(
    ...validateForceDiagram(data, context, options),
    ...validateFaction(data, context, options),
    ...validateAlignment(data, context, options),
    ...validateEra(data, context),
    ...validatePointsLimit(getValue(data, ['meta', 'pointsLimit'])),
  );

  // Units & Formations
  if (!hasNoDuplicateIds(data)) {
    issues.push({
      message: 'Duplicate IDs found.',
      path: [],
    });
  }

  const formations = getValue(data, ['formations']);
  for (const formation of Array.isArray(formations) ? formations : []) {
    issues.push(...validateFormation(data, formation, context));
  }

  const units = getValue(data, ['units']);
  for (const unit of Array.isArray(units) ? units : []) {
    issues.push(...validateUnit(data, unit, context), ...validateSlot(unit));
  }

  const commandCards = getValue(data, ['commandCards']);
  for (const card of Array.isArray(commandCards) ? commandCards : []) {
    issues.push(...validateCommandCard(data, card));
  }

  if (options?.requireLegal) {
    issues.push(...validateLegality(data));
  }

  if (issues.length > 0) {
    return { success: false, issues };
  }

  return { success: true, data: data as TListData };
};
