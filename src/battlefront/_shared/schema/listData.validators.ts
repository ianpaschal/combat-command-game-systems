import { z } from 'zod';

import {
  CreateListDataSchemaContext,
  CreateListDataSchemaOptions,
  GenericListData,
} from './listData';

/**
 * Checks that all IDs across formations, units, and command cards are unique within the list.
 * @param values - List data containing formations, units, and command cards
 * @returns `true` if all IDs are unique
 */
export const hasNoDuplicateIds = (
  values: {
    formations: { id: string }[];
    units: { id: string }[];
    commandCards: { id: string; appliedTo: string }[];
  },
): boolean => {
  const allIds = [
    ...values.formations.map((f) => f.id),
    ...values.units.map((u) => u.id),
    ...values.commandCards.map((c) => c.id),
  ];
  return new Set(allIds).size === allIds.length;
};

/**
 * Validates the list's selected force diagram. Checks:
 * - Missing but required (if `options.requiredFields.forceDiagram` is set)
 * - Value is a recognized force diagram key
 * - Force diagram belongs to the selected faction
 * @param ctx - Zod refinement context
 * @param data - The full list data being validated
 * @param context - Static game-system context (force diagrams, factions, etc.)
 * @param options - Schema creation options (required fields, legality)
 */
export const validateForceDiagram = (
  ctx: z.RefinementCtx,
  data: GenericListData,
  context: CreateListDataSchemaContext,
  options: CreateListDataSchemaOptions,
): void => {
  const value = data.meta.forceDiagram;
  const path = ['meta', 'forceDiagram'];

  // Missing but required:
  if (options?.requiredFields?.forceDiagram && !value) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please select a force diagram.',
      path,
    });
  }

  // Exists but not a recognized force diagram key:
  if (value && !(value in context.forceDiagrams)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please select a force diagram.',
      path,
    });
  }

  // Exists but does not belong to the selected faction:
  if (value && context.forceDiagrams[value]?.faction !== data.meta.faction) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'The selected force diagram is not a valid option for the selected faction.',
      path,
    });
  }
};

/**
 * Validates the list's selected faction. Checks:
 * - Missing but required (if `options.requiredFields.faction` is set)
 * - Value is a recognized faction key
 * @param ctx - Zod refinement context
 * @param data - The full list data being validated
 * @param context - Static game-system context
 * @param options - Schema creation options (required fields, legality)
 */
export const validateFaction = (
  ctx: z.RefinementCtx,
  data: GenericListData,
  context: CreateListDataSchemaContext,
  options: CreateListDataSchemaOptions,
): void => {
  const value = data.meta.faction;
  const path = ['meta', 'faction'];

  // Missing but required:
  if (options?.requiredFields?.faction && !value) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please select a faction.',
      path,
    });
  }

  // Exists but not a recognized faction key:
  if (value && !(value in context.factions)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
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
 * @param ctx - Zod refinement context
 * @param data - The full list data being validated
 * @param context - Static game-system context
 * @param options - Schema creation options (required fields, legality)
 */
export const validateAlignment = (
  ctx: z.RefinementCtx,
  data: GenericListData,
  context: CreateListDataSchemaContext,
  options: CreateListDataSchemaOptions,
): void => {
  const value = data.meta.alignment;
  const path = ['meta', 'alignment'];

  // Missing but required:
  if (options?.requiredFields?.alignment && !value) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please select an alignment.',
      path,
    });
  }

  // Exists but not a recognized alignment key:
  if (value && !(value in context.alignments)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
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
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
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
 * @param ctx - Zod refinement context
 * @param data - The full list data being validated
 * @param context - Static game-system context
 */
export const validateEra = (
  ctx: z.RefinementCtx,
  data: GenericListData,
  context: CreateListDataSchemaContext,
): void => {
  const value = data.meta.era;
  const path = ['meta', 'era'];

  if (!context.eras) {
    return;
  }

  // Not a recognized era key:
  if (!value || !(value in context.eras)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please select an era.',
      path,
    });
  }

  // Does not match the era implied by the selected force diagram's series:
  if (data.meta.forceDiagram) {
    const seriesKey = context.forceDiagrams[data.meta.forceDiagram]?.series;
    const expected = seriesKey ? context.series?.[seriesKey]?.era : undefined;
    if (expected && value !== expected) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
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
 * @param ctx - Zod refinement context
 * @param data - The full list data being validated
 */
export const validateLegality = (
  ctx: z.RefinementCtx,
  data: GenericListData,
): void => {

  // At least one formation:
  if (data.formations.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'At least one formation is required.',
      path: ['formations'],
    });
  }

  // At least one unit:
  if (data.units.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'At least one unit is required.',
      path: ['units'],
    });
  }
};

