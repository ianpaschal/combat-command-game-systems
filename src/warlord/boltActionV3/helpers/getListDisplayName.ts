import { getDisplayAdjective } from '../../../common/_internal';
import { ListData } from '../schema/listData';
import { alignments } from '../static/alignments';
import { factions } from '../static/factions';

/**
 * Derives a list's display name, falling back from faction to alignment to
 * `'Unknown'`.
 *
 * @remarks
 * The Battlefront systems lead with the force diagram's name, but Bolt Action
 * has no force diagrams, so the faction is the most specific thing a list
 * carries.
 *
 * @param listData - The list to name
 * @returns The list's display name
 */
export const getListDisplayName = (listData?: Partial<ListData>): string => {
  const getPrefix = (): string => {
    const faction = getDisplayAdjective(factions, listData?.meta?.faction);
    if (faction) {
      return faction;
    }
    const alignment = getDisplayAdjective(alignments, listData?.meta?.alignment);
    if (alignment) {
      return alignment;
    }
    return 'Unknown';
  };

  return `${getPrefix()} Force`;
};
