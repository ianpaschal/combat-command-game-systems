import {
  describe,
  expect,
  it,
} from 'vitest';

import { TournamentScoring } from '../schema/gameSystemConfig';
import { calculateMatchResultScore } from './calculateMatchResultScore';

describe('calculateMatchResultScore()', () => {

  const tournamentScoring: TournamentScoring = {
    win: 3,
    draw: 1,
    loss: 0,
  };

  it('awards the configured win and loss points when player 0 wins.', () => {
    expect(calculateMatchResultScore({
      winner: 0,
    }, tournamentScoring)).toEqual([3, 0]);
  });

  it('awards the configured win and loss points when player 1 wins.', () => {
    expect(calculateMatchResultScore({
      winner: 1,
    }, tournamentScoring)).toEqual([0, 3]);
  });

  it('awards the configured draw points to each player for a draw.', () => {
    expect(calculateMatchResultScore({
      winner: -1,
    }, tournamentScoring)).toEqual([1, 1]);
  });

  it('uses whatever scoring the tournament configured.', () => {
    expect(calculateMatchResultScore({
      winner: 0,
    }, { win: 5, draw: 2, loss: 1 })).toEqual([5, 1]);
  });

  it('returns no score at all outside a tournament.', () => {
    expect(calculateMatchResultScore({
      winner: 0,
    })).toBeUndefined();
  });

  it('prefers a score override over the tournament scoring.', () => {
    expect(calculateMatchResultScore({
      winner: 0,
      scoreOverride: { player0Score: 7, player1Score: 2 },
    }, tournamentScoring)).toEqual([7, 2]);
  });

  it('uses a score override even outside a tournament.', () => {
    expect(calculateMatchResultScore({
      winner: 0,
      scoreOverride: { player0Score: 7, player1Score: 2 },
    })).toEqual([7, 2]);
  });
});
