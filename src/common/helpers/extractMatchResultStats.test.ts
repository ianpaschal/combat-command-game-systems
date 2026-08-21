import {
  describe,
  expect,
  it,
} from 'vitest';

import { gameSystemFixtures } from '../_fixtures/gameSystemFixtures';
import { extractMatchResultStats } from './extractMatchResultStats';

describe('extractMatchResultStats', () => {
  gameSystemFixtures.forEach((target) => {

    it(`returns null when the details do not belong to ${target.name}.`, () => {
      const other = gameSystemFixtures.find((src) => src.gameSystem !== target.gameSystem);
      const result = extractMatchResultStats(
        target.gameSystem,
        other?.matchResultDetails,
        target.gameSystemConfig,
      );
      expect(result).toBeNull();
    });

    it(`returns null when the game system config does not belong to ${target.name}.`, () => {
      const other = gameSystemFixtures.find((src) => src.gameSystem !== target.gameSystem);
      const result = extractMatchResultStats(
        target.gameSystem,
        target.matchResultDetails,
        other?.gameSystemConfig,
      );
      expect(result).toBeNull();
    });

    it(`extracts stats for both players of a valid ${target.name} match.`, () => {
      const result = extractMatchResultStats(
        target.gameSystem,
        target.matchResultDetails,
        target.gameSystemConfig,
      );
      expect(result).not.toBeNull();
      expect(result?.[0]).toHaveProperty('wins');
      expect(result?.[0]).toHaveProperty('points');
      expect(result?.[0]).toHaveProperty('units_lost');
      expect(result?.[0]).toHaveProperty('units_destroyed');
      expect(result?.[1]).toHaveProperty('wins');
      expect(result?.[1]).toHaveProperty('points');
      expect(result?.[1]).toHaveProperty('units_lost');
      expect(result?.[1]).toHaveProperty('units_destroyed');
    });
  });

  it('gives Bolt Action no points outside a tournament, since there is no configured conversion.', () => {
    const boltAction = gameSystemFixtures.find((src) => src.name === 'Bolt Action v3');
    const result = extractMatchResultStats(
      boltAction!.gameSystem,
      boltAction!.matchResultDetails,
      boltAction!.gameSystemConfig,
    );
    expect(result?.[0].points).toEqual(0);
    expect(result?.[1].points).toEqual(0);
  });

  it('scores Bolt Action points from tournamentScoring when the game is a tournament game.', () => {
    const boltAction = gameSystemFixtures.find((src) => src.name === 'Bolt Action v3');
    const result = extractMatchResultStats(
      boltAction!.gameSystem,
      boltAction!.matchResultDetails,
      { ...boltAction!.gameSystemConfig, tournamentScoring: { win: 3, draw: 1, loss: 0 } },
    );
    expect(result?.[0].points).toEqual(3);
    expect(result?.[1].points).toEqual(0);
  });
});
