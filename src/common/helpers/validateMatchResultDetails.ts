import * as FlamesOfWarV4 from '../../battlefront/flamesOfWarV4';
import * as TeamYankeeV2 from '../../battlefront/teamYankeeV2';
import { GameSystem } from '../static/gameSystems';
import { getGameSystem } from './getGameSystem';

type GameSystemMatchResultDetails = {
  [GameSystem.FlamesOfWarV4]: FlamesOfWarV4.MatchResultDetails;
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
