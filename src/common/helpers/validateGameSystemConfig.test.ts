import {
  describe,
  expect,
  expectTypeOf,
  it,
} from 'vitest';

import { gameSystemFixtures, GameSystemTypeMap } from '../_fixtures/gameSystemFixtures';
import { GameSystem } from '../static/gameSystems';
import { validateGameSystemConfig } from './validateGameSystemConfig';

describe('validateGameSystemConfig()', () => {
  gameSystemFixtures.forEach((target) => {

    it(`accepts valid ${target.name} details when targeting ${target.name}.`, () => {
      const result = validateGameSystemConfig(
        target.gameSystem,
        target.gameSystemConfig,
      );

      expect(result).toEqual(target.gameSystemConfig);
    });

    it(`narrows to ${target.name} GameSystemConfig | null.`, () => {
      const result = validateGameSystemConfig(target.gameSystem, target.gameSystemConfig);

      // Narrow type:
      expectTypeOf(result).toEqualTypeOf<GameSystemTypeMap[typeof target.gameSystem]['gameSystemConfig'] | null>();
    });

    it('rejects valid details for all other game systems.', () => {
      gameSystemFixtures.filter((src) => src.gameSystem !== target.gameSystem).forEach((src) => {
        const result = validateGameSystemConfig(
          target.gameSystem,
          src.gameSystemConfig,
        );

        expect(result).toBeNull();
      });
    });
  });

  describe('options', () => {
    it('ignores options for a game system with no getSchema.', () => {
      const flamesOfWarV4 = gameSystemFixtures.find((src) => src.gameSystem === GameSystem.FlamesOfWarV4)!;
      const result = validateGameSystemConfig(
        flamesOfWarV4.gameSystem,
        flamesOfWarV4.gameSystemConfig,
        { tournament: true },
      );

      expect(result).toEqual(flamesOfWarV4.gameSystemConfig);
    });

    it('accepts a config without tournamentScoring for Bolt Action v3 when no options are given.', () => {
      const boltActionV3 = gameSystemFixtures.find((src) => src.gameSystem === GameSystem.BoltActionV3)!;
      const result = validateGameSystemConfig(
        boltActionV3.gameSystem,
        boltActionV3.gameSystemConfig,
      );

      expect(result).toEqual(boltActionV3.gameSystemConfig);
    });

    it('rejects a config without tournamentScoring for Bolt Action v3 when tournament is true.', () => {
      const boltActionV3 = gameSystemFixtures.find((src) => src.gameSystem === GameSystem.BoltActionV3)!;
      const result = validateGameSystemConfig(
        boltActionV3.gameSystem,
        boltActionV3.gameSystemConfig,
        { tournament: true },
      );

      expect(result).toBeNull();
    });

    it('accepts a config with tournamentScoring for Bolt Action v3 when tournament is true.', () => {
      const boltActionV3 = gameSystemFixtures.find((src) => src.gameSystem === GameSystem.BoltActionV3)!;
      const gameSystemConfig = {
        ...boltActionV3.gameSystemConfig,
        tournamentScoring: { win: 3, draw: 1, loss: 0 },
      };
      const result = validateGameSystemConfig(
        boltActionV3.gameSystem,
        gameSystemConfig,
        { tournament: true },
      );

      expect(result).toEqual(gameSystemConfig);
    });
  });
});
