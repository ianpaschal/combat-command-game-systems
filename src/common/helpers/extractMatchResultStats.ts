import * as FlamesOfWarV4 from '../../battlefront/flamesOfWarV4';
import * as GreatWarV4 from '../../battlefront/greatWarV4';
import * as TeamYankeeV2 from '../../battlefront/teamYankeeV2';
import * as BoltActionV3 from '../../warlord/boltActionV3';
import { GameSystem } from '../static/gameSystems';
import { validateGameSystemConfig } from './validateGameSystemConfig';
import { validateMatchResultDetails } from './validateMatchResultDetails';

/**
 * Extracts the base ranking-factor stats (wins, points, units lost, units destroyed) for both
 * players of a match result, for any game system.
 *
 * @remarks
 * As with `calculateMatchResultScore`, each system's own `extractMatchResultStats` is called
 * directly rather than assuming they all derive stats the same way. Bolt Action needs
 * `gameSystemConfig.tournamentScoring` to know its points; the Battlefront systems don't.
 *
 * @param gameSystem - The game system the match was played under
 * @param details - The match result details to extract stats from
 * @param gameSystemConfig - The match's game system config
 * @returns A tuple with the stats for player 0 and 1 respectively, or `null` if `details` or
 * `gameSystemConfig` do not belong to `gameSystem`
 */
export const extractMatchResultStats = <TGameSystem extends GameSystem>(
  gameSystem: TGameSystem,
  details: unknown,
  gameSystemConfig: unknown,
): [Record<string, number>, Record<string, number>] | null => {
  const validDetails = validateMatchResultDetails(gameSystem, details);
  const validConfig = validateGameSystemConfig(gameSystem, gameSystemConfig);
  if (!validDetails || !validConfig) {
    return null;
  }

  switch (gameSystem) {
    case GameSystem.BoltActionV3:
      return BoltActionV3.extractMatchResultStats(
        validDetails as BoltActionV3.MatchResultDetails,
        (validConfig as BoltActionV3.GameSystemConfig).tournamentScoring,
      );
    case GameSystem.FlamesOfWarV4:
      return FlamesOfWarV4.extractMatchResultStats(
        validDetails as FlamesOfWarV4.MatchResultDetails,
      );
    case GameSystem.GreatWarV4:
      return GreatWarV4.extractMatchResultStats(
        validDetails as GreatWarV4.MatchResultDetails,
      );
    case GameSystem.TeamYankeeV2:
      return TeamYankeeV2.extractMatchResultStats(
        validDetails as TeamYankeeV2.MatchResultDetails,
      );

    /* v8 ignore next 3 -- exhaustive over GameSystem; unreachable for any real value */
    default:
      return gameSystem satisfies never;
  }
};
