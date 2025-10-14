import { z } from 'zod';

import { GameSystem } from '../../../common';
import { DynamicPointsVersion } from '../static/dynamicPointsVersions';
import { Era } from '../static/eras';
import { LessonsFromTheFrontVersion } from '../static/lessonsFromTheFrontVersions';
import { getMissionMatrixOptions } from '../static/missionPackUtils';
import { MissionMatrix, MissionPackVersion } from '../static/missionPackVersions';

export const gameSystemConfigSchema = z.object({
  additionalRules: z.optional(z.object({
    allowMidWarMonsters: z.optional(z.union([
      z.literal('yes'),
      z.literal('combat'),
      z.literal('no'),
    ])),
  })),
  era: z.nativeEnum(Era),
  points: z.coerce.number(),
  lessonsFromTheFrontVersion: z.nativeEnum(LessonsFromTheFrontVersion, {
    errorMap: () => ({ message: 'Please select a LFTF version.' }),
  }),
  dynamicPointsVersion: z.optional(z.nativeEnum(DynamicPointsVersion)),
  missionMatrix: z.nativeEnum(MissionMatrix, {
    errorMap: () => ({ message: 'Please select a mission matrix.' }),
  }),
  missionPackVersion: z.nativeEnum(MissionPackVersion, {
    errorMap: () => ({ message: 'Please select a mission pack version.' }),
  }),
}).superRefine((values, ctx) => {
  const matrixOptions = getMissionMatrixOptions(values.missionPackVersion).map(({ value }) => value);
  if (!matrixOptions.includes(values.missionMatrix)) {
    ctx.addIssue({
      message: 'Please select a valid mission matrix.',
      code: z.ZodIssueCode.custom,
      path: ['details.missionMatrix'],
    });
  }
});

export type GameSystemConfig = z.infer<typeof gameSystemConfigSchema>;

export const gameSystemConfigDefaultValues: GameSystemConfig = {
  dynamicPointsVersion: undefined,
  era: Era.LW,
  lessonsFromTheFrontVersion: LessonsFromTheFrontVersion.Mar2024,
  missionMatrix: MissionMatrix.Extended,
  missionPackVersion: MissionPackVersion.Apr2023,
  points: 100,
};

/**
 * Useful to single import both schema and default values.
 */
export const gameSystemConfig = {
  schema: gameSystemConfigSchema,
  defaultValues: gameSystemConfigDefaultValues,
};

/**
 * @param data - Game system config data
 * @returns 
 */
export function isValidGameSystemConfig(data: unknown): data is GameSystemConfig {
  return gameSystemConfigSchema.safeParse(data).success;
}

/**
 * Gets a properly typed, valid Flames of War v4 game system config from a tournament, or null if it
 * does not exist.
 * 
 * @param tournament 
 * @returns 
 */
export const getValidGameSystemConfig = (
  tournament: {
    gameSystem: GameSystem;
    gameSystemConfig: unknown;
  },
): GameSystemConfig | null => {
  if (tournament.gameSystem !== GameSystem.FlamesOfWarV4) {
    return null;
  }
  const result = gameSystemConfigSchema.safeParse(tournament.gameSystemConfig);
  if (result.success) {
    return tournament.gameSystemConfig as GameSystemConfig;
  }
  return null;
};
