import { ValidateListDataResult, ValidationIssue } from '../../../common';
import { getValue } from '../../../common/_internal';
import {
  hasNoDuplicateIds,
  ListDataContext,
  ListDataOptions,
  validateAlignment,
  validateFaction,
  validateLegality,
  validatePlatoon,
  validatePointsLimit,
  validateSlot,
  validateUnit,
} from './validateListData.validators';

export type { ListDataContext, ListDataOptions } from './validateListData.validators';

/**
 * Validates a Bolt Action list end to end: the meta fields (faction, alignment, points limit) and
 * the army itself (duplicate IDs, per-platoon and per-unit checks), tolerating whatever shape
 * `data` actually turns out to be.
 *
 * @remarks
 * Bolt Action has no force diagrams, no series, no eras, and no command cards, so unlike the
 * Battlefront systems there is no cross-field narrowing to check beyond faction and alignment
 * agreeing with one another.
 *
 * @param data - Raw, potentially malformed input
 * @param context - Static game-system context (factions, alignments, units)
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
    ...validateFaction(data, context, options),
    ...validateAlignment(data, context, options),
    ...validatePointsLimit(getValue(data, ['meta', 'pointsLimit'])),
  );

  // Platoons & Units:
  if (!hasNoDuplicateIds(data)) {
    issues.push({
      message: 'Duplicate IDs found.',
      path: [],
    });
  }

  const platoons = getValue(data, ['platoons']);
  if (Array.isArray(platoons)) {
    for (const platoon of platoons) {
      issues.push(...validatePlatoon(platoon, context));
    }
  } else {
    issues.push({ path: ['platoons'], message: 'Platoons must be a list.' });
  }

  const units = getValue(data, ['units']);
  if (Array.isArray(units)) {
    for (const unit of units) {
      issues.push(...validateUnit(data, unit, context), ...validateSlot(unit));
    }
  } else {
    issues.push({ path: ['units'], message: 'Units must be a list.' });
  }

  if (options?.requireLegal) {
    issues.push(...validateLegality(data));
  }

  if (issues.length > 0) {
    return { success: false, issues };
  }

  return { success: true, data: data as TListData };
};
