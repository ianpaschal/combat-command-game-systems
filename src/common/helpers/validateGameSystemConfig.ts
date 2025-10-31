import * as FlamesOfWarV4 from '../../battlefront/flamesOfWarV4';
import * as TeamYankeeV2 from '../../battlefront/teamYankeeV2';
import { GameSystem } from '../static/gameSystems';
import { getGameSystem } from './getGameSystem';

type GameSystemGameSystemConfig = {
  [GameSystem.FlamesOfWarV4]: FlamesOfWarV4.GameSystemConfig;
  [GameSystem.TeamYankeeV2]: TeamYankeeV2.GameSystemConfig;
};

export const validateGameSystemConfig = <TGameSystem extends GameSystem>(
  gameSystem: TGameSystem,
  details: unknown,
): GameSystemGameSystemConfig[TGameSystem] | null => {
  const { gameSystemConfig } = getGameSystem(gameSystem);
  if (!gameSystemConfig.schema.safeParse(details).success) {
    return null;
  }
  return details as GameSystemGameSystemConfig[TGameSystem];
};
