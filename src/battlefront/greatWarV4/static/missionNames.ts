import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { MissionNameMetadata } from '../types';

export enum MissionName {
  Annihilation = 'annihilation',
  Bridgehead = 'bridgehead',
  Breakthrough = 'breakthrough',
  Counterattack = 'counterattack',
  DustUp = 'dust_up',
  Encounter = 'encounter',
  HastyAttack = 'hasty_attack',
  NoMansLand = 'no_mans_land',
  NoRetreat = 'no_retreat',
  Rearguard = 'rearguard',
  TheBigGreenFieldsBeyond = 'the_big_green_fields_beyond',
  TheBigPush = 'the_big_push',
  ThroughTheMudAndBlood = 'through_the_mud_and_blood',
}

export const missionNames: Record<MissionName, MissionNameMetadata> = {
  [MissionName.Annihilation]: {
    displayName: 'Annihilation',
  },
  [MissionName.Breakthrough]: {
    displayName: 'Breakthrough',
  },
  [MissionName.Bridgehead]: {
    displayName: 'Bridgehead',
  },
  [MissionName.Counterattack]: {
    displayName: 'Counterattack',
  },
  [MissionName.DustUp]: {
    displayName: 'Dust-Up',
  },
  [MissionName.Encounter]: {
    displayName: 'Encounter',
  },
  [MissionName.HastyAttack]: {
    displayName: 'Hasty Attack',
  },
  [MissionName.NoMansLand]: {
    displayName: 'No-Man’s Land',
  },
  [MissionName.NoRetreat]: {
    displayName: 'No Retreat',
  },
  [MissionName.Rearguard]: {
    displayName: 'Rearguard',
  },
  [MissionName.TheBigGreenFieldsBeyond]: {
    displayName: 'The Big Green Fields Beyond',
  },
  [MissionName.TheBigPush]: {
    displayName: 'The Big Push',
  },
  [MissionName.ThroughTheMudAndBlood]: {
    displayName: 'Through the Mud and Blood',
  },
} as const;

export const getMissionNameOptions = (): SelectOption<MissionName>[] => getOptions(missionNames);

export const getMissionDisplayName = (
  key?: MissionName,
): string | undefined => getDisplayName(missionNames, key);
