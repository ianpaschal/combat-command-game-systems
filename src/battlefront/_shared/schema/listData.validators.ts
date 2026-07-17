import { ValidationIssue } from '../../../common';
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
 * Structural shape of a list's data, as seen by the cross-field validators. Game systems without
 * an `era` concept (e.g. GreatWarV4) simply never populate `meta.era`.
 */
export type ListDataShape = {
  meta: {
    forceDiagram?: string;
    faction?: string;
    alignment?: string;
    era?: string;
  };
  formations: { id?: string; sourceId?: string }[];
  units: { id?: string; sourceId?: string; formationId?: string; slotId?: string }[];
  commandCards: { id?: string; sourceId?: string; appliedTo?: string }[];
};

/**
 * Checks that all IDs across formations, units, and command cards are unique within the list.
 * @param values - List data containing formations, units, and command cards
 * @returns `true` if all IDs are unique
 */
export const hasNoDuplicateIds = (
  values: {
    formations: { id?: string }[];
    units: { id?: string }[];
    commandCards: { id?: string }[];
  },
): boolean => {
  const allIds = [
    ...values.formations.map((f) => f.id),
    ...values.units.map((u) => u.id),
    ...values.commandCards.map((c) => c.id),
  ].filter((id): id is string => id !== undefined);
  return new Set(allIds).size === allIds.length;
};

/**
 * Validates the list's selected force diagram. Checks:
 * - Missing but required (if `options.requiredFields.forceDiagram` is set)
 * - Value is a recognized force diagram key
 * - Force diagram belongs to the selected faction
 * @param issues - Collected validation issues
 * @param data - The full list data being validated
 * @param context - Static game-system context (force diagrams, factions, etc.)
 * @param options - Schema creation options (required fields, legality)
 */
export const validateForceDiagram = (
  issues: ValidationIssue[],
  data: ListDataShape,
  context: ListDataContext,
  options?: ListDataOptions,
): void => {
  const value = data.meta.forceDiagram;
  const path = ['meta', 'forceDiagram'];

  // Missing but required:
  if (options?.requiredFields?.forceDiagram && !value) {
    issues.push({
      message: 'Please select a force diagram.',
      path,
    });
  }

  // Exists but not a recognized force diagram key:
  if (value && !(value in context.forceDiagrams)) {
    issues.push({
      message: 'Please select a force diagram.',
      path,
    });
  }

  // Exists but does not belong to the selected faction:
  if (value && context.forceDiagrams[value]?.faction !== data.meta.faction) {
    issues.push({
      message: 'The selected force diagram is not a valid option for the selected faction.',
      path,
    });
  }
};

/**
 * Validates the list's selected faction. Checks:
 * - Missing but required (if `options.requiredFields.faction` is set)
 * - Value is a recognized faction key
 * @param issues - Collected validation issues
 * @param data - The full list data being validated
 * @param context - Static game-system context
 * @param options - Schema creation options (required fields, legality)
 */
export const validateFaction = (
  issues: ValidationIssue[],
  data: ListDataShape,
  context: ListDataContext,
  options?: ListDataOptions,
): void => {
  const value = data.meta.faction;
  const path = ['meta', 'faction'];

  // Missing but required:
  if (options?.requiredFields?.faction && !value) {
    issues.push({
      message: 'Please select a faction.',
      path,
    });
  }

  // Exists but not a recognized faction key:
  if (value && !(value in context.factions)) {
    issues.push({
      message: 'Please select a faction.',
      path,
    });
  }
};

/**
 * Validates the list's selected alignment. Checks:
 * - Missing but required (if `options.requiredFields.alignment` is set)
 * - Value is a recognized alignment key
 * - Alignment matches the alignment of the selected faction
 * @param issues - Collected validation issues
 * @param data - The full list data being validated
 * @param context - Static game-system context
 * @param options - Schema creation options (required fields, legality)
 */
