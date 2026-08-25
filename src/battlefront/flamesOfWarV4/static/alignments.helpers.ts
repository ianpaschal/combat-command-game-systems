import { SelectOption } from '../../../common';
import { getDisplayAdjective, getDisplayName } from '../../../common/_internal';
import { Alignment, alignments } from './alignments';
import { Era } from './eras';
import { getFactionOptions } from './factions.helpers';

export type GetAlignmentOptionsFilters = {
  era?: Era | null;
};

/**
 * Only returns alignments that have at least one selectable faction for the
 * given era, so e.g. an alignment with no factions at all never appears as a
 * dead-end choice.
 */
export const getAlignmentOptions = (
  filters?: GetAlignmentOptionsFilters,
): SelectOption<Alignment>[] => {
  const era = filters?.era ?? undefined;
  return (Object.keys(alignments) as Alignment[])
    .filter((alignment) => getFactionOptions({ alignment, era }).length > 0)
    .map((alignment) => ({
      value: alignment,
      label: alignments[alignment].displayName,
    }));
};

export const getAlignmentDisplayName = (
  key?: string,
): string | undefined => getDisplayName(alignments, key as Alignment);

export const getAlignmentDisplayAdjective = (
  key?: string,
): string | undefined => getDisplayAdjective(alignments, key as Alignment);
