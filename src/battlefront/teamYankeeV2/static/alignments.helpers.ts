import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { Alignment, alignments } from './alignments';

export const getAlignmentOptions = (): SelectOption<Alignment>[] => getOptions(alignments);

export const getAlignmentDisplayName = (
  key?: string,
): string | undefined => getDisplayName(alignments, key as Alignment);

export const getAlignmentDisplayAdjective = (
  key?: string,
): string | undefined => {
  if (!key || !(key in alignments)) {
    return undefined;
  }
  return alignments[key as Alignment].displayAdjective;
};
