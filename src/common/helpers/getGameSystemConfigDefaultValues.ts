import { GameSystem } from '../static/gameSystems';
import { GameSystemConfigByGameSystem, GameSystemConfigOptions } from '../types';
import { getGameSystem } from './getGameSystem';

export const getGameSystemConfigDefaultValues = <TGameSystem extends GameSystem>(
  gameSystem: TGameSystem,
  options?: GameSystemConfigOptions,
): GameSystemConfigByGameSystem[TGameSystem] => {
  const { gameSystemConfig } = getGameSystem(gameSystem);
  if (options && 'getDefaultValues' in gameSystemConfig) {
    return gameSystemConfig.getDefaultValues(options) as GameSystemConfigByGameSystem[TGameSystem];
  }
  return gameSystemConfig.defaultValues as GameSystemConfigByGameSystem[TGameSystem];
};
