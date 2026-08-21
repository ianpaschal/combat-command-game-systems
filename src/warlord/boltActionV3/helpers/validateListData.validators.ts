import { ValidationIssue } from '../../../common';
import { getValue } from '../../../common/_internal';
import { isListDataId } from '../../../common/schemas/listDataId';

/**
 * Static game-system data needed to validate a Bolt Action list. Deliberately non-generic: the
 * real context (`Record<Faction, ...>`, etc.) is structurally assignable here, so no type
 * parameters are needed.
 */
export type ListDataContext = {
  alignments: Record<string, unknown>;
  factions: Record<string, { alignment: string }>;
  platoons: Record<string, unknown>;
  units: Record<string, unknown>;
};

export type ListDataOptions = {
  requiredFields?: {
    faction?: boolean;
    alignment?: boolean;
  };
  requireLegal?: boolean;
};

/**
 * Checks that all IDs across platoons and units are unique within the list.
 *
 * @param data - The full list data being validated
 * @returns `true` if all IDs are unique
 */
export const hasNoDuplicateIds = (data: unknown): boolean => {
  const idsOf = (items: unknown): string[] => (
    Array.isArray(items) ? (
      items.map((item) => getValue(item, ['id'])).filter((id): id is string => typeof id === 'string')
    ) : []
  );
  const allIds = [
    ...idsOf(getValue(data, ['platoons'])),
    ...idsOf(getValue(data, ['units'])),
  ];
  return new Set(allIds).size === allIds.length;
};

/**
 * Validates the list's selected faction.
 *
 * Checks:
 * - Missing but required (if `options.requiredFields.faction` is set)
 * - Value is a recognized faction key
 *
 * @param data - The full list data being validated
 * @param context - Static game-system context
 * @param options - Required fields and legality options
 * @returns Any issues found
 */
export const validateFaction = (
  data: unknown,
  context: ListDataContext,
  options?: ListDataOptions,
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const path = ['meta', 'faction'];
  const value = getValue(data, path);

  // Missing but required:
  if (options?.requiredFields?.faction && !value) {
    issues.push({
      message: 'Please select a faction.',
      path,
    });
  }

  // Exists but not a recognized faction key:
  if (typeof value === 'string' && !getValue(context.factions, [value])) {
    issues.push({
      message: 'Please select a faction.',
      path,
    });
  }

  return issues;
};

/**
 * Validates the list's selected alignment.
 *
 * Checks:
 * - Missing but required (if `options.requiredFields.alignment` is set)
 * - Value is a recognized alignment key
 * - Alignment matches the alignment of the selected faction
 *
 * @remarks
 * Bolt Action factions have a single alignment rather than one per era, except for the four which
 * are flexible, and those carry `flexible` as their alignment outright.
 *
 * @param data - The full list data being validated
 * @param context - Static game-system context
 * @param options - Required fields and legality options
 * @returns Any issues found
 */
export const validateAlignment = (
  data: unknown,
  context: ListDataContext,
  options?: ListDataOptions,
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const path = ['meta', 'alignment'];
  const value = getValue(data, path);

  // Missing but required:
  if (options?.requiredFields?.alignment && !value) {
    issues.push({
      message: 'Please select an alignment.',
      path,
    });
  }

  // Exists but not a recognized alignment key:
  if (typeof value === 'string' && !getValue(context.alignments, [value])) {
    issues.push({
      message: 'Please select an alignment.',
      path,
    });
  }

  // Exists but does not match the selected faction's alignment:
  const faction = getValue(data, ['meta', 'faction']);
  if (value && typeof faction === 'string') {
    const alignment = context.factions[faction]?.alignment;
    if (alignment !== undefined && alignment !== value) {
      issues.push({
        message: 'Alignment does not match the selected faction.',
        path,
      });
    }
  }

  return issues;
};

/**
 * Validates the list's points limit.
 *
 * Checks:
 * - Value is a finite number
 * - Value is 0 or greater
 *
 * @param pointsLimit - The list's raw points limit
 * @returns Any issues found
 */
export const validatePointsLimit = (
  pointsLimit: unknown,
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const path = ['meta', 'pointsLimit'];

  if (typeof pointsLimit !== 'number' || !Number.isFinite(pointsLimit)) {
    issues.push({
      message: 'Please set a points limit.',
      path,
    });
  } else if (pointsLimit < 0) {
    issues.push({
      message: 'Points limit must be 0 or greater.',
      path,
    });
  }

  return issues;
};

