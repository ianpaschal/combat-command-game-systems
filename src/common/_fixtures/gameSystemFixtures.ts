import * as FlamesOfWarV4 from '../../battlefront/flamesOfWarV4';
import * as GreatWarV4 from '../../battlefront/greatWarV4';
import * as TeamYankeeV2 from '../../battlefront/teamYankeeV2';
import * as BoltActionV3 from '../../warlord/boltActionV3';
import { GameSystem } from '../static/gameSystems';

export type GameSystemTypeMap = {
  [GameSystem.BoltActionV3]: {
    name: string;
    gameSystem: GameSystem.BoltActionV3,
    gameSystemConfig: BoltActionV3.GameSystemConfig;
    matchResultDetails: BoltActionV3.MatchResultDetails;
  };
  [GameSystem.FlamesOfWarV4]: {
    name: string;
    gameSystem: GameSystem.FlamesOfWarV4,
    gameSystemConfig: FlamesOfWarV4.GameSystemConfig;
    matchResultDetails: FlamesOfWarV4.MatchResultDetails;
  };
  [GameSystem.GreatWarV4]: {
    name: string;
    gameSystem: GameSystem.GreatWarV4,
    gameSystemConfig: GreatWarV4.GameSystemConfig;
    matchResultDetails: GreatWarV4.MatchResultDetails;
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
    name: 'Bolt Action v3',
    gameSystem: GameSystem.BoltActionV3,
    gameSystemConfig: {
      maxOrderDice: 12,
      maxUnits: 15,
      missionTypes: [BoltActionV3.MissionType.Battle],
      points: 1000,
    },
    matchResultDetails: {
      mission: BoltActionV3.Mission.KeyPositions,
      player0UnitsLost: 2,
      player1UnitsLost: 3,
      turnsPlayed: 6,
      winner: 0,
    },
  },
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
      player0Faction: FlamesOfWarV4.Faction.SovietUnion,
      player0UnitsLost: 2,
      player1BattlePlan: FlamesOfWarV4.BattlePlan.Defend,
      player1Faction: FlamesOfWarV4.Faction.Germany,
      player1UnitsLost: 3,
      turnsPlayed: 6,
      winner: 0,
    },
  },
  {
    name: 'Great War v4',
    gameSystem: GameSystem.GreatWarV4,
    gameSystemConfig: {
      pointsVersion: GreatWarV4.PointsVersion.Original,
      missionPackVersion: GreatWarV4.MissionPackVersion.RuleBook,
      points: 100,
    },
    matchResultDetails: {
      attacker: 0,
      firstTurn: 0,
      mission: GreatWarV4.MissionName.Encounter,
      outcomeType: GreatWarV4.MatchOutcomeType.ObjectiveTaken,
      player0BattlePlan: GreatWarV4.BattlePlan.Attack,
      player0Faction: GreatWarV4.Faction.Belgium,
      player0UnitsLost: 2,
      player1BattlePlan: GreatWarV4.BattlePlan.Defend,
      player1Faction: GreatWarV4.Faction.Germany,
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
