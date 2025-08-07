import { getDisplayName, getOptions } from '../../../common/_internal';
import { AlignmentMetadata } from '../../_shared/types';

export enum Alignment {
  Nato = 'nato',
  WarsawPact = 'warsaw_pact',
}

export const alignments: Record<Alignment, AlignmentMetadata> = {
  [Alignment.Nato]: {
    displayName: 'NATO',
  },
  [Alignment.WarsawPact]: {
    displayName: 'Warsaw Pact',
  },
} as const;

export const getAlignmentOptions = () => getOptions(alignments);

export const getAlignmentDisplayName = (
  key: Alignment,
) => getDisplayName(alignments, key);
