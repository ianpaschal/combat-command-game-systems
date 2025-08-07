import { getDisplayName, getOptions } from '../../../common/_internal';
import { AlignmentMetadata } from '../../_shared/types';

export enum Alignment {
  Allies = 'allies',
  Axis = 'axis',
}

export const alignments: Record<Alignment, AlignmentMetadata> = {
  [Alignment.Allies]: {
    displayName: 'Allies',
  },
  [Alignment.Axis]: {
    displayName: 'Axis',
  },
} as const;

export const getAlignmentOptions = () => getOptions(alignments);

export const getAlignmentDisplayName = (
  key: Alignment,
) => getDisplayName(alignments, key);
