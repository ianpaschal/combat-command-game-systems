import { z } from 'zod';

import { DynamicPointsVersion } from '../data/dynamicPointsVersions';
import { Era } from '../data/eras';
import { LessonsFromTheFrontVersion } from '../data/lessonsFromTheFrontVersions';
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

export type GameSystemConfig = z.infer<typeof gameSystemConfig>;

export const defaultValues: GameSystemConfig = {
  dynamicPointsVersion: undefined,
  era: Era.LW,
  lessonsFromTheFrontVersion: LessonsFromTheFrontVersion.Mar2024,
  missionMatrix: MissionMatrix.Extended,
  missionPackVersion: MissionPackVersion.Apr2023,
  points: 100,
};

export function isValidGameSystemConfig(data: unknown): data is GameSystemConfig {
  return gameSystemConfig.safeParse(data).success;
}
