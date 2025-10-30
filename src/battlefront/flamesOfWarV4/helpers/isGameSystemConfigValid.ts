import { GameSystemConfig, gameSystemConfig } from '../schema/gameSystemConfig';

/**
 * @deprecated
 */
export function isValidGameSystemConfig(data: unknown): data is GameSystemConfig {
  return gameSystemConfig.schema.safeParse(data).success;
}
