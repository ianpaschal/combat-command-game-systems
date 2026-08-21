import {
  describe,
  expect,
  it,
} from 'vitest';

import { gameSystemFixtures } from '../_fixtures/gameSystemFixtures';
import { calculateMatchResultScore } from './calculateMatchResultScore';

describe('calculateMatchResultScore', () => {
  gameSystemFixtures.forEach((target) => {

    it(`returns null when the details do not belong to ${target.name}.`, () => {
      const other = gameSystemFixtures.find((src) => src.gameSystem !== target.gameSystem);
      const result = calculateMatchResultScore(
        target.gameSystem,
        other?.matchResultDetails,
        target.gameSystemConfig,
      );
      expect(result).toBeNull();
    });

    it(`returns null when the game system config does not belong to ${target.name}.`, () => {
      const other = gameSystemFixtures.find((src) => src.gameSystem !== target.gameSystem);
      const result = calculateMatchResultScore(
        target.gameSystem,
        target.matchResultDetails,
        other?.gameSystemConfig,
      );
      expect(result).toBeNull();
    });
  });

  it('scores Bolt Action from tournamentScoring when the game is a tournament game.', () => {
    const boltAction = gameSystemFixtures.find((src) => src.name === 'Bolt Action v3');
    const result = calculateMatchResultScore(
      boltAction!.gameSystem,
      boltAction!.matchResultDetails,
      { ...boltAction!.gameSystemConfig, tournamentScoring: { win: 3, draw: 1, loss: 0 } },
    );
    expect(result).toEqual([3, 0]);
  });

  it('gives Bolt Action no score at all outside a tournament.', () => {
    const boltAction = gameSystemFixtures.find((src) => src.name === 'Bolt Action v3');
    const result = calculateMatchResultScore(
      boltAction!.gameSystem,
      boltAction!.matchResultDetails,
      boltAction!.gameSystemConfig,
    );
    expect(result).toBeUndefined();
  });

  it('scores Flames of War from details alone, ignoring any config passed.', () => {
    const flamesOfWar = gameSystemFixtures.find((src) => src.name === 'Flames of War v4');
    const result = calculateMatchResultScore(
      flamesOfWar!.gameSystem,
      flamesOfWar!.matchResultDetails,
      flamesOfWar!.gameSystemConfig,
    );

    // Player 0 won with 2 units lost (pg. 101, Battlefront's units-lost-margin table):
    expect(result).toEqual([7, 2]);
  });

  it('scores Great War from details alone.', () => {
    const greatWar = gameSystemFixtures.find((src) => src.name === 'Great War v4');
    const result = calculateMatchResultScore(
      greatWar!.gameSystem,
      greatWar!.matchResultDetails,
      greatWar!.gameSystemConfig,
    );

    // Player 0 won with 2 units lost:
    expect(result).toEqual([7, 2]);
  });

  it('scores Team Yankee from details alone.', () => {
    const teamYankee = gameSystemFixtures.find((src) => src.name === 'Team Yankee v2');
    const result = calculateMatchResultScore(
      teamYankee!.gameSystem,
      teamYankee!.matchResultDetails,
      teamYankee!.gameSystemConfig,
    );

    // Player 1 won with 3 units lost:
    expect(result).toEqual([3, 6]);
  });
});
