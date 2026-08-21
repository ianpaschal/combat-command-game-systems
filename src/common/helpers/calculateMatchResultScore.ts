import * as FlamesOfWarV4 from '../../battlefront/flamesOfWarV4';
import * as GreatWarV4 from '../../battlefront/greatWarV4';
import * as TeamYankeeV2 from '../../battlefront/teamYankeeV2';
import * as BoltActionV3 from '../../warlord/boltActionV3';
import { GameSystem } from '../static/gameSystems';
import { validateGameSystemConfig } from './validateGameSystemConfig';
import { validateMatchResultDetails } from './validateMatchResultDetails';

/**
 * Calculates the tournament score for a match result, for any game system.
 *
 * @remarks
 * Every game system scores differently: the Battlefront systems score from `details` alone, while
 * Bolt Action has no scoring of its own and converts its win/draw/loss via
 * `gameSystemConfig.tournamentScoring` instead (with no score at all outside a tournament). Each
 * branch below calls straight into its own system's `calculateMatchResultScore`, so there is no
 * shared assumption about what a score is derived from.
 *
 * @param gameSystem - The game system the match was played under
 * @param details - The match result details to score
 * @param gameSystemConfig - The match's game system config
 * @returns A tuple with the scores for player 0 and 1 respectively, `null` if `details` or
 * `gameSystemConfig` do not belong to `gameSystem`, or `undefined` if this game system's rules give
 * no score for this match (e.g. a non-tournament Bolt Action game)
 */
export const calculateMatchResultScore = <TGameSystem extends GameSystem>(
  gameSystem: TGameSystem,
  details: unknown,
  gameSystemConfig: unknown,
): [number, number] | null | undefined => {
  const validDetails = validateMatchResultDetails(gameSystem, details);
  const validConfig = validateGameSystemConfig(gameSystem, gameSystemConfig);
  if (!validDetails || !validConfig) {
    return null;
  }

  switch (gameSystem) {
    case GameSystem.BoltActionV3:
      return BoltActionV3.calculateMatchResultScore(
        validDetails as BoltActionV3.MatchResultDetails,
        (validConfig as BoltActionV3.GameSystemConfig).tournamentScoring,
      );
    case GameSystem.FlamesOfWarV4:
      return FlamesOfWarV4.calculateMatchResultScore(
        validDetails as FlamesOfWarV4.MatchResultDetails,
      );
    case GameSystem.GreatWarV4:
      return GreatWarV4.calculateMatchResultScore(
        validDetails as GreatWarV4.MatchResultDetails,
      );
    case GameSystem.TeamYankeeV2:
      return TeamYankeeV2.calculateMatchResultScore(
        validDetails as TeamYankeeV2.MatchResultDetails,
      );

    /* v8 ignore next 3 -- exhaustive over GameSystem; unreachable for any real value */
    default:
      return gameSystem satisfies never;
  }
};
