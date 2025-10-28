import { z } from 'zod';

import { GameSystem } from '../../../common';
import { createMatchResultDetailsSchema } from '../../_shared/schema/matchResultDetails';
import { Faction } from '../static/factions';

export const schema = createMatchResultDetailsSchema(Faction);

export type MatchResultDetails = z.infer<typeof schema>;

/*
 * React Hook Form doesn't like using undefined as a default value as it causes the inputs to flip
 * between being controlled and uncontrolled. But we also don't really want default values in there:
 * The form should start empty. Therefore we use empty strings as placeholder values. It is sadly
 * necessary to cast it to the correct type or else React Hook Form will whine about empty strings
 * not being valid match result details.
 */
export const defaultValues = {
  attacker: '',
  firstTurn: '',
  mission: '',
  outcomeType: '',
  player0BattlePlan: '',
  player0Faction: '',
  player0UnitsLost: '',
  player1BattlePlan: '',
  player1Faction: '',
  player1UnitsLost: '',
  scoreOverride: undefined, // Except here!
  turnsPlayed: '',
  winner: '',
} as unknown as MatchResultDetails;

/**
 * Useful to single import both schema and default values.
 */
export const matchResultDetails = {
  schema,
  defaultValues,
};

export function isValidMatchResultDetails(data: unknown): data is MatchResultDetails {
  return schema.safeParse(data).success;
}

/**
 * Gets properly typed, valid Team Yankee v2 details from a match result, or null if it does not exist.
 * 
 * @param matchResult 
 * @returns 
 */
export const getValidMatchResultDetails = (
  matchResult: {
    gameSystem: GameSystem;
    details: unknown;
  },
): MatchResultDetails | null => {
  if (matchResult.gameSystem !== GameSystem.TeamYankeeV2) {
    return null;
  }
  if (!schema.safeParse(matchResult.details).success) {
    return null;
  }
  return matchResult.details as MatchResultDetails;
};