/**
 * Validates a single formation against the list's selected force diagram. Checks:
 * - Formation's source era matches the force diagram's era (if a force diagram is set and the era can be resolved)
 * - Formation's source force diagram is a recognized key (if a force diagram is set and expected era is resolved)
 * @param ctx - Zod refinement context
 * @param data - The full list data being validated
 * @param formation - The specific formation to validate
 * @param context - Static game-system context
 */
export const validateFormation = (
  ctx: z.RefinementCtx,
  data: GenericListData,
  formation: GenericListData['formations'][number],
  context: CreateListDataSchemaContext,
): void => {
  if (data.meta.forceDiagram) {
    const seriesKey = context.forceDiagrams[data.meta.forceDiagram]?.series;
    const expectedEra = seriesKey ? context.series?.[seriesKey]?.era : undefined;
    if (expectedEra) {
      const sourceData = context.units[formation.sourceId as string];
      if (sourceData) {

        // Source force diagram is not a recognized key:
        if (!(sourceData.sourceForceDiagram in context.forceDiagrams)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Formation source has an unrecognized force diagram.',
            path: ['formations'],
          });
        } else {
          const sourceSeriesKey = context.forceDiagrams[sourceData.sourceForceDiagram]?.series;
          if (sourceSeriesKey) {
            const sourceEra = context.series?.[sourceSeriesKey]?.era;

            // Source era does not match the force diagram's era:
            if (sourceEra && sourceEra !== expectedEra) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
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
 * @param ctx - Zod refinement context
 * @param data - The full list data being validated
 * @param commandCard - The specific command card to validate
 */
export const validateCommandCard = (
  ctx: z.RefinementCtx,
  data: GenericListData,
  commandCard: GenericListData['commandCards'][number],
): void => {

  // `appliedTo` does not reference an existing formation or unit:
  const allValidTargetIds = new Set([
    ...data.formations.map((f) => f.id),
    ...data.units.map((u) => u.id),
  ]);
  if (!allValidTargetIds.has(commandCard.appliedTo)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
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
 * @param ctx - Zod refinement context
 * @param data - The full list data being validated
 * @param unit - The specific unit to validate
 * @param context - Static game-system context
 */
export const validateUnit = (
  ctx: z.RefinementCtx,
  data: GenericListData,
  unit: GenericListData['units'][number],
  context: CreateListDataSchemaContext,
): void => {
  const path = ['units'];

  if (data.meta.forceDiagram) {
    const seriesKey = context.forceDiagrams[data.meta.forceDiagram]?.series;
    const expectedEra = seriesKey ? context.series?.[seriesKey]?.era : undefined;
    if (expectedEra) {
      const sourceData = context.units[unit.sourceId as string];
      if (sourceData) {

        // Source force diagram is not a recognized key:
        if (!(sourceData.sourceForceDiagram in context.forceDiagrams)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Unit source has an unrecognized force diagram.',
            path,
          });
        } else {
          const sourceSeriesKey = context.forceDiagrams[sourceData.sourceForceDiagram]?.series;
          if (sourceSeriesKey) {
            const sourceEra = context.series?.[sourceSeriesKey]?.era;

            // Source era does not match the force diagram's era:
            if (sourceEra && sourceEra !== expectedEra) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Unit does not match the force diagram\'s era.',
                path,
              });
            }
          }
        }
      }
    }
  }

  // `formationId` does not reference an existing formation (and is not 'support'):
  if (unit.formationId !== 'support' && !new Set(data.formations.map((f) => f.id)).has(unit.formationId)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Unit references a non-existent formation.',
      path,
    });
  }
};