export const validateAlignment = (
  issues: ValidationIssue[],
  data: ListDataShape,
  context: ListDataContext,
  options?: ListDataOptions,
): void => {
  const value = data.meta.alignment;
  const path = ['meta', 'alignment'];

  // Missing but required:
  if (options?.requiredFields?.alignment && !value) {
    issues.push({
      message: 'Please select an alignment.',
      path,
    });
  }

  // Exists but not a recognized alignment key:
  if (value && !(value in context.alignments)) {
    issues.push({
      message: 'Please select an alignment.',
      path,
    });
  }

  // Exists but does not match the selected faction's alignment:
  if (value && data.meta.faction) {
    const alignmentData = context.factions[data.meta.faction]?.alignment;
    const alignment = typeof alignmentData === 'string' ? (
      alignmentData
    ) : (
      data.meta.era ? alignmentData?.[data.meta.era] : undefined
    );
    if (alignment !== undefined && alignment !== value) {
      issues.push({
        message: 'Alignment does not match the selected faction.',
        path,
      });
    }
  }
};

/**
 * Validates the list's selected era. Checks:
 * - Value is a recognized era key
 * - Era matches the era implied by the selected force diagram's series (if a force diagram is set)
 * @param issues - Collected validation issues
 * @param data - The full list data being validated
 * @param context - Static game-system context
 */
export const validateEra = (
  issues: ValidationIssue[],
  data: ListDataShape,
  context: ListDataContext,
): void => {
  const value = data.meta.era;
  const path = ['meta', 'era'];

  if (!context.eras) {
    return;
  }

  // Not a recognized era key:
  if (!value || !(value in context.eras)) {
    issues.push({
      message: 'Please select an era.',
      path,
    });
  }

  // Does not match the era implied by the selected force diagram's series:
  if (data.meta.forceDiagram) {
    const seriesKey = context.forceDiagrams[data.meta.forceDiagram]?.series;
    const expected = seriesKey ? context.series?.[seriesKey]?.era : undefined;
    if (expected && value !== expected) {
      issues.push({
        message: 'Era does not match the force diagram.',
        path,
      });
    }
  }
};

/**
 * Validates that the list meets minimum legal requirements. Checks:
 * - At least one formation is present
 * - At least one unit is present
 * @param issues - Collected validation issues
 * @param data - The full list data being validated
 */
export const validateLegality = (
  issues: ValidationIssue[],
  data: ListDataShape,
): void => {

  // At least one formation:
  if (data.formations.length === 0) {
    issues.push({
      message: 'At least one formation is required.',
      path: ['formations'],
    });
  }

  // At least one unit:
  if (data.units.length === 0) {
    issues.push({
      message: 'At least one unit is required.',
      path: ['units'],
    });
  }
};

/**
 * Validates the list's points limit. Checks:
 * - Value is a finite number
 * - Value is 0 or greater
 * @param issues - Collected validation issues
 * @param pointsLimit - The list's parsed points limit
 */
