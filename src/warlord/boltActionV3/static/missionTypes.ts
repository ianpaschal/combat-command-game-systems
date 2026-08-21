import { MissionTypeMetadata } from '../types';

export enum MissionType {
  Battle = 'battle',
  Custom = 'custom',
  Story = 'story',
}

export const missionTypes: Record<MissionType, MissionTypeMetadata> = {
  [MissionType.Battle]: {
    displayName: 'Battle',
  },
  [MissionType.Custom]: {
    displayName: 'Custom',
  },
  [MissionType.Story]: {
    displayName: 'Story',
  },
} as const;
