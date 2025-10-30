import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { MissionNameMetadata } from '../types';

export enum MissionName {
  Annihilation = 'annihilation',
  AttackOrDie = 'attack_or_die',
  BiteAndHold = 'bite_and_hold',
  Breakthrough = 'breakthrough',
  Bridgehead = 'bridgehead',
  Bypass = 'bypass',
  Collision = 'collision',
  Confrontation = 'confrontation',
  Contact = 'contact',
  Cornered = 'cornered',
  Counterattack = 'counterattack',
  Counterstrike = 'counterstrike',
  CoveringForce = 'covering_force',
  CrossedLines = 'crossedLines',
  Dogfight = 'dogfight',
  DustUp = 'dust_up',
  Encirclement = 'encirclement',
  Encounter = 'encounter',
  Escape = 'escape',
  FightingWithdrawal = 'fighting_withdrawal',
  FreeForAll = 'free_for_all',
  Gauntlet = 'gauntlet',
  HeadToHead = 'head_to_head',
  HighGround = 'high_ground',
  HoldThePocket = 'hold_the_pocket',
  ItsATrap = 'its_a_trap',
  KillingGround = 'killing_ground',
  KingOfTheHill = 'king_of_the_hill',
  KnifeFight = 'knife_fight',
  LockedHorns = 'locked_horns',
  NightPatrol = 'night_patrol',
  NoMansLand = 'no_mans_land',
  NoRetreat = 'no_retreat',
  Outflanked = 'outflanked',
  Outmaneuvered = 'outmaneuvered',
  Probe = 'probe',
  Rearguard = 'rearguard',
  Rescue = 'rescue',
  Roadblock = 'roadblock',
  Salient = 'salient',
  ScoutsOut = 'scouts_out',
  Spearpoint = 'spearpoint',
  StraightenTheLine = 'straighten_the_line',
  Toehold = 'toehold',
  ValleyOfDeath = 'valley_of_death',
  Vanguard = 'vanguard',
}

export const missionNames: Record<MissionName, MissionNameMetadata> = {
  [MissionName.Annihilation]: {
    displayName: 'Annihilation',
  },
  [MissionName.AttackOrDie]: {
    displayName: 'Attack or Die',
  },
  [MissionName.BiteAndHold]: {
    displayName: 'Bite and Hold',
  },
  [MissionName.Breakthrough]: {
    displayName: 'Breakthrough',
  },
  [MissionName.Bridgehead]: {
    displayName: 'Bridgehead',
  },
  [MissionName.Bypass]: {
    displayName: 'Bypass',
  },
  [MissionName.Collision]: {
    displayName: 'Collision',
  },
  [MissionName.Confrontation]: {
    displayName: 'Confrontation',
  },
  [MissionName.Contact]: {
    displayName: 'Contact',
  },
  [MissionName.Cornered]: {
    displayName: 'Cornered',
  },
  [MissionName.Counterattack]: {
    displayName: 'Counterattack',
  },
  [MissionName.Counterstrike]: {
    displayName: 'Counterstrike',
  },
  [MissionName.CoveringForce]: {
    displayName: 'Covering Force',
  },
  [MissionName.CrossedLines]: {
    displayName: 'Crossed Lines',
  },
  [MissionName.Dogfight]: {
    displayName: 'Dogfight',
  },
  [MissionName.DustUp]: {
    displayName: 'Dust-Up',
  },
  [MissionName.Encirclement]: {
    displayName: 'Encirclement',
  },
  [MissionName.Encounter]: {
    displayName: 'Encounter',
  },
  [MissionName.Escape]: {
    displayName: 'Escape',
  },
  [MissionName.FightingWithdrawal]: {
    displayName: 'Fighting Withdrawal',
  },
  [MissionName.FreeForAll]: {
    displayName: 'Free for All',
  },
  [MissionName.Gauntlet]: {
    displayName: 'Gauntlet',
  },
  [MissionName.HeadToHead]: {
    displayName: 'Head to Head',
  },
  [MissionName.HighGround]: {
    displayName: 'High Ground',
  },
  [MissionName.HoldThePocket]: {
    displayName: 'Hold the Pocket',
  },
  [MissionName.ItsATrap]: {
    displayName: 'It’s a Trap',
  },
  [MissionName.KillingGround]: {
    displayName: 'Killing Ground',
  },
  [MissionName.KingOfTheHill]: {
    displayName: 'King of the Hill',
  },
  [MissionName.KnifeFight]: {
    displayName: 'Knife Fight',
  },
  [MissionName.LockedHorns]: {
    displayName: 'Locked Horns',
  },
  [MissionName.NightPatrol]: {
    displayName: 'Night Patrol',
  },
  [MissionName.NoMansLand]: {
    displayName: 'No-Man’s Land',
  },
  [MissionName.NoRetreat]: {
    displayName: 'No Retreat',
  },
  [MissionName.Outflanked]: {
    displayName: 'Outflanked',
  },
  [MissionName.Outmaneuvered]: {
    displayName: 'Outmaneuvered',
  },
  [MissionName.Probe]: {
    displayName: 'Probe',
  },
  [MissionName.Rearguard]: {
    displayName: 'Rearguard',
  },
  [MissionName.Rescue]: {
    displayName: 'Rescue',
  },
  [MissionName.Roadblock]: {
    displayName: 'Roadblock',
  },
  [MissionName.Salient]: {
    displayName: 'Salient',
  },
  [MissionName.ScoutsOut]: {
    displayName: 'Scouts Out',
  },
  [MissionName.Spearpoint]: {
    displayName: 'Spearpoint',
  },
  [MissionName.StraightenTheLine]: {
    displayName: 'Straighten the Line',
  },
  [MissionName.Toehold]: {
    displayName: 'Toehold',
  },
  [MissionName.ValleyOfDeath]: {
    displayName: 'Valley of Death',
  },
  [MissionName.Vanguard]: {
    displayName: 'Vanguard',
  },
} as const;

export const getMissionNameOptions = (): SelectOption<MissionName>[] => getOptions(missionNames);

export const getMissionDisplayName = (
  key?: MissionName,
): string | undefined => getDisplayName(missionNames, key);
