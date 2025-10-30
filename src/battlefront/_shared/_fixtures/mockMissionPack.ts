import { BattlePlan } from '../static/battlePlans';
import { MatchOutcomeType } from '../static/matchOutcomeTypes';
import { MissionName } from '../static/missionNames';
import { MissionPackMetadata } from '../types';

export const mockMissionPackVersions: Record<'mock_mission_pack_version', MissionPackMetadata<'mock_matrix'>> = {
  mock_mission_pack_version: {
    displayName: 'Mock Mission Pack',
    publishedAt: '2023-04-01T13:00:00+13:00',
    missions: {
      [MissionName.DustUp]: {
        attacker: 'roll',
        firstTurn: 'roll',
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.NoRetreat]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
    },
    matrixes: {
      mock_matrix: {
        displayName: 'Mock Matrix',
        entries: [
          {
            selector: (a, b): boolean => a === BattlePlan.Attack && b === BattlePlan.Defend,
            missions: [
              [MissionName.NoRetreat],
            ],
          },
        ],
      },
    },
  },
};
