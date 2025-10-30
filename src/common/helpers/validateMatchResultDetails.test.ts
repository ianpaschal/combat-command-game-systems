import {
  describe,
  expect,
  expectTypeOf,
  it,
} from 'vitest';

import { gameSystemFixtures, GameSystemTypeMap } from '../_fixtures/gameSystemFixtures';
import { validateMatchResultDetails } from './validateMatchResultDetails';

describe('validateMatchResultDetails', () => {
  gameSystemFixtures.forEach((target) => {

    it(`accepts valid ${target.name} details when targeting ${target.name}.`, () => {
      const result = validateMatchResultDetails(
        target.gameSystem,
        target.matchResultDetails,
      );

      expect(result).toEqual(target.matchResultDetails);
    });

    it(`narrows to ${target.name} MatchResultDetails | null.`, () => {
      const result = validateMatchResultDetails(target.gameSystem, target.matchResultDetails);

      // Narrow type:
      expectTypeOf(result).toEqualTypeOf<GameSystemTypeMap[typeof target.gameSystem]['matchResultDetails'] | null>();
    });

    it('rejects valid details for all other game systems.', () => {
      gameSystemFixtures.filter((src) => src.gameSystem !== target.gameSystem).forEach((src) => {
        const result = validateMatchResultDetails(
          target.gameSystem,
          src.matchResultDetails,
        );

        expect(result).toBeNull();
      });
    });
  });
});
