import { z } from 'zod';

import { createEnumSchema } from '../../../common/_internal';
import { DynamicPointsVersion } from '../static/dynamicPointsVersions';
import { Era } from '../static/eras';
import { LessonsFromTheFrontVersion } from '../static/lessonsFromTheFrontVersions';
import { MissionMatrix, MissionPackVersion } from '../static/missionPackVersions';
import { isDynamicPointsVersionValid, isMissionMatrixValid } from './gameSystemConfig.validators';

export const gameSystemConfigSchema = z.object({
  // TODO: Move gameSystem into gameSystemConfig
  // /** Forced game system discriminator. */
  // gameSystem: z.literal(GameSystem.TeamYankeeV2),

  /** @deprecated */
  additionalRules: z.optional(z.object({
    allowMidWarMonsters: z.optional(z.union([
      z.literal('yes'),
      z.literal('combat'),
      z.literal('no'),
    ])),
  })),

  /** Era for the tournament/match result ('Early-', 'Mid-' or 'Late-War') */
  era: createEnumSchema(Era),

  /** Points for the tournament/match result (typically 100) */
  points: z.coerce.number(),
  lessonsFromTheFrontVersion: createEnumSchema(LessonsFromTheFrontVersion, {
    errorMap: () => ({ message: 'Please select a LFTF version.' }),
  }),
  dynamicPointsVersion: z.optional(createEnumSchema(DynamicPointsVersion)),
  missionMatrix: createEnumSchema(MissionMatrix, {
    errorMap: () => ({ message: 'Please select a mission matrix.' }),
  }),
  missionPackVersion: createEnumSchema(MissionPackVersion, {
    errorMap: () => ({ message: 'Please select a mission pack version.' }),
  }),
}).superRefine((values, ctx) => {
  if (!isMissionMatrixValid(values)) {
    ctx.addIssue({
      message: 'Please select a valid mission matrix.',
      code: z.ZodIssueCode.custom,
      path: ['missionMatrix'],
    });
  }
  if (values.dynamicPointsVersion && !isDynamicPointsVersionValid(values)) {
    ctx.addIssue({
      message: 'Please select a valid dynamic points version for the selected era.',
      code: z.ZodIssueCode.custom,
      path: ['dynamicPointsVersion'],
    });
  }
});

export type GameSystemConfig = z.infer<typeof gameSystemConfigSchema>;

/**
 * Useful to single import both schema and default values.
 */
export const gameSystemConfig = {
  schema: gameSystemConfigSchema,
  defaultValues: {
    dynamicPointsVersion: DynamicPointsVersion.LWOriginal,
    era: Era.LW,
    lessonsFromTheFrontVersion: LessonsFromTheFrontVersion.Mar2024,
    missionMatrix: MissionMatrix.Extended,
    missionPackVersion: MissionPackVersion.Apr2023,
    points: 100,
  } satisfies GameSystemConfig,
} as const;
