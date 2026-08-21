import {
  describe,
  expect,
  it,
} from 'vitest';

import { GameSystem } from '../static/gameSystems';
import { getGameSystem } from './getGameSystem';
import { validateRankingFactors } from './validateRankingFactors';

const createEmptyResults = (
  keys: string[],
): Record<string, number> => (keys.reduce((acc, key) => ({
  ...acc,
  [key]: 0,
}), {} as Record<string, number>));

describe('validateRankingFactors', () => {
  Object.values(GameSystem).forEach((gameSystem) => {

    it(`accepts a valid ${gameSystem} ranking factors object with every expected key.`, () => {
      const { rankingFactors } = getGameSystem(gameSystem);
      const value = createEmptyResults(Object.keys(rankingFactors));

      const result = validateRankingFactors(gameSystem, value);

      expect(result).toEqual(value);
    });

    it(`rejects a ${gameSystem} ranking factors object missing a key.`, () => {
      const { rankingFactors } = getGameSystem(gameSystem);
      const value = createEmptyResults(Object.keys(rankingFactors).slice(1));

      const result = validateRankingFactors(gameSystem, value);

      expect(result).toBeNull();
    });
  });

  it('rejects a non-object value.', () => {
    expect(validateRankingFactors(GameSystem.BoltActionV3, 'not an object')).toBeNull();
  });

  it('rejects null.', () => {
    expect(validateRankingFactors(GameSystem.BoltActionV3, null)).toBeNull();
  });

  it('accepts extra keys beyond what is expected.', () => {
    const { rankingFactors } = getGameSystem(GameSystem.BoltActionV3);
    const value = {
      ...createEmptyResults(Object.keys(rankingFactors)),
      unexpected_extra_key: 1,
    };

    const result = validateRankingFactors(GameSystem.BoltActionV3, value);

    expect(result).toEqual(value);
  });
});
