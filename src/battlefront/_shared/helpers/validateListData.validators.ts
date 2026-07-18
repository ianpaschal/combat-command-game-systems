import { ValidationIssue } from '../../../common';
import { getValue } from '../../../common/_internal';
import { isListDataId } from '../../../common/schemas/listDataId';

/**
 * Static game-system data (factions, force diagrams, etc.) needed to validate a list. Deliberately
 * non-generic - every game system's real context (`Record<Faction, ...>`, `Record<ForceDiagram,
 * ...>`, etc.) is structurally assignable here, so no per-system type parameters are needed.
 */
export type ListDataContext = {
  alignments: Record<string, unknown>;
  factions: Record<string, { alignment: Partial<Record<string, string>> | string }>;
  eras?: Record<string, unknown>;
  series?: Record<string, { era: string }>;
  forceDiagrams: Record<string, { faction: string; series?: string }>;
  units: Record<string, { sourceForceDiagram: string }>;
};

export type ListDataOptions = {
  requiredFields?: {
    forceDiagram?: boolean;
    faction?: boolean;
    alignment?: boolean;
  };
  requireLegal?: boolean;
};

/**
 * Checks that all IDs across formations, units, and command cards are unique
 * within the list.
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
    ...idsOf(getValue(data, ['formations'])),
    ...idsOf(getValue(data, ['units'])),
    ...idsOf(getValue(data, ['commandCards'])),
  ];
  return new Set(allIds).size === allIds.length;
};

/**
 * Validates the list's selected force diagram.
 *
 * Checks:
 * - Missing but required (if `options.requiredFields.forceDiagram` is set)
 * - Value is a recognized force diagram key
 * - Force diagram belongs to the selected faction
 *
 * @param data - The full list data being validated
 * @param context - Static game-system context (force diagrams, factions, etc.)
 * @param options - Schema creation options (required fields, legality)
 * @returns Any issues found
 */
export const validateForceDiagram = (
  data: unknown,
  context: ListDataContext,
  options?: ListDataOptions,
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const path = ['meta', 'forceDiagram'];
  const value = getValue(data, path);

  // Missing but required:
  if (options?.requiredFields?.forceDiagram && !value) {
    issues.push({
      message: 'Please select a force diagram.',
      path,
    });
  }

  // Exists but not a recognized force diagram key:
  if (typeof value === 'string' && !getValue(context.forceDiagrams, [value])) {
    issues.push({
      message: 'Please select a force diagram.',
      path,
    });
  }

  // Exists but does not belong to the selected faction:
  if (typeof value === 'string' && context.forceDiagrams[value]?.faction !== getValue(data, ['meta', 'faction'])) {
    issues.push({
      message: 'The selected force diagram is not a valid option for the selected faction.',
      path,
    });
  }

  return issues;
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
 * @param options - Schema creation options (required fields, legality)
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
 * @param data - The full list data being validated
 * @param context - Static game-system context
 * @param options - Schema creation options (required fields, legality)
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
    const alignmentData = context.factions[faction]?.alignment;
    const era = getValue(data, ['meta', 'era']);
    const alignment = typeof alignmentData === 'string' ? (
      alignmentData
    ) : (
      typeof era === 'string' ? alignmentData?.[era] : undefined
    );
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
 * Validates the list's selected era.
 *
 * Checks:
 * - Value is a recognized era key
 * - Era matches the era implied by the selected force diagram's series (if a
 *   force diagram is set)
 *
 * @param data - The full list data being validated
 * @param context - Static game-system context
 * @returns Any issues found
 */
export const validateEra = (
  data: unknown,
  context: ListDataContext,
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const path = ['meta', 'era'];
  const value = getValue(data, path);

  if (!context.eras) {
    return issues;
  }

  // Not a recognized era key:
  if (typeof value !== 'string' || !getValue(context.eras, [value])) {
    issues.push({
      message: 'Please select an era.',
      path,
    });
  }

  // Does not match the era implied by the selected force diagram's series:
  const forceDiagram = getValue(data, ['meta', 'forceDiagram']);
  if (typeof forceDiagram === 'string') {
    const seriesKey = context.forceDiagrams[forceDiagram]?.series;
    const expected = seriesKey ? context.series?.[seriesKey]?.era : undefined;
    if (expected && value !== expected) {
      issues.push({
        message: 'Era does not match the force diagram.',
        path,
      });
    }
  }

  return issues;
};

/**
 * Validates that the list meets minimum legal requirements.
 *
 * Checks:
 * - At least one formation is present
 * - At least one unit is present
 *
 * @param data - The full list data being validated
 * @returns Any issues found
 */
