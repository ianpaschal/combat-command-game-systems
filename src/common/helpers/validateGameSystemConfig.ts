import { GameSystem } from '../static/gameSystems';
import { GameSystemConfigByGameSystem, GameSystemConfigOptions } from '../types';
import { getGameSystem } from './getGameSystem';

export const validateGameSystemConfig = <TGameSystem extends GameSystem>(
  gameSystem: TGameSystem,
  data: unknown,
  options?: GameSystemConfigOptions,
): GameSystemConfigByGameSystem[TGameSystem] | null => {
  const { gameSystemConfig } = getGameSystem(gameSystem);
  const schema = options && 'getSchema' in gameSystemConfig ? gameSystemConfig.getSchema(options) : gameSystemConfig.schema;
  if (!schema.safeParse(data).success) {
    return null;
  }
  return data as GameSystemConfigByGameSystem[TGameSystem];
};
