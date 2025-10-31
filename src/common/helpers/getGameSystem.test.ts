import {
  describe,
  expect,
  it,
} from 'vitest';

import { GameSystem } from '../static/gameSystems';
import { getGameSystem } from './getGameSystem';

describe('getGameSystem', () => {
  it('returns a module for every GameSystem.', () => {
    Object.values(GameSystem).forEach((value) => {
      const result = getGameSystem(value);
      expect(result).toBeDefined();
    });
  });
});
