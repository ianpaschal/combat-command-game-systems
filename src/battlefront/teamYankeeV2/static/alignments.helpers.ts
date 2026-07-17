import { SelectOption } from '../../../common';
import {
  getDisplayAdjective,
  getDisplayName,
  getOptions,
} from '../../../common/_internal';
import { Alignment, alignments } from './alignments';

export const getAlignmentOptions = (): SelectOption<Alignment>[] => getOptions(alignments);

export const getAlignmentDisplayName = (
  key?: string,
): string | undefined => getDisplayName(alignments, key as Alignment);

export const getAlignmentDisplayAdjective = (
  key?: string,
): string | undefined => getDisplayAdjective(alignments, key as Alignment);
