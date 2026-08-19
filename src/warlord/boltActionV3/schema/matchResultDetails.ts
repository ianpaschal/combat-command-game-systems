import { z } from 'zod';

import { createEnumSchema } from '../../../common/_internal';
import { scoreOverride } from '../../../common/schemas/scoreOverride';
import { Mission } from '../static/missions';

/**
 * Bolt Action v3 uses a somewhat stripped down matchResultDetails format than
 * Flames of War v4 or Team Yankee v2. While the latter games' missions all
 * follow pretty much the same format and are all scored using the same victory
 * points table, Bolt Action v3 uses different scoring procedures per mission.
 *
 * Therefore, there's no real value in recording detailed set-up options for a
 * given mission if comparing their outcomes is comparing apples and oranges.
 *
 * Also, a large portion of tournaments use custom missions anyway.
 */
const schema = z.object({
  player0UnitsLost: z.coerce.number({
    message: 'Please enter a number of units lost',
  }).min(0),
  player1UnitsLost: z.coerce.number({
    message: 'Please enter a number of units lost',
  }).min(0),
  mission: createEnumSchema(Mission, {
    errorMap: () => ({ message: 'Please select a mission' }),
  }),
  turnsPlayed: z.coerce.number({
    message: 'Please enter a number of turns',
  }).min(1),
  winner: z.union([z.literal(-1), z.literal(0), z.literal(1)], {
    errorMap: () => ({ message: 'Please select a winner' }),
  }),
  scoreOverride: z.optional(scoreOverride),
});

export type MatchResultDetails = z.infer<typeof schema>;

/**
 * Useful to single import both schema and default values.
 */
export const matchResultDetails = {
  schema,

  /**
   * React Hook Form doesn't like using undefined as a default value as it
   * causes the inputs to flip between being controlled and uncontrolled. But we
   * also don't really want default values in there: The form should start
   * empty.
   *
   * See: "Placeholders in Form Fields Are Harmful" by Norman-Nielsen Group
   *      (https://www.nngroup.com/articles/form-design-placeholders/)
   *
   * Therefore we use null as a placeholder values. It is sadly necessary to
   * cast it to the correct type or else React Hook Form will whine about null
   * not being valid match result details.
   */
  defaultValues: {
    mission: null,
    player0UnitsLost: '',
    player1UnitsLost: '',
    scoreOverride: undefined, // Except here!
    turnsPlayed: '',
    winner: null,
  } as unknown as MatchResultDetails,
} as const;
