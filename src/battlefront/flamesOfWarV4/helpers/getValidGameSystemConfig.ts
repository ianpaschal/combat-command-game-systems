import { GameSystem } from '../../../common';
import { GameSystemConfig,gameSystemConfig } from '../schema/gameSystemConfig';

/**
 * @deprecated
 */
export const getValidGameSystemConfig = (
  tournament: {
    gameSystem: GameSystem;
    gameSystemConfig: unknown;
  },
): GameSystemConfig | null => {
  if (tournament.gameSystem !== GameSystem.FlamesOfWarV4) {
    return null;
  }
  const result = gameSystemConfig.schema.safeParse(tournament.gameSystemConfig);
  if (result.success) {
    return tournament.gameSystemConfig as GameSystemConfig;
  }
  return null;
};
