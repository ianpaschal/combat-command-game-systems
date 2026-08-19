import { MissionMetadata } from '../types';
import { MissionType } from './missionTypes';

export enum Mission {
  Breakthrough = 'breakthrough',
  Custom = 'custom',
  Demolition = 'demolition',
  Envelopment = 'envelopment',
  HoldUntilRelieved = 'hold_until_relieved',
  KeyPositions = 'key_positions',
  LandGrab = 'land_grab',
  Manhunt = 'manhunt',
  PointDefense = 'point_defense',
  SeekDestroy = 'seek_destroy',
  Surrounded = 'surrounded',
  TopSecret = 'top_secret',
}

export const missions: Record<Mission, MissionMetadata> = {
  [Mission.Breakthrough]: {
    displayName: 'Breakthrough',
    type: MissionType.Battle,
  },
  [Mission.Custom]: {
    displayName: 'Custom',
    type: MissionType.Custom,
  },
  [Mission.Demolition]: {
    displayName: 'Demolition',
    type: MissionType.Battle,
  },
  [Mission.Envelopment]: {
    displayName: 'Envelopment',
    type: MissionType.Story,
  },
  [Mission.HoldUntilRelieved]: {
    displayName: 'Hold Until Relieved',
    type: MissionType.Battle,
  },
  [Mission.KeyPositions]: {
    displayName: 'Key Positions',
    type: MissionType.Battle,
  },
  [Mission.LandGrab]: {
    displayName: 'Land Grab',
    type: MissionType.Story,
  },
  [Mission.Manhunt]: {
    displayName: 'Manhunt',
    type: MissionType.Story,
  },
  [Mission.PointDefense]: {
    displayName: 'Point Defense',
    type: MissionType.Story,
  },
  [Mission.SeekDestroy]: {
    displayName: 'Seek and Destroy',
    type: MissionType.Battle,
  },
  [Mission.Surrounded]: {
    displayName: 'Surrounded',
    type: MissionType.Story,
  },
  [Mission.TopSecret]: {
    displayName: 'Top Secret',
    type: MissionType.Battle,
  },
} as const;
