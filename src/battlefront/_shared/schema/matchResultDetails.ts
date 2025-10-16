import { z } from 'zod';

import { createEnumSchema } from '../../../common/_internal';
import { BattlePlan } from '../static/battlePlans';
import { MatchOutcomeType } from '../static/matchOutcomeTypes';
import { MissionName } from '../static/missionNames';

export const createMatchResultDetailsSchema = <TFaction extends Record<string, string>>(
  factionEnum: TFaction,
) => z.object({

  // Per-player fields:
  player0BattlePlan: createEnumSchema(BattlePlan, {
    errorMap: () => ({ message: 'Please select a battle plan.' }),
  }),
  player0UnitsLost: z.coerce.number({
    message: 'Please enter a number of units lost',
  }).min(0),
  player0Faction: z.optional(createEnumSchema(factionEnum)),
  player1BattlePlan: createEnumSchema(BattlePlan, {
    errorMap: () => ({ message: 'Please select a battle plan.' }),
  }),
  player1UnitsLost: z.coerce.number({
    message: 'Please enter a number of units lost',
  }).min(0),
  player1Faction: z.optional(createEnumSchema(factionEnum)),

  // Shared fields:
  attacker: z.union([z.literal(0), z.literal(1)], {
    message: 'Please select an attacker.',
  }),
  firstTurn: z.union([z.literal(0), z.literal(1)], {
    message: 'Please select who had the first turn.',
  }),
  mission: createEnumSchema(MissionName, {
    errorMap: () => ({ message: 'Please select a mission.' }),
  }),
  outcomeType: createEnumSchema(MatchOutcomeType, {
    errorMap: () => ({ message: 'Please select an outcome type.' }),
  }),
  turnsPlayed: z.coerce.number({
    message: 'Please enter a number of turns',
  }).min(1),
  winner: z.union([z.literal(-1), z.literal(0), z.literal(1)], {
    message: 'Please select a winner.',
  }),
  scoreOverride: z.optional(z.object({
    player0Score: z.coerce.number({
      message: 'Please enter a score.',
    }).min(0),
    player1Score: z.coerce.number({
      message: 'Please enter a score.',
    }).min(0),
  })),
}).superRefine((values, ctx) => {
  if (values.outcomeType !== 'time_out' && values.winner === undefined) {
    ctx.addIssue({
      message: 'Please select a winner',
      code: z.ZodIssueCode.custom,
      path: ['winner'],
    });
  }
});

export type MatchResultDetails<TFaction extends Record<string, string> = Record<string, string>> = z.infer<ReturnType<typeof createMatchResultDetailsSchema<TFaction>>>;
