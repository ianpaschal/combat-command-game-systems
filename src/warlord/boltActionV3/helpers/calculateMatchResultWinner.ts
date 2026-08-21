import { ScoreOverride, Winner } from '../../../common';

/**
 * Derives the winner from an overridden score.
 *
 * @remarks
 * Bolt Action has no formula of its own to derive a winner from - the outcome is recorded
 * directly. This only exists to keep `winner` in step when a score override is entered, so the
 * two don't disagree.
 *
 * @param scoreOverride - The overridden score, if any
 * @returns The index of the winning player, `-1` for a draw, or `undefined` when there's no
 * override to derive a winner from
 */
export const calculateMatchResultWinner = (
  scoreOverride?: ScoreOverride,
): Winner | undefined => {
  if (!scoreOverride) {
    return undefined;
  }
  if (scoreOverride.player0Score > scoreOverride.player1Score) {
    return 0;
  }
  if (scoreOverride.player0Score < scoreOverride.player1Score) {
    return 1;
  }
  return -1;
};