export const validateLegality = (
  data: unknown,
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const formations = getValue(data, ['formations']);
  const units = getValue(data, ['units']);

  // At least one formation:
  if (!Array.isArray(formations) || formations.length === 0) {
    issues.push({
      message: 'At least one formation is required.',
      path: ['formations'],
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

/**
 * Validates the list's points limit. Checks:
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
 * Validates a single unit's slot assignment. Checks:
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
 * Validates a single formation against the list's selected force diagram.
 *
 * Checks:
 * - Formation's source era matches the force diagram's era (if a force diagram
 *   is set and the era can be resolved)
 * - Formation's source force diagram is a recognized key (if a force diagram is
 *   set and expected era is resolved)
 *
 * @param data - The full list data being validated
 * @param formation - The specific formation to validate
 * @param context - Static game-system context
 * @returns Any issues found
 */
export const validateFormation = (
  data: unknown,
  formation: unknown,
  context: ListDataContext,
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const id = getValue(formation, ['id']);
  const sourceId = getValue(formation, ['sourceId']);

  // `id` is missing or not a valid list data ID:
  if (!isListDataId(id)) {
    issues.push({
      message: 'Please set an ID.',
      path: ['formations'],
    });
  }

  // `sourceId` is missing, or not a recognized unit key (when the game system
  // has any units yet):
  const hasUnits = Object.keys(context.units).length > 0;
  if (typeof sourceId !== 'string' || sourceId.length === 0 || (hasUnits && !getValue(context.units, [sourceId]))) {
    issues.push({
      message: 'Please select a formation.',
      path: ['formations'],
    });
  }

  const forceDiagram = getValue(data, ['meta', 'forceDiagram']);
  if (typeof forceDiagram === 'string' && typeof sourceId === 'string') {
    const seriesKey = context.forceDiagrams[forceDiagram]?.series;
    const expectedEra = seriesKey ? context.series?.[seriesKey]?.era : undefined;
    if (expectedEra) {
      const sourceData = context.units[sourceId];
      if (sourceData) {

        // Source force diagram is not a recognized key:
        if (!getValue(context.forceDiagrams, [sourceData.sourceForceDiagram])) {
          issues.push({
            message: 'Formation source has an unrecognized force diagram.',
            path: ['formations'],
          });
        } else {
          const sourceSeriesKey = context.forceDiagrams[sourceData.sourceForceDiagram]?.series;
          if (sourceSeriesKey) {
            const sourceEra = context.series?.[sourceSeriesKey]?.era;

            // Source era does not match the force diagram's era:
            if (sourceEra && sourceEra !== expectedEra) {
              issues.push({
                message: 'Formation does not match the force diagram\'s era.',
                path: ['formations'],
              });
            }
          }
        }
      }
    }
  }

  return issues;
};

/**
 * Validates a single command card against the list.
 *
 * Checks:
 * - `appliedTo` references an existing formation or unit ID
 *
 * @param data - The full list data being validated
 * @param commandCard - The specific command card to validate
 * @returns Any issues found
 */
export const validateCommandCard = (
  data: unknown,
  commandCard: unknown,
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const id = getValue(commandCard, ['id']);
  const sourceId = getValue(commandCard, ['sourceId']);
  const appliedTo = getValue(commandCard, ['appliedTo']);

  // `id` is missing or not a valid list data ID:
  if (!isListDataId(id)) {
    issues.push({
      message: 'Please set an ID.',
      path: ['commandCards'],
    });
  }

  // `sourceId` is missing:
  if (typeof sourceId !== 'string' || sourceId.length === 0) {
    issues.push({
      message: 'Please select a card.',
      path: ['commandCards'],
    });
  }

  // `appliedTo` does not reference an existing formation or unit:
  const idsOf = (items: unknown): (string | undefined)[] => (
    Array.isArray(items) ? items.map((item) => getValue(item, ['id']) as string | undefined) : []
  );
  const allValidTargetIds = new Set([
    ...idsOf(getValue(data, ['formations'])),
    ...idsOf(getValue(data, ['units'])),
  ].filter((targetId): targetId is string => targetId !== undefined));
  if (typeof appliedTo !== 'string' || !allValidTargetIds.has(appliedTo)) {
    issues.push({
      message: 'Command card references a non-existent target.',
      path: ['commandCards'],
    });
  }

  return issues;
};

/**
 * Validates a single unit against the list and selected force diagram.
 *
 * Checks:
 * - Unit's source era matches the force diagram's era (if a force diagram is set and the era can be resolved)
 * - Unit's source force diagram is a recognized key (if a force diagram is set and expected era is resolved)
 * - `formationId` references an existing formation, or is the special `'support'` value
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
  const formationId = getValue(unit, ['formationId']);

  // `id` is missing or not a valid list data ID:
  if (!isListDataId(id)) {
    issues.push({
      message: 'Please set an ID.',
      path: ['units'],
    });
  }

  // `sourceId` is missing, or not a recognized unit key (when the game system has any units yet):
  const hasUnits = Object.keys(context.units).length > 0;
  if (typeof sourceId !== 'string' || sourceId.length === 0 || (hasUnits && !getValue(context.units, [sourceId]))) {
    issues.push({
      message: 'Please select a unit.',
      path: ['units'],
    });
  }

  const forceDiagram = getValue(data, ['meta', 'forceDiagram']);
  if (typeof forceDiagram === 'string' && typeof sourceId === 'string') {
    const seriesKey = context.forceDiagrams[forceDiagram]?.series;
    const expectedEra = seriesKey ? context.series?.[seriesKey]?.era : undefined;
    if (expectedEra) {
      const sourceData = context.units[sourceId];
      if (sourceData) {

        // Source force diagram is not a recognized key:
        if (!getValue(context.forceDiagrams, [sourceData.sourceForceDiagram])) {
          issues.push({
            message: 'Unit source has an unrecognized force diagram.',
            path: ['units'],
          });
        } else {
          const sourceSeriesKey = context.forceDiagrams[sourceData.sourceForceDiagram]?.series;
          if (sourceSeriesKey) {
            const sourceEra = context.series?.[sourceSeriesKey]?.era;

            // Source era does not match the force diagram's era:
            if (sourceEra && sourceEra !== expectedEra) {
              issues.push({
                message: 'Unit does not match the force diagram\'s era.',
                path: ['units'],
              });
            }
          }
        }
      }
    }
  }

  // `formationId` does not reference an existing formation (and is not 'support'):
  const formations = getValue(data, ['formations']);
  const allFormationIds = new Set(
    (Array.isArray(formations) ? formations : [])
      .map((f) => getValue(f, ['id']))
      .filter((fid): fid is string => typeof fid === 'string'),
  );
  if (formationId !== 'support' && (typeof formationId !== 'string' || !allFormationIds.has(formationId))) {
    issues.push({
      message: 'Unit references a non-existent formation.',
      path: ['units'],
    });
  }

  return issues;
};
