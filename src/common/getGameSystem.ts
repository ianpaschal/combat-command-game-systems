import { GameSystem } from './static/gameSystems';
import * as FlamesOfWarV4 from '../battlefront/flamesOfWarV4';
import * as TeamYankeeV2 from '../battlefront/teamYankeeV2';

type GameSystemData = typeof FlamesOfWarV4 | typeof TeamYankeeV2;

const STATIC: Record<GameSystem, GameSystemData> = {
  [GameSystem.FlamesOfWarV4]: FlamesOfWarV4,
  [GameSystem.TeamYankeeV2]: TeamYankeeV2,
} as const;

export const getGameSystem = (gameSystem: GameSystem) => STATIC[gameSystem];
