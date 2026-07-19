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
  if (Array.isArray(formations)) {
    for (const formation of formations) {
      issues.push(...validateFormation(data, formation, context));
    }
  } else {
    issues.push({ path: ['formations'], message: 'Formations must be a list.' });
  }

  const units = getValue(data, ['units']);
  if (Array.isArray(units)) {
    for (const unit of units) {
      issues.push(...validateUnit(data, unit, context), ...validateSlot(unit));
    }
  } else {
    issues.push({ path: ['units'], message: 'Units must be a list.' });
  }

  const commandCards = getValue(data, ['commandCards']);
  if (Array.isArray(commandCards)) {
    for (const card of commandCards) {
      issues.push(...validateCommandCard(data, card));
    }
  } else {
    issues.push({ path: ['commandCards'], message: 'Command cards must be a list.' });
  }

  if (options?.requireLegal) {
    issues.push(...validateLegality(data));
  }

  if (issues.length > 0) {
    return { success: false, issues };
  }

  return { success: true, data: data as TListData };
};
