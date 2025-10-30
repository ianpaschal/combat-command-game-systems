import {
  describe,
  expect,
  it,
} from 'vitest';

import { MatchResultDetails } from '../schema/matchResultDetails';
import { calculateMatchResultScore } from './calculateMatchResultScore';
import { extractMatchResultStats } from './extractMatchResultStats';

describe('extractMatchResultStats()', () => {

  it('returns the correct number of wins for each player.', () => {
    const details = {
      winner: 1,
    } as MatchResultDetails;
    const [player0Stats, player1Stats] = extractMatchResultStats(details);
    expect(player0Stats.wins).toEqual(0);
    expect(player1Stats.wins).toEqual(1);
  });

  it('returns the correct number of units destroyed and lost for each player.', () => {
    const details = {
      player0UnitsLost: 2,
      player1UnitsLost: 4,
    } as MatchResultDetails;
    const [player0Stats, player1Stats] = extractMatchResultStats(details);
    expect(player0Stats.units_destroyed).toEqual(4);
    expect(player0Stats.units_lost).toEqual(2);
    expect(player1Stats.units_destroyed).toEqual(2);
    expect(player1Stats.units_lost).toEqual(4);
  });

  it('returns the correct number of points for each player.', () => {
    const details = {
      winner: 0,
      player0UnitsLost: 3,
      player1UnitsLost: 6,
    } as MatchResultDetails;
    const [player0Score, player1Score] = calculateMatchResultScore(details);
    const [player0Stats, player1Stats] = extractMatchResultStats(details);
    expect(player0Stats.points).toEqual(player0Score);
    expect(player1Stats.points).toEqual(player1Score);
  });

  it('returns a tuple with exactly two BaseStats objects.', () => {
    const details = {
      winner: 0,
      player0UnitsLost: 1,
      player1UnitsLost: 2,
    } as MatchResultDetails;
    const result = extractMatchResultStats(details);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty('points');
    expect(result[0]).toHaveProperty('units_destroyed');
    expect(result[0]).toHaveProperty('units_lost');
    expect(result[0]).toHaveProperty('wins');
    expect(result[1]).toHaveProperty('points');
    expect(result[1]).toHaveProperty('units_destroyed');
    expect(result[1]).toHaveProperty('units_lost');
    expect(result[1]).toHaveProperty('wins');
  });
});
