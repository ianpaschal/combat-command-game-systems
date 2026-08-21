import { getDisplayName, getOptions } from '../_internal';
import { GameSystemMetadata, SelectOption } from '../types';

export enum GameSystem {
  BoltActionV3 = 'bolt_action_v3',
  FlamesOfWarV4 = 'flames_of_war_v4',

  /* It's unclear what version should be used for Great War. It probably has not
   * had 3 previous versions published, however an article on the Battlefront
   * website announcing the 2019 release states that:
   *
   *   "This new edition updates the rules of the Great War game to Version 4
   *   standard and match the rules seen in the ‘Nam and Fate of a Nation
   *   releases."
   *
   *   https://www.flamesofwar.com/Default.aspx?tabid=112&kb_cat_id=211
   */
  GreatWarV4 = 'great_war_v4',
  TeamYankeeV2 = 'team_yankee_v2',
}

const gameSystems: Record<GameSystem, GameSystemMetadata> = {
  [GameSystem.BoltActionV3]: {
    displayName: 'Bolt Action (3rd Ed.)',
  },
  [GameSystem.FlamesOfWarV4]: {
    displayName: 'Flames of War (4th Ed.)',
  },
  [GameSystem.GreatWarV4]: {
    displayName: 'Great War (4th Ed.)',
  },
  [GameSystem.TeamYankeeV2]: {
    displayName: 'Team Yankee (2nd Ed.)',
  },
} as const;

export const getGameSystemOptions = (): SelectOption<GameSystem>[] => getOptions(gameSystems);

export const getGameSystemDisplayName = (
  key: GameSystem,
): string | undefined => getDisplayName(gameSystems, key);
