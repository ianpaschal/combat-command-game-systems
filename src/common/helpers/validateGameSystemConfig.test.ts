import {
  describe,
  expect,
  expectTypeOf,
  it,
} from 'vitest';

import { gameSystemFixtures, GameSystemTypeMap } from '../_fixtures/gameSystemFixtures';
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
});
