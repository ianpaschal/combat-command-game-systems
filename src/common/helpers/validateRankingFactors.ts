import * as FlamesOfWarV4 from '../../battlefront/flamesOfWarV4';
import * as GreatWarV4 from '../../battlefront/greatWarV4';
import * as TeamYankeeV2 from '../../battlefront/teamYankeeV2';
import * as BoltActionV3 from '../../warlord/boltActionV3';
import { GameSystem } from '../static/gameSystems';
import { getGameSystem } from './getGameSystem';

type GameSystemRankingFactorValues = {
  [GameSystem.BoltActionV3]: Record<BoltActionV3.RankingFactor, number>;
  [GameSystem.FlamesOfWarV4]: Record<FlamesOfWarV4.RankingFactor, number>;
  [GameSystem.GreatWarV4]: Record<GreatWarV4.RankingFactor, number>;
  [GameSystem.TeamYankeeV2]: Record<TeamYankeeV2.RankingFactor, number>;
};

/**
 * Validates that a computed ranking factors object has every key a specific
 * game system's ranking factors are supposed to have, then narrows to that game
 * system's concrete type.
 *
 * @param gameSystem - The game system whose ranking factor keys to check against
 * @param value - The computed ranking factors to check
 * @returns `value`, narrowed to the concrete type, or `null` if it's missing a key
 */
export const validateRankingFactors = <TGameSystem extends GameSystem>(
  gameSystem: TGameSystem,
  value: unknown,
): GameSystemRankingFactorValues[TGameSystem] | null => {
  if (typeof value !== 'object' || value === null) {
    return null;
  }
  const { rankingFactors } = getGameSystem(gameSystem);
  const hasAllKeys = Object.keys(rankingFactors).every((key) => key in value);
  if (!hasAllKeys) {
    return null;
  }
  return value as GameSystemRankingFactorValues[TGameSystem];
};
