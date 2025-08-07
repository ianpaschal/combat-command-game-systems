import {
  describe,
  expect,
  it,
} from 'vitest';

import { MatchResultDetails } from '../schema/matchResultDetails';
import { calculateMatchResultScore } from './calculateMatchResultScore';

describe('calculateMatchResultScore', () => {

  it('should return 8:1 when player 0 wins with less than 2 units lost.', () => {
    const details = {
      winner: 0,
      player0UnitsLost: 1,
      player1UnitsLost: 5,
    } as MatchResultDetails;

    const [player0Score, player1Score] = calculateMatchResultScore(details);

    expect(player0Score).toEqual(8);
    expect(player1Score).toEqual(1);
  });

  it('should return 7:2 when player 0 wins with 2 units lost.', () => {
    const details = {
      winner: 0,
      player0UnitsLost: 2,
      player1UnitsLost: 5,
    } as MatchResultDetails;

    const [player0Score, player1Score] = calculateMatchResultScore(details);

    expect(player0Score).toEqual(7);
    expect(player1Score).toEqual(2);
  });

  it('should return 6:3 when player 0 wins with 3 or more units lost.', () => {
    const details = {
      winner: 0,
      player0UnitsLost: 3,
      player1UnitsLost: 5,
    } as MatchResultDetails;

    const [player0Score, player1Score] = calculateMatchResultScore(details);

    expect(player0Score).toEqual(6);
    expect(player1Score).toEqual(3);
  });

  it('should return 1:8 when player 1 wins with less than 2 units lost.', () => {
    const details = {
      winner: 1,
      player1UnitsLost: 1,
      player0UnitsLost: 5,
    } as MatchResultDetails;

    const [player0Score, player1Score] = calculateMatchResultScore(details);

    expect(player0Score).toEqual(1);
    expect(player1Score).toEqual(8);
  });

  it('should return 2:7 when player 1 wins with 2 units lost.', () => {
    const details = {
      winner: 1,
      player1UnitsLost: 2,
      player0UnitsLost: 5,
    } as MatchResultDetails;

    const [player0Score, player1Score] = calculateMatchResultScore(details);

    expect(player0Score).toEqual(2);
    expect(player1Score).toEqual(7);
  });

  it('should return 3:6 when player 1 wins with 3 or more units lost.', () => {
    const details = {
      winner: 1,
      player1UnitsLost: 3,
      player0UnitsLost: 5,
    } as MatchResultDetails;

    const [player0Score, player1Score] = calculateMatchResultScore(details);

    expect(player0Score).toEqual(3);
    expect(player1Score).toEqual(6);
  });

  it('should return a draw score based on units lost.', () => {
    const details = {
      winner: -1,
      player0UnitsLost: 2,
      player1UnitsLost: 3,
    } as MatchResultDetails;

    const [player0Score, player1Score] = calculateMatchResultScore(details);

    expect(player0Score).toEqual(3);
    expect(player1Score).toEqual(2);
  });

  it('should cap the draw score at 3 for units lost greater than 3.', () => {
    const details = {
      winner: -1,
      player0UnitsLost: 5,
      player1UnitsLost: 4,
    } as MatchResultDetails;

    const [player0Score, player1Score] = calculateMatchResultScore(details);

    expect(player0Score).toEqual(3);
    expect(player1Score).toEqual(3);
  });

  it('should floor the draw score at 1 for units lost less than 1.', () => {
    const details = {
      winner: -1,
      player0UnitsLost: 0,
      player1UnitsLost: -1,
    } as MatchResultDetails;

    const [player0Score, player1Score] = calculateMatchResultScore(details);

    expect(player0Score).toEqual(1);
    expect(player1Score).toEqual(1);
  });

  describe('with a scoreOverride', () => {
    it('should return override scores when scoreOverride is provided.', () => {
      const details = {
        winner: 0,
        player0UnitsLost: 1,
        player1UnitsLost: 5,
        scoreOverride: {
          player0Score: 10,
          player1Score: 0,
        },
      } as MatchResultDetails;

      const [player0Score, player1Score] = calculateMatchResultScore(details);

      expect(player0Score).toEqual(10);
      expect(player1Score).toEqual(0);
    });

    it('should return override scores even when winner would normally give different scores.', () => {
      const details = {
        winner: 1,
        player0UnitsLost: 5,
        player1UnitsLost: 1,
        scoreOverride: {
          player0Score: 5,
          player1Score: 5,
        },
      } as MatchResultDetails;

      const [player0Score, player1Score] = calculateMatchResultScore(details);

      expect(player0Score).toEqual(5);
      expect(player1Score).toEqual(5);
    });

    it('should return override scores even for draw scenarios.', () => {
      const details = {
        winner: -1,
        player0UnitsLost: 2,
        player1UnitsLost: 3,
        scoreOverride: {
          player0Score: 7,
          player1Score: 3,
        },
      } as MatchResultDetails;

      const [player0Score, player1Score] = calculateMatchResultScore(details);

      expect(player0Score).toEqual(7);
      expect(player1Score).toEqual(3);
    });

    it('should return override scores with zero values.', () => {
      const details = {
        winner: 0,
        player0UnitsLost: 1,
        player1UnitsLost: 5,
        scoreOverride: {
          player0Score: 0,
          player1Score: 0,
        },
      } as MatchResultDetails;

      const [player0Score, player1Score] = calculateMatchResultScore(details);

      expect(player0Score).toEqual(0);
      expect(player1Score).toEqual(0);
    });

    it('should return override scores with negative values.', () => {
      const details = {
        winner: 1,
        player0UnitsLost: 5,
        player1UnitsLost: 1,
        scoreOverride: {
          player0Score: -1,
          player1Score: 9,
        },
      } as MatchResultDetails;

      const [player0Score, player1Score] = calculateMatchResultScore(details);

      expect(player0Score).toEqual(-1);
      expect(player1Score).toEqual(9);
    });
  });
});
