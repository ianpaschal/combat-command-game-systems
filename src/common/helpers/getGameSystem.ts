import * as FlamesOfWarV4 from '../../battlefront/flamesOfWarV4';
import * as GreatWarV4 from '../../battlefront/greatWarV4';
import * as TeamYankeeV2 from '../../battlefront/teamYankeeV2';
import * as BoltActionV3 from '../../warlord/boltActionV3';
import { GameSystem } from '../static/gameSystems';

const STATIC = {
  [GameSystem.BoltActionV3]: BoltActionV3,
  [GameSystem.FlamesOfWarV4]: FlamesOfWarV4,
  [GameSystem.GreatWarV4]: GreatWarV4,
  [GameSystem.TeamYankeeV2]: TeamYankeeV2,
} as const;

export const getGameSystem = <T extends GameSystem>(gameSystem: T): typeof STATIC[T] => STATIC[gameSystem];
