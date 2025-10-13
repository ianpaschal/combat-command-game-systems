import { getDisplayName } from '../../../common/_internal';
import { getOptions } from '../../../common/_internal/getOptions';
import { BattlePlan } from '../../_shared/data/battlePlans';
import { MatchOutcomeType } from '../../_shared/data/matchOutcomeTypes';
import { MissionName } from '../../_shared/data/missionNames';
import { MissionPackMetadata } from '../../_shared/types';

export enum MissionPackVersion {
  Apr2023 = '2023_04',
  Jul2024 = '2024_07',
}

export enum MissionMatrix {
  None = 'none',
  Default = 'default',
  Extended = 'extended',
}

export const missionPackVersions: Record<MissionPackVersion, MissionPackMetadata<MissionMatrix>> = {
  [MissionPackVersion.Apr2023]: {
    displayName: 'April 2023',
    publishedAt: '2023-04-01T13:00:00+13:00',
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
      [MissionMatrix.Default]: {
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
      [MissionMatrix.Extended]: {
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
  [MissionPackVersion.Jul2024]: {
    displayName: 'July 2024 (Potential)',
    publishedAt: '2024-07-01T13:00:00+13:00',
    missions: {
      [MissionName.AttackOrDie]: {
        attacker: 'roll',
        firstTurn: 'roll',
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.BiteAndHold]: {
        attacker: 'roll',
        firstTurn: 'roll',
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
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
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Bypass]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        minTurns: 6,
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Collision]: {
        attacker: 'roll',
        firstTurn: 'roll',
        minTurns: 6,
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Confrontation]: {
        attacker: 'roll',
        firstTurn: 'roll',
        minTurns: 6,
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Contact]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Cornered]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
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
      [MissionName.CrossedLines]: {
        attacker: 'roll',
        firstTurn: 'roll',
        victoryConditions: [
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
      [MissionName.Escape]: {
        attacker: 'battle_plan',
        firstTurn: 'defender',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.HeadToHead]: {
        attacker: 'roll',
        firstTurn: 'roll',
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.HighGround]: {
        attacker: 'roll',
        firstTurn: 'roll',
        minTurns: 6,
        victoryConditions: [
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
      [MissionName.KillingGround]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.KingOfTheHill]: {
        attacker: 'roll',
        firstTurn: 'roll',
        minTurns: 6,
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.KnifeFight]: {
        attacker: 'roll',
        firstTurn: 'roll',
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.LockedHorns]: {
        attacker: 'roll',
        firstTurn: 'roll',
        minTurns: 6,
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.NightPatrol]: {
        attacker: 'roll',
        firstTurn: 'roll',
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.NoMansLand]: {
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
      [MissionName.Outflanked]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Rearguard]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Rescue]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Roadblock]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Salient]: {
        attacker: 'roll',
        firstTurn: 'roll',
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
      [MissionName.StraightenTheLine]: {
        attacker: 'roll',
        firstTurn: 'roll',
        victoryConditions: [
          MatchOutcomeType.ObjectiveTaken,
        ],
      },
      [MissionName.Toehold]: {
        attacker: 'battle_plan',
        firstTurn: 'attacker',
        victoryConditions: [
          MatchOutcomeType.AttackRepelled,
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
    },
    matrixes: {
      [MissionMatrix.Default]: {
        displayName: 'Battle Plans',
        entries: [
          {
            selector: (a, b) => a === BattlePlan.Attack && b === BattlePlan.Attack,
            missions: [
              [MissionName.AttackOrDie],
              [MissionName.BiteAndHold],
              [MissionName.CrossedLines],
              [MissionName.HeadToHead],
              [MissionName.KnifeFight],
              [MissionName.StraightenTheLine],
            ],
          },
          {
            selector: (a, b) => {
              const plans = new Set([a,b]);
              return plans.has(BattlePlan.Attack) && plans.has(BattlePlan.Maneuver);
            },
            missions: [
              [MissionName.Breakthrough],
              [MissionName.Bypass],
              [MissionName.Contact],
              [MissionName.Counterattack],
              [MissionName.Rearguard],
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
              [MissionName.HoldThePocket],
              [MissionName.KillingGround],
              [MissionName.NoRetreat],
              [MissionName.Rescue],
            ],
          },
          {
            selector: (a, b) => a === BattlePlan.Maneuver && b === BattlePlan.Maneuver,
            missions: [
              [MissionName.Collision],
              [MissionName.Confrontation],
              [MissionName.HighGround],
              [MissionName.KingOfTheHill],
              [MissionName.LockedHorns],
              [MissionName.ScoutsOut],
            ],
          },
          {
            selector: (a, b) => {
              const plans = new Set([a,b]);
              return plans.has(BattlePlan.Maneuver) && plans.has(BattlePlan.Defend);
            },
            missions: [
              [MissionName.Cornered],
              [MissionName.Escape],
              [MissionName.Outflanked],
              [MissionName.Rearguard],
              [MissionName.Roadblock],
              [MissionName.Toehold],
            ],
          },
          {
            selector: (a, b) => a === BattlePlan.Defend && b === BattlePlan.Defend,
            missions: [
              [MissionName.NightPatrol],
              [MissionName.NightPatrol],
              [MissionName.NoMansLand],
              [MissionName.NoMansLand],
              [MissionName.Salient],
              [MissionName.Salient],
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
