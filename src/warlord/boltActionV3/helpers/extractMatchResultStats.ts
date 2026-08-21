import { TournamentScoring } from '../schema/gameSystemConfig';
import { MatchResultDetails } from '../schema/matchResultDetails';
import { BaseStats } from '../static/rankingFactors';
import { calculateMatchResultScore } from './calculateMatchResultScore';

export const extractMatchResultStats = (
  details: MatchResultDetails,
  tournamentScoring?: TournamentScoring,
): [BaseStats, BaseStats] => {
  const score = calculateMatchResultScore(details, tournamentScoring) ?? [0, 0];
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
