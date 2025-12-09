import { z } from 'zod';

import { createEnumSchema } from '../../../common/_internal';
import { DynamicPointsVersion } from '../static/dynamicPointsVersions';
import { Era } from '../static/eras';
import { FieldManual101Version } from '../static/fieldManual101Versions';
import { MissionMatrix, MissionPackVersion } from '../static/missionPackVersions';
import { isDynamicPointsVersionValid, isMissionMatrixValid } from './gameSystemConfig.validators';

const schema = z.object({
  // TODO: Move gameSystem into gameSystemConfig
  // /** Forced game system discriminator. */
  // gameSystem: z.literal(GameSystem.TeamYankeeV2),

  era: createEnumSchema(Era),
  points: z.coerce.number(),
  fieldManual101Version: createEnumSchema(FieldManual101Version, {
    errorMap: () => ({ message: 'Please select a FM101 version.' }),
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
  if (!isDynamicPointsVersionValid(values)) {
    ctx.addIssue({
      message: 'Please select a valid dynamic points version for the selected era.',
      code: z.ZodIssueCode.custom,
      path: ['dynamicPointsVersion'],
    });
  }
});

export type GameSystemConfig = z.infer<typeof schema>;

/**
 * Useful to single import both schema and default values.
 */
export const gameSystemConfig = {
  schema,
  defaultValues: {
    dynamicPointsVersion: DynamicPointsVersion.Dynamic2025,
    era: Era.Default,
    fieldManual101Version: FieldManual101Version.Mar2024,
    missionMatrix: MissionMatrix.Extended,
    missionPackVersion: MissionPackVersion.Apr2023,
    points: 100,
  } satisfies GameSystemConfig,
} as const;
