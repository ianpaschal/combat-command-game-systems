import { StatKey } from '../data/rankingFactors';
import { MatchResultDetails } from '../schema/matchResultDetails';
import { calculateMatchResultScore } from './calculateMatchResultScore';

export const extractMatchResultStats = (
  details: MatchResultDetails,
): [Record<StatKey, number>, Record<StatKey, number>] => {
  const score = calculateMatchResultScore(details);
  return [
    {
      points: score[0],
      units_destroyed: details.player1UnitsLost,
      units_lost: details.player0UnitsLost,
      wins: details.winner === 0 ? 1 : 0,
    },
    {
      points: score[1],
      units_destroyed: details.player0UnitsLost,
      units_lost: details.player1UnitsLost,
      wins: details.winner === 1 ? 1 : 0,
    },
  ];
};
