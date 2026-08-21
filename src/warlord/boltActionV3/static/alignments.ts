import { AlignmentMetadata } from '../types';

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
    displayName: 'Flexible', // Bulgaria, Finland, Italy and Romania can play as Axis or Allies
    displayAdjective: 'Flexible',
    displayPlural: 'Flexible',
  },
} as const;