export const validatePointsLimit = (
  issues: ValidationIssue[],
  pointsLimit: number,
): void => {
  const path = ['meta', 'pointsLimit'];

  if (!Number.isFinite(pointsLimit)) {
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
};

/**
 * Validates a single unit's slot assignment. Checks:
 * - `slotId` is present
 * @param issues - Collected validation issues
 * @param unit - The specific unit to validate
 */
export const validateSlot = (
  issues: ValidationIssue[],
  unit: { slotId?: string },
): void => {
  if (!unit.slotId) {
    issues.push({
      message: 'Please select a slot.',
      path: ['units'],
    });
  }
};

/**
 * Validates a single formation against the list's selected force diagram. Checks:
 * - Formation's source era matches the force diagram's era (if a force diagram is set and the era can be resolved)
 * - Formation's source force diagram is a recognized key (if a force diagram is set and expected era is resolved)
 * @param issues - Collected validation issues
 * @param data - The full list data being validated
 * @param formation - The specific formation to validate
 * @param context - Static game-system context
 */
export const validateFormation = (
  issues: ValidationIssue[],
  data: ListDataShape,
  formation: ListDataShape['formations'][number],
  context: ListDataContext,
): void => {

  // `id` is missing or not a valid list data ID:
  if (!isListDataId(formation.id)) {
    issues.push({
      message: 'Please set an ID.',
      path: ['formations'],
    });
  }

  // `sourceId` is missing, or not a recognized unit key (when the game system has any units yet):
  const hasUnits = Object.keys(context.units).length > 0;
  if (!formation.sourceId || (hasUnits && !(formation.sourceId in context.units))) {
    issues.push({
      message: 'Please select a formation.',
      path: ['formations'],
    });
  }

  if (data.meta.forceDiagram && formation.sourceId) {
    const seriesKey = context.forceDiagrams[data.meta.forceDiagram]?.series;
    const expectedEra = seriesKey ? context.series?.[seriesKey]?.era : undefined;
    if (expectedEra) {
      const sourceData = context.units[formation.sourceId];
      if (sourceData) {

        // Source force diagram is not a recognized key:
        if (!(sourceData.sourceForceDiagram in context.forceDiagrams)) {
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
};

/**
 * Validates a single command card against the list. Checks:
 * - `appliedTo` references an existing formation or unit ID
 * @param issues - Collected validation issues
 * @param data - The full list data being validated
 * @param commandCard - The specific command card to validate
 */
export const validateCommandCard = (
  issues: ValidationIssue[],
  data: ListDataShape,
  commandCard: ListDataShape['commandCards'][number],
): void => {

  // `id` is missing or not a valid list data ID:
  if (!isListDataId(commandCard.id)) {
    issues.push({
      message: 'Please set an ID.',
      path: ['commandCards'],
    });
  }

  // `sourceId` is missing:
  if (!commandCard.sourceId) {
    issues.push({
      message: 'Please select a card.',
      path: ['commandCards'],
    });
  }

  // `appliedTo` does not reference an existing formation or unit:
  const allValidTargetIds = new Set([
    ...data.formations.map((f) => f.id),
    ...data.units.map((u) => u.id),
  ]);
  if (!allValidTargetIds.has(commandCard.appliedTo)) {
    issues.push({
      message: 'Command card references a non-existent target.',
      path: ['commandCards'],
    });
  }
};

/**
 * Validates a single unit against the list and selected force diagram. Checks:
 * - Unit's source era matches the force diagram's era (if a force diagram is set and the era can be resolved)
 * - Unit's source force diagram is a recognized key (if a force diagram is set and expected era is resolved)
 * - `formationId` references an existing formation, or is the special `'support'` value
 * @param issues - Collected validation issues
 * @param data - The full list data being validated
 * @param unit - The specific unit to validate
 * @param context - Static game-system context
 */
export const validateUnit = (
  issues: ValidationIssue[],
  data: ListDataShape,
  unit: ListDataShape['units'][number],
  context: ListDataContext,
): void => {

  // `id` is missing or not a valid list data ID:
  if (!isListDataId(unit.id)) {
    issues.push({
      message: 'Please set an ID.',
      path: ['units'],
    });
  }

  // `sourceId` is missing, or not a recognized unit key (when the game system has any units yet):
  const hasUnits = Object.keys(context.units).length > 0;
  if (!unit.sourceId || (hasUnits && !(unit.sourceId in context.units))) {
    issues.push({
      message: 'Please select a unit.',
      path: ['units'],
    });
  }

  if (data.meta.forceDiagram && unit.sourceId) {
    const seriesKey = context.forceDiagrams[data.meta.forceDiagram]?.series;
    const expectedEra = seriesKey ? context.series?.[seriesKey]?.era : undefined;
    if (expectedEra) {
      const sourceData = context.units[unit.sourceId];
      if (sourceData) {

        // Source force diagram is not a recognized key:
        if (!(sourceData.sourceForceDiagram in context.forceDiagrams)) {
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
  if (unit.formationId !== 'support' && !new Set(data.formations.map((f) => f.id)).has(unit.formationId)) {
    issues.push({
      message: 'Unit references a non-existent formation.',
      path: ['units'],
    });
  }
};
