import * as FlamesOfWarV4 from '../../battlefront/flamesOfWarV4';
import * as TeamYankeeV2 from '../../battlefront/teamYankeeV2';
import { GameSystem } from '../static/gameSystems';

export type GameSystemTypeMap = {
  [GameSystem.FlamesOfWarV4]: {
    name: string;
    gameSystem: GameSystem.FlamesOfWarV4,
    gameSystemConfig: FlamesOfWarV4.GameSystemConfig;
    matchResultDetails: FlamesOfWarV4.MatchResultDetails;
  };
  [GameSystem.TeamYankeeV2]: {
    name: string;
    gameSystem: GameSystem.TeamYankeeV2,
    gameSystemConfig: TeamYankeeV2.GameSystemConfig;
    matchResultDetails: TeamYankeeV2.MatchResultDetails;
  };
};

type GameSystemFixture = {
  [K in GameSystem]: {
    name: string;
    gameSystem: K;
    gameSystemConfig: GameSystemTypeMap[K]['gameSystemConfig'];
    matchResultDetails: GameSystemTypeMap[K]['matchResultDetails'];
  }
}[GameSystem];

export const gameSystemFixtures: GameSystemFixture[] = [
  {
    name: 'Flames of War v4',
    gameSystem: GameSystem.FlamesOfWarV4,
    gameSystemConfig: {
      dynamicPointsVersion: FlamesOfWarV4.DynamicPointsVersion.MWDynamic2025,
      era: FlamesOfWarV4.Era.MW,
      lessonsFromTheFrontVersion: FlamesOfWarV4.LessonsFromTheFrontVersion.Aug2025,
      missionMatrix: FlamesOfWarV4.MissionMatrix.Extended,
      missionPackVersion: FlamesOfWarV4.MissionPackVersion.Apr2023,
      points: 100,
    },
    matchResultDetails: {
      attacker: 0,
      firstTurn: 0,
      mission: FlamesOfWarV4.MissionName.Encounter,
      outcomeType: FlamesOfWarV4.MatchOutcomeType.ObjectiveTaken,
      player0BattlePlan: FlamesOfWarV4.BattlePlan.Attack,
      player0Faction: FlamesOfWarV4.Faction.UnitedStates,
      player0UnitsLost: 2,
      player1BattlePlan: FlamesOfWarV4.BattlePlan.Defend,
      player1Faction: FlamesOfWarV4.Faction.Germany,
      player1UnitsLost: 3,
      turnsPlayed: 6,
      winner: 0,
    },
  },
  {
    name: 'Team Yankee v2',
    gameSystem: GameSystem.TeamYankeeV2,
    gameSystemConfig: {
      dynamicPointsVersion: TeamYankeeV2.DynamicPointsVersion.Dynamic2025,
      era: TeamYankeeV2.Era.Default,
      fieldManual101Version: TeamYankeeV2.FieldManual101Version.Mar2024,
      missionMatrix: TeamYankeeV2.MissionMatrix.Extended,
      missionPackVersion: TeamYankeeV2.MissionPackVersion.Apr2023,
      points: 100,
    },
    matchResultDetails: {
      attacker: 0,
      firstTurn: 0,
      mission: TeamYankeeV2.MissionName.NoRetreat,
      outcomeType: TeamYankeeV2.MatchOutcomeType.AttackRepelled,
      player0BattlePlan: TeamYankeeV2.BattlePlan.Attack,
      player0Faction: TeamYankeeV2.Faction.Sweden,
      player0UnitsLost: 2,
      player1BattlePlan: TeamYankeeV2.BattlePlan.Defend,
      player1Faction: TeamYankeeV2.Faction.WestGermany,
      player1UnitsLost: 3,
      turnsPlayed: 6,
      winner: 1,
    },
  },
];
