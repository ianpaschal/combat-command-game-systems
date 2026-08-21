import {
  describe,
  expect,
  it,
} from 'vitest';

import { gameSystemFixtures } from '../_fixtures/gameSystemFixtures';
import { getDefaultBaseStats } from './getDefaultBaseStats';
import { getGameSystem } from './getGameSystem';

describe('getDefaultBaseStats', () => {
  gameSystemFixtures.forEach((target) => {
    it(`returns ${target.name}'s own default base stats.`, () => {
      const result = getDefaultBaseStats(target.gameSystem);
      expect(result).toEqual(getGameSystem(target.gameSystem).defaultBaseStats);
    });
  });
});
