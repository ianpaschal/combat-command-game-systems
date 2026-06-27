import { AlignmentMetadata } from '../../_shared/types';

export enum Alignment {
  Nato = 'nato',
  WarsawPact = 'warsaw_pact',
  Flexible = 'flexible',
}

export const alignments: Record<Alignment, AlignmentMetadata> = {
  [Alignment.Nato]: {
    displayName: 'NATO',
  },
  [Alignment.WarsawPact]: {
    displayName: 'Warsaw Pact',
  },
  [Alignment.Flexible]: {
    displayName: 'Flexible',
  },
} as const;
