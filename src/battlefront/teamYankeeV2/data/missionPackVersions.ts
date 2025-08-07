import { getDisplayName } from '../../../common/_internal';
import { getOptions } from '../../../common/_internal/getOptions';
import { BattlePlan } from '../../_shared/data/battlePlans';
import { MatchOutcomeType } from '../../_shared/data/matchOutcomeTypes';
import { MissionName } from '../../_shared/data/missionNames';
import { MissionPackMetadata } from '../../_shared/types';

export enum MissionPackVersion {
  Apr2023 = '2023_04',
}

export const missionPackVersions: Record<MissionPackVersion, MissionPackMetadata> = {
  [MissionPackVersion.Apr2023]: {
    displayName: 'April 2023',
    publishedAt: '2023-04-01T00:00:00+13:00',
    missions: {
      [MissionName.Annihilation]: {
        attacker: 'roll',
        firstTurn: 'roll',
        victoryConditions: [],
      },
      [MissionName.Breakthrough]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        minTurns: 6,
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Bridgehead]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        minTurns: 6,
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Bypass]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        minTurns: 3,
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Cornered]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        minTurns: 6,
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Counterattack]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        minTurns: 6,
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Counterstrike]: {
        attacker: 'battle_plan',
        firstTurn: 'defender',
        minTurns: 6,
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.CoveringForce]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Dogfight]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.DustUp]: {
        attacker: 'roll',
        firstTurn: 'roll',
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Encirclement]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Encounter]: {
        attacker: 'roll',
        firstTurn: 'roll',
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Escape]: {
        attacker: 'battle_plan',
        firstTurn: 'defender',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.FightingWithdrawal]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.FreeForAll]: {
        attacker: 'roll',
        firstTurn: 'roll',
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Gauntlet]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        minTurns: 6,
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.HoldThePocket]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.ItsATrap]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.KillingGround]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
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
      [MissionName.Outflanked]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        minTurns: 6,
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Outmaneuvered]: {
        attacker: 'battle_plan',
        firstTurn: 'defender',
        minTurns: 6,
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Probe]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.ScoutsOut]: {
        attacker: 'roll',
        firstTurn: 'roll',
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Spearpoint]: {
        attacker: 'battle_plan',
        firstTurn: 'defender',
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.ValleyOfDeath]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        minTurns: 6,
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Vanguard]: {
        attacker: 'roll',
        firstTurn: 'roll',
        victoryConditions: [
          MatchOutcomeType.MaxPointsReached,
        ],
      },
    },
    matrixes: {
      default: {
        displayName: 'Battle Plans',
        entries: [
          {
            selector: (a, b) => a === BattlePlan.Attack && b === BattlePlan.Attack,
            missions: [
              [MissionName.Breakthrough],
              [MissionName.Counterattack],
              [MissionName.DustUp],
              [MissionName.Encounter],
              [MissionName.FreeForAll],
              [MissionName.FreeForAll],
            ],
          },
          {
            selector: (a, b) => {
              const plans = new Set([a,b]);
              return plans.has(BattlePlan.Attack) && plans.has(BattlePlan.Maneuver);
            },
            missions: [
              [MissionName.Breakthrough],
              [MissionName.Probe],
              [MissionName.Counterattack],
              [MissionName.Counterattack],
              [MissionName.DustUp],
              [MissionName.Encounter],
            ],
          },
          {
            selector: (a, b) => {
              const plans = new Set([a,b]);
              return plans.has(BattlePlan.Attack) && plans.has(BattlePlan.Defend);
            },
            missions: [
              [MissionName.Bridgehead],
              [MissionName.Bridgehead],
              [MissionName.NoRetreat],
              [MissionName.NoRetreat],
              [MissionName.FightingWithdrawal],
              [MissionName.FightingWithdrawal],
            ],
          },
          {
            selector: (a, b) => a === BattlePlan.Maneuver && b === BattlePlan.Maneuver,
            missions: [
              [MissionName.Breakthrough],
              [MissionName.Counterattack],
              [MissionName.DustUp],
              [MissionName.Encounter],
              [MissionName.FreeForAll],
              [MissionName.FreeForAll],
            ],
          },
          {
            selector: (a, b) => {
              const plans = new Set([a,b]);
              return plans.has(BattlePlan.Maneuver) && plans.has(BattlePlan.Defend);
            },
            missions: [
              [MissionName.Breakthrough],
              [MissionName.Bridgehead],
              [MissionName.Probe],
              [MissionName.NoRetreat],
              [MissionName.NoRetreat],
              [MissionName.FightingWithdrawal],
            ],
          },
          {
            selector: (a, b) => a === BattlePlan.Defend && b === BattlePlan.Defend,
            missions: [
              [MissionName.Breakthrough],
              [MissionName.Counterattack],
              [MissionName.DustUp],
              [MissionName.Encounter],
              [MissionName.FreeForAll],
              [MissionName.FreeForAll],
            ],
          },
        ],
      },
      extended: {
        displayName: 'Extended Battle Plans',
        entries: [
          {
            selector: (a, b) => a === BattlePlan.Attack && b === BattlePlan.Attack,
            missions: [
              [MissionName.Counterattack, MissionName.Counterstrike],
              [MissionName.DustUp],
              [MissionName.Encounter],
              [MissionName.FreeForAll],
              [MissionName.Probe],
              [MissionName.ScoutsOut],
            ],
          },
          {
            selector: (a, b) => {
              const plans = new Set([a,b]);
              return plans.has(BattlePlan.Attack) && plans.has(BattlePlan.Maneuver);
            },
            missions: [
              [MissionName.Breakthrough],
              [MissionName.Counterattack, MissionName.Counterstrike],
              [MissionName.Escape],
              [MissionName.FightingWithdrawal, MissionName.CoveringForce],
              [MissionName.Spearpoint, MissionName.Bypass],
              [MissionName.ValleyOfDeath],
            ],
          },
          {
            selector: (a, b) => {
              const plans = new Set([a,b]);
              return plans.has(BattlePlan.Attack) && plans.has(BattlePlan.Defend);
            },
            missions: [
              [MissionName.Bridgehead],
              [MissionName.Dogfight],
              [MissionName.Encirclement, MissionName.HoldThePocket],
              [MissionName.FightingWithdrawal, MissionName.CoveringForce],
              [MissionName.KillingGround, MissionName.ItsATrap],
              [MissionName.NoRetreat],
            ],
          },
          {
            selector: (a, b) => a === BattlePlan.Maneuver && b === BattlePlan.Maneuver,
            missions: [
              [MissionName.Counterattack, MissionName.Counterstrike],
              [MissionName.DustUp],
              [MissionName.Encounter],
              [MissionName.Outflanked, MissionName.Outmaneuvered],
              [MissionName.Probe],
              [MissionName.ScoutsOut],
            ],
          },
          {
            selector: (a, b) => {
              const plans = new Set([a,b]);
              return plans.has(BattlePlan.Maneuver) && plans.has(BattlePlan.Defend);
            },
            missions: [
              [MissionName.Breakthrough],
              [MissionName.Cornered],
              [MissionName.NoRetreat],
              [MissionName.Outflanked, MissionName.Outmaneuvered],
              [MissionName.Spearpoint, MissionName.Bypass],
              [MissionName.ValleyOfDeath],
            ],
          },
          {
            selector: (a, b) => a === BattlePlan.Defend && b === BattlePlan.Defend,
            missions: [
              [MissionName.Breakthrough],
              [MissionName.DustUp],
              [MissionName.Encounter],
              [MissionName.FreeForAll],
              [MissionName.Probe],
              [MissionName.ScoutsOut],
            ],
          },
        ],
      },
    },
  },
} as const;

export const getMissionPackVersionOptions = () => getOptions(missionPackVersions);

export const getMissionPackVersionDisplayName = (
  key: MissionPackVersion,
) => getDisplayName(missionPackVersions, key);
