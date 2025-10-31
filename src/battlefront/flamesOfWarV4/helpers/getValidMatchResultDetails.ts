import { GameSystem } from '../../../common';
import { MatchResultDetails, matchResultDetails } from '../schema/matchResultDetails';

/**
 * @deprecated
 */
export const getValidMatchResultDetails = (
  matchResult: {
    gameSystem: GameSystem;
    details: unknown;
  },
): MatchResultDetails | null => {
  if (matchResult.gameSystem !== GameSystem.FlamesOfWarV4) {
    return null;
  }
  if (!matchResultDetails.schema.safeParse(matchResult.details).success) {
    return null;
  }
  return matchResult.details as MatchResultDetails;
};
