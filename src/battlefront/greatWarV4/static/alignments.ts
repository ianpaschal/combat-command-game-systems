import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { AlignmentMetadata } from '../../_shared/types';

export enum Alignment {
  AlliedPowers = 'allied_powers',
  CentralPowers = 'central_powers',
}

export const alignments: Record<Alignment, AlignmentMetadata> = {
  [Alignment.AlliedPowers]: {
    displayName: 'Allied Powers',
  },
  [Alignment.CentralPowers]: {
    displayName: 'Central Powers',
  },
} as const;

export const getAlignmentOptions = (): SelectOption<Alignment>[] => getOptions(alignments);

export const getAlignmentDisplayName = (
  key: Alignment,
): string | undefined => getDisplayName(alignments, key);
