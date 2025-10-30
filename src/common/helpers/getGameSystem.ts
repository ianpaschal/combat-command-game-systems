import * as FlamesOfWarV4 from '../../battlefront/flamesOfWarV4';
import * as TeamYankeeV2 from '../../battlefront/teamYankeeV2';
import { GameSystem } from '../static/gameSystems';

type GameSystemData = typeof FlamesOfWarV4 | typeof TeamYankeeV2;

const STATIC: Record<GameSystem, GameSystemData> = {
  [GameSystem.FlamesOfWarV4]: FlamesOfWarV4,
  [GameSystem.TeamYankeeV2]: TeamYankeeV2,
} as const;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getGameSystem = (gameSystem: GameSystem) => STATIC[gameSystem];
