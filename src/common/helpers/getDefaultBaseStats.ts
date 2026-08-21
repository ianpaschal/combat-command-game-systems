import * as FlamesOfWarV4 from '../../battlefront/flamesOfWarV4';
import * as GreatWarV4 from '../../battlefront/greatWarV4';
import * as TeamYankeeV2 from '../../battlefront/teamYankeeV2';
import * as BoltActionV3 from '../../warlord/boltActionV3';
import { GameSystem } from '../static/gameSystems';

/**
 * Gets a game system's default base stats, typed loosely rather than as its
 * exact per-system shape.
 *
 * @remarks
 * Every game system can have a completely different set of base stats, so there
 * is no shared shape to return generically. Callers that only need to sum,
 * divide, or otherwise process base stats generically (they don't care which
 * keys exist, only that the values are numbers) can use this instead of
 * threading that union through their own code.
 *
 * @param gameSystem - The game system to get default base stats for
 * @returns That system's default base stats
 */
export const getDefaultBaseStats = (gameSystem: GameSystem): Record<string, number> => {
  switch (gameSystem) {
    case GameSystem.BoltActionV3:
      return BoltActionV3.defaultBaseStats;
    case GameSystem.FlamesOfWarV4:
      return FlamesOfWarV4.defaultBaseStats;
    case GameSystem.GreatWarV4:
      return GreatWarV4.defaultBaseStats;
    case GameSystem.TeamYankeeV2:
      return TeamYankeeV2.defaultBaseStats;

    /* v8 ignore next 3 -- exhaustive over GameSystem; unreachable for any real value */
    default:
      return gameSystem satisfies never;
  }
};
