import { z } from 'zod';

import { createEnumSchema } from '../../../common/_internal';
import { MissionPackVersion } from '../static/missionPackVersions';
import { PointsVersion } from '../static/pointsVersions';
import { isPointsVersionValid } from './gameSystemConfig.validators';

const schema = z.object({
  // TODO: Move gameSystem into gameSystemConfig
  // /** Forced game system discriminator. */
  // gameSystem: z.literal(GameSystem.TeamYankeeV2),

  points: z.coerce.number(),
  pointsVersion: z.optional(createEnumSchema(PointsVersion)),
  missionPackVersion: createEnumSchema(MissionPackVersion, {
    errorMap: () => ({ message: 'Please select a mission pack version.' }),
  }),
}).superRefine((values, ctx) => {
  if (!isPointsVersionValid(values)) {
    ctx.addIssue({
      message: 'Please select a valid points version.',
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
    pointsVersion: PointsVersion.Original,
    missionPackVersion: MissionPackVersion.RuleBook,
    points: 100,
  } satisfies GameSystemConfig,
} as const;
