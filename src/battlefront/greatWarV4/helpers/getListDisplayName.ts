import { ListData } from '../schema/listData';
import { getAlignmentDisplayAdjective } from '../static/alignments.helpers';
import { getFactionDisplayAdjective } from '../static/factions.helpers';
import { getForceDiagramDisplayName } from '../static/forceDiagrams.helpers';

export const getListDisplayName = (listData?: Partial<ListData>): string => {

  const getPrefix = (): string => {
    const forceDiagram = getForceDiagramDisplayName(listData?.meta?.forceDiagram);
    if (forceDiagram) {
      return forceDiagram;
    }
    const faction = getFactionDisplayAdjective(listData?.meta?.faction);
    if (faction) {
      return faction;
    }
    const alignment = getAlignmentDisplayAdjective(listData?.meta?.alignment);
    if (alignment) {
      return alignment;
    }
    return 'Unknown';
  };

  return `${getPrefix()} Force`;
};
