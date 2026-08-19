import { TournamentScoring } from '../schema/gameSystemConfig';
import { MatchResultDetails } from '../schema/matchResultDetails';

type ScoreDetailFields = 'winner' | 'scoreOverride';

/**
 * Calculate the tournament points (i.e. score) for a given match result.
 *
 * @remarks
 * Bolt Action has no scoring of its own beyond the win, draw, or loss itself: the conversion to
 * points is whatever the tournament organizer configured. A match played outside a tournament
 * therefore has no score at all, and the recorded win/draw/loss stands on its own - unless the
 * score itself was overridden, which takes priority either way.
 *
 * @param details - The match result details to score
 * @param tournamentScoring - The tournament's configured points per result
 * @returns A tuple with the scores for player 0 and 1 respectively, or `undefined` if this is not
 * a tournament game and the score wasn't overridden
 */
export const calculateMatchResultScore = (
  details: Pick<MatchResultDetails, ScoreDetailFields>,
  tournamentScoring?: TournamentScoring,
): [number, number] | undefined => {

  // If the score has been overridden, just use that:
  if (details.scoreOverride) {
    return [
      details.scoreOverride.player0Score,
      details.scoreOverride.player1Score,
    ];
  }
  
  if (tournamentScoring) {
    const { win, draw, loss } = tournamentScoring;

    // Player 0 Wins:
    if (details.winner === 0) {
      return [win, loss];
    }

    // Player 1 Wins:
    if (details.winner === 1) {
      return [loss, win];
    }

    // Draw:
    return [draw, draw];
  }
};
