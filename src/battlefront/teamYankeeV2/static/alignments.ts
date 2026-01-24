import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
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

export const getAlignmentOptions = (): SelectOption<Alignment>[] => getOptions(alignments);

export const getAlignmentDisplayName = (
  key: Alignment,
): string | undefined => getDisplayName(alignments, key);
