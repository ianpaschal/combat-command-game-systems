import { z } from 'zod';

import { GameSystemConfigOptions } from '../../../common';
import { createEnumSchema } from '../../../common/_internal';
import { MissionType } from '../static/missionTypes';

export const tournamentScoring = z.object({
  win: z.coerce.number({
    message: 'Please enter the points awarded for a win',
  }).min(0),
  draw: z.coerce.number({
    message: 'Please enter the points awarded for a draw',
  }).min(0),
  loss: z.coerce.number({
    message: 'Please enter the points awarded for a loss',
  }).min(0),
});

export type TournamentScoring = z.infer<typeof tournamentScoring>;

const schema = z.object({
  points: z.coerce.number({
    message: 'Please enter a points limit',
  }).min(0),
  maxUnits: z.coerce.number({
    message: 'Please enter a limit for the number of units',
  }).min(0),
  maxOrderDice: z.coerce.number({
    message: 'Please enter a limit for the number of order dice',
  }).min(0),

  missionTypes: z.array(createEnumSchema(MissionType), {
    errorMap: () => ({ message: 'Please select at least one mission type' }),
  }).min(1, 'Please select at least one mission type'),

  /**
   * Only present for tournament-context games. If omitted, this is a
   * non-tournament match, so there is no configured points conversion and the
   * recorded win/draw/loss stands on its own.
   */
  tournamentScoring: z.optional(tournamentScoring),
});

export type GameSystemConfig = z.infer<typeof schema>;

const defaultValues = {
  points: 1000,
  maxOrderDice: 12,
  maxUnits: 12,
  missionTypes: [MissionType.Battle],
} satisfies GameSystemConfig;

const DEFAULT_TOURNAMENT_SCORING: TournamentScoring = {
  win: 3,
  draw: 1,
  loss: 0,
};

/**
 * Useful to single import both schema and default values.
 */
export const gameSystemConfig = {
  schema,
  defaultValues,
  getDefaultValues: (options?: GameSystemConfigOptions): GameSystemConfig => ({
    ...defaultValues,
    ...(options?.tournament ? {
      tournamentScoring: DEFAULT_TOURNAMENT_SCORING,
    } : {}),
  }),
  getSchema: (options?: GameSystemConfigOptions) => schema.extend({
    tournamentScoring: options?.tournament ? tournamentScoring : z.optional(tournamentScoring),
  }),
} as const;
