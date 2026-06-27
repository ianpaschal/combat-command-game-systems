import { MatchOutcomeType } from '../../_shared/static/matchOutcomeTypes';
import { MissionPackMetadata } from '../types';
import { MissionName } from './missionNames';

export enum MissionPackVersion {
  RuleBook = 'rule_book',
}

export const missionPackVersions: Record<MissionPackVersion, MissionPackMetadata> = {
  [MissionPackVersion.RuleBook]: {
    displayName: 'Rule Book (2019)',
    publishedAt: '2019-01-01T13:00:00+13:00',
    missions: {
      [MissionName.Annihilation]: {
        firstTurn: 'attacker',
        victoryConditions: [],
      },
      [MissionName.Bridgehead]: {
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Breakthrough]: {
        firstTurn: 'attacker',
        minTurns: 6,
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Counterattack]: {
        firstTurn: 'attacker',
        minTurns: 6,
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.DustUp]: {
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Encounter]: {
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.HastyAttack]: {
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.NoMansLand]: {
        firstTurn: 'attacker',
        minTurns: 6,
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.NoRetreat]: {
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Rearguard]: {
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.TheBigGreenFieldsBeyond]: {
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.TheBigPush]: {
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.ThroughTheMudAndBlood]: {
        firstTurn: 'defender',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
    },
  },
} as const;
