import { z } from 'zod';

import { BattlePlan } from '../static/battlePlans';
import { MatchOutcomeType } from '../static/matchOutcomeTypes';
import { MissionName } from '../static/missionNames';

const requiredNumberSchema = ({ message, min }: { message: string, min: number }) => z.preprocess(
  (val) => val === '' ? undefined : val,
  z.coerce.number({ message }).min(min),
);

export const createMatchResultDetailsSchema = <TFaction extends Record<string, string>>(
  factionEnum: TFaction,
) => z.object({

  // Per-player fields:
  player0BattlePlan: z.nativeEnum(BattlePlan, {
    errorMap: () => ({ message: 'Please select a battle plan.' }),
  }),
  player0UnitsLost: requiredNumberSchema({
    message: 'Please enter a number of units lost',
    min: 0,
  }),
  player0Faction: z.nativeEnum(factionEnum, {
    errorMap: () => ({ message: 'Please select a faction.' }),
  }),
  player1BattlePlan: z.nativeEnum(BattlePlan, {
    errorMap: () => ({ message: 'Please select a battle plan.' }),
  }),
  player1UnitsLost: requiredNumberSchema({
    message: 'Please enter a number of units lost',
    min: 0,
  }),
  player1Faction: z.nativeEnum(factionEnum, {
    errorMap: () => ({ message: 'Please select a faction.' }),
  }),

  // Shared fields:
  attacker: z.union([z.literal(0), z.literal(1)], {
    message: 'Please select an attacker.',
  }),
  firstTurn: z.union([z.literal(0), z.literal(1)], {
    message: 'Please select who had the first turn.',
  }),
  mission: z.nativeEnum(MissionName, {
    errorMap: () => ({ message: 'Please select a mission.' }),
  }),
  outcomeType: z.enum(Object.values(MatchOutcomeType) as [MatchOutcomeType, ...MatchOutcomeType[]], {
    message: 'Please select an outcome type.',
  }),
  turnsPlayed: requiredNumberSchema({
    message: 'Please enter a number of turns',
    min: 1,
  }),
  winner: z.union([z.literal(-1), z.literal(0), z.literal(1)], {
    message: 'Please select a winner.',
  }),
  scoreOverride: z.optional(z.object({
    player0Score: requiredNumberSchema({
      message: 'Please enter a score',
      min: 0,
    }),
    player1Score: requiredNumberSchema({
      message: 'Please enter a score',
      min: 0,
    }),
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