/**
 * Validates a single platoon.
 *
 * Checks:
 * - `id` is a valid list data ID
 * - `sourceId` is present, and a recognized selector key once any are catalogued
 *
 * @param platoon - The specific platoon to validate
 * @param context - Static game-system context
 * @returns Any issues found
 */
export const validatePlatoon = (
  platoon: unknown,
  context: ListDataContext,
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const id = getValue(platoon, ['id']);
  const sourceId = getValue(platoon, ['sourceId']);

  // `id` is missing or not a valid list data ID:
  if (!isListDataId(id)) {
    issues.push({
      message: 'Please set an ID.',
      path: ['platoons'],
    });
  }

  // `sourceId` is missing, or not a recognized selector key (when the game
  // system has any selectors yet):
  const hasPlatoons = Object.keys(context.platoons).length > 0;
  if (typeof sourceId !== 'string' || sourceId.length === 0 || (hasPlatoons && !getValue(context.platoons, [sourceId]))) {
    issues.push({
      message: 'Please select a platoon.',
      path: ['platoons'],
    });
  }

  return issues;
};

/**
 * Validates a single unit's slot assignment.
 *
 * Checks:
 * - `slotId` is present
 *
 * @param unit - The specific unit to validate
 * @returns Any issues found
 */
export const validateSlot = (
  unit: unknown,
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const slotId = getValue(unit, ['slotId']);

  if (typeof slotId !== 'string' || slotId.length === 0) {
    issues.push({
      message: 'Please select a slot.',
      path: ['units'],
    });
  }

  return issues;
};

/**
 * Validates a single unit against the list.
 *
 * Checks:
 * - `id` is a valid list data ID
 * - `sourceId` is present, and a recognized unit key once any are catalogued
 * - `platoonId` references a platoon which is actually in the list
 *
 * @param data - The full list data being validated
 * @param unit - The specific unit to validate
 * @param context - Static game-system context
 * @returns Any issues found
 */
export const validateUnit = (
  data: unknown,
  unit: unknown,
  context: ListDataContext,
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const id = getValue(unit, ['id']);
  const sourceId = getValue(unit, ['sourceId']);
  const platoonId = getValue(unit, ['platoonId']);

  // `id` is missing or not a valid list data ID:
  if (!isListDataId(id)) {
    issues.push({
      message: 'Please set an ID.',
      path: ['units'],
    });
  }

  // `sourceId` is missing, or not a recognized unit key (when the game system
  // has any units yet):
  const hasUnits = Object.keys(context.units).length > 0;
  if (typeof sourceId !== 'string' || sourceId.length === 0 || (hasUnits && !getValue(context.units, [sourceId]))) {
    issues.push({
      message: 'Please select a unit.',
      path: ['units'],
    });
  }

  // `platoonId` does not reference a platoon in this list:
  const platoons = getValue(data, ['platoons']);
  const allPlatoonIds = new Set(
    (Array.isArray(platoons) ? platoons : [])
      .map((platoon) => getValue(platoon, ['id']))
      .filter((pid): pid is string => typeof pid === 'string'),
  );
  if (typeof platoonId !== 'string' || !allPlatoonIds.has(platoonId)) {
    issues.push({
      message: 'Unit references a non-existent platoon.',
      path: ['units'],
    });
  }

  return issues;
};

/**
 * Validates that the list meets minimum legal requirements.
 *
 * Checks:
 * - At least one platoon is present
 * - At least one unit is present
 *
 * @param data - The full list data being validated
 * @returns Any issues found
 */
export const validateLegality = (
  data: unknown,
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const platoons = getValue(data, ['platoons']);
  const units = getValue(data, ['units']);

  // At least one platoon:
  if (!Array.isArray(platoons) || platoons.length === 0) {
    issues.push({
      message: 'At least one platoon is required.',
      path: ['platoons'],
    });
  }

  // At least one unit:
  if (!Array.isArray(units) || units.length === 0) {
    issues.push({
      message: 'At least one unit is required.',
      path: ['units'],
    });
  }

  return issues;
};
