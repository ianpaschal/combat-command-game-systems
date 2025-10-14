import { getDisplayName, getOptions } from '../_internal';
import { GameSystemMetadata } from '../types';

export enum GameSystem {
  FlamesOfWarV4 = 'flames_of_war_v4',
  TeamYankeeV2 = 'team_yankee_v2',
  // GreatWarV1 = 'great_war_v1',
}

const gameSystems: Record<GameSystem, GameSystemMetadata> = {
  [GameSystem.FlamesOfWarV4]: {
    displayName: 'Flames of War (4th Edition)',
  },
  [GameSystem.TeamYankeeV2]: {
    displayName: 'Team Yankee (2nd Edition)',
  },
  // [GameSystem.GreatWarV1]: {
  //   displayName: 'Great War',
  // },
} as const;

export const getGameSystemOptions = () => getOptions(gameSystems);

export const getGameSystemDisplayName = (
  key: GameSystem,
) => getDisplayName(gameSystems, key);
