import { getDisplayAdjective, getDisplayName } from '../../../common/_internal';

export type GetListDisplayNameContext = {
  forceDiagrams: Record<string, { displayName: string }>;
  factions: Record<string, { displayAdjective: string }>;
  alignments: Record<string, { displayAdjective: string }>;
};

/**
 * Factory that builds a function to derive a list's display name, falling back from force
 * diagram to faction to alignment to `'Unknown'`.
 *
 * @param context - Static game-system data (force diagrams, factions, alignments)
 * @returns Function that returns a list's display name
 */
export const createGetListDisplayName = <
  TListData extends { meta?: { forceDiagram?: string; faction?: string; alignment?: string } },
>(
  context: GetListDisplayNameContext,
) => (listData?: Partial<TListData>): string => {

  const getPrefix = (): string => {
    const forceDiagram = getDisplayName(context.forceDiagrams, listData?.meta?.forceDiagram);
    if (forceDiagram) {
      return forceDiagram;
    }
    const faction = getDisplayAdjective(context.factions, listData?.meta?.faction);
    if (faction) {
      return faction;
    }
    const alignment = getDisplayAdjective(context.alignments, listData?.meta?.alignment);
    if (alignment) {
      return alignment;
    }
    return 'Unknown';
  };

  return `${getPrefix()} Force`;
};
