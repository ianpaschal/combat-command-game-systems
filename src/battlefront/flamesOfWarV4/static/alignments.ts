import { AlignmentMetadata } from '../../_shared/types';

export enum Alignment {
  Allies = 'allies',
  Axis = 'axis',
  Flexible = 'flexible',
}

export const alignments: Record<Alignment, AlignmentMetadata> = {
  [Alignment.Allies]: {
    displayName: 'Allies',
    displayAdjective: 'Allied',
    displayPlural: 'Allies',
  },
  [Alignment.Axis]: {
    displayName: 'Axis',
    displayAdjective: 'Axis',
    displayPlural: 'Axis',
  },
  [Alignment.Flexible]: {
    displayName: 'Flexible', // Romania, Finland, Italy can play as Axis or Allies
    displayAdjective: 'Flexible',
    displayPlural: 'Flexible',
  },
} as const;
