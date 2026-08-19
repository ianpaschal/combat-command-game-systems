import {
  describe,
  expect,
  it,
} from 'vitest';

import { calculateMatchResultWinner } from './calculateMatchResultWinner';

describe('calculateMatchResultWinner()', () => {
  it('returns undefined when there is no score override.', () => {
    expect(calculateMatchResultWinner()).toBeUndefined();
  });

  it('awards the win to whoever has the higher overridden score.', () => {
    expect(calculateMatchResultWinner({ player0Score: 5, player1Score: 2 })).toEqual(0);
    expect(calculateMatchResultWinner({ player0Score: 2, player1Score: 5 })).toEqual(1);
  });

  it('calls it a draw when the overridden scores are equal.', () => {
    expect(calculateMatchResultWinner({ player0Score: 3, player1Score: 3 })).toEqual(-1);
  });
});
