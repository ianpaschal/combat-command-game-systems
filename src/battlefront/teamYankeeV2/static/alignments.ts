import { AlignmentMetadata } from '../../_shared/types';

export enum Alignment {
  Nato = 'nato',
  WarsawPact = 'warsaw_pact',
  Flexible = 'flexible',
}

export const alignments: Record<Alignment, AlignmentMetadata> = {
  [Alignment.Nato]: {
    displayName: 'NATO',
    displayAdjective: 'NATO',
    displayPlural: 'NATO',
  },
  [Alignment.WarsawPact]: {
    displayName: 'Warsaw Pact',
    displayAdjective: 'Warsaw Pact',
    displayPlural: 'Warsaw Pact',
  },
  [Alignment.Flexible]: {
    displayName: 'Flexible',
    displayAdjective: 'Flexible',
    displayPlural: 'Flexible',
  },
} as const;
