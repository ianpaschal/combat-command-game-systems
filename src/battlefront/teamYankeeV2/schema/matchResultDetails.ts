import { z } from 'zod';

import { GameSystem } from '../../../common';
import { createMatchResultDetailsSchema } from '../../_shared/schema/matchResultDetails';
import { Faction } from '../static/factions';

export const schema = createMatchResultDetailsSchema(Faction);

export type MatchResultDetails = z.infer<typeof schema>;

/**
 * Useful to single import both schema and default values.
 */
export const matchResultDetails = {
  schema,
  defaultValues: {},
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
