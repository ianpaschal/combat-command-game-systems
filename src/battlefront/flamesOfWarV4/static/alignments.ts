import { AlignmentMetadata } from '../../_shared/types';

export enum Alignment {
  Allies = 'allies',
  Axis = 'axis',
  Flexible = 'flexible',
}

export const alignments: Record<Alignment, AlignmentMetadata> = {
  [Alignment.Allies]: {
    displayName: 'Allies',
  },
  [Alignment.Axis]: {
    displayName: 'Axis',
  },
  [Alignment.Flexible]: {
    displayName: 'Flexible', // Romania, Finland, Italy can play as Axis or Allies
  },
} as const;
