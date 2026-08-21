import * as FlamesOfWarV4 from '../../battlefront/flamesOfWarV4';
import * as GreatWarV4 from '../../battlefront/greatWarV4';
import * as TeamYankeeV2 from '../../battlefront/teamYankeeV2';
import * as BoltActionV3 from '../../warlord/boltActionV3';
import { GameSystem } from '../static/gameSystems';
import { getGameSystem } from './getGameSystem';

type GameSystemMatchResultDetails = {
  [GameSystem.BoltActionV3]: BoltActionV3.MatchResultDetails;
  [GameSystem.FlamesOfWarV4]: FlamesOfWarV4.MatchResultDetails;
  [GameSystem.GreatWarV4]: GreatWarV4.MatchResultDetails;
  [GameSystem.TeamYankeeV2]: TeamYankeeV2.MatchResultDetails;
};

export const validateMatchResultDetails = <TGameSystem extends GameSystem>(
  gameSystem: TGameSystem,
  details: unknown,
): GameSystemMatchResultDetails[TGameSystem] | null => {
  const { matchResultDetails } = getGameSystem(gameSystem);
  if (!matchResultDetails.schema.safeParse(details).success) {
    return null;
  }
  return details as GameSystemMatchResultDetails[TGameSystem];
};
