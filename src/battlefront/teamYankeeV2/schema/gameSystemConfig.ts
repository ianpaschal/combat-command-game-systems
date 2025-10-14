import { z } from 'zod';

import { GameSystem } from '../../../common';
import { DynamicPointsVersion } from '../data/dynamicPointsVersions';
import { Era } from '../data/eras';
import { FieldManual101Version } from '../data/fieldManual101Versions';
import { getMissionMatrixOptions } from '../data/missionPackUtils';
import { MissionMatrix, MissionPackVersion } from '../data/missionPackVersions';

export const gameSystemConfig = z.object({
  additionalRules: z.optional(z.object({
    allowMidWarMonsters: z.optional(z.union([
      z.literal('yes'),
      z.literal('combat'),
      z.literal('no'),
    ])),
  })),
  era: z.nativeEnum(Era),
  points: z.coerce.number(),
  fieldManual101Version: z.nativeEnum(FieldManual101Version, {
    errorMap: () => ({ message: 'Please select a FM101 version.' }),
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

export type GameSystemConfig = z.infer<typeof gameSystemConfig>;

export const defaultValues: GameSystemConfig = {
  dynamicPointsVersion: undefined,
  era: Era.Default,
  fieldManual101Version: FieldManual101Version.Mar2024,
  missionMatrix: MissionMatrix.Extended,
  missionPackVersion: MissionPackVersion.Apr2023,
  points: 100,
};

/**
 * @deprecated
 * 
 * @param data - Game system config data
 * @returns 
 */
export function isValidGameSystemConfig(data: unknown): data is GameSystemConfig {
  return gameSystemConfig.safeParse(data).success;
}

/**
 * Gets a properly typed, valid Flames of War v4 gameSystemConfig from a tournament, or null if it does not exist.
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
  if (tournament.gameSystem !== GameSystem.TeamYankeeV2) {
    return null;
  }
  const result = gameSystemConfig.safeParse(tournament.gameSystemConfig);
  if (result.success) {
    return tournament.gameSystemConfig as GameSystemConfig;
  }
  return null;
};
