import { SelectOption } from '../../../common';
import { getDisplayName } from '../../../common/_internal';
import { Alignment } from './alignments';
import { Faction, factions } from './factions';
import { ForceDiagram, forceDiagrams } from './forceDiagrams';

export type GetForceDiagramOptionsFilters = {
  faction?: Faction | null;
  alignment?: Alignment | null;
};

export const getForceDiagramOptions = (filters?: GetForceDiagramOptionsFilters): SelectOption<ForceDiagram>[] => {
  const entries = Object.entries(forceDiagrams) as [ForceDiagram, { faction: Faction; displayName: string }][];
  const filtered = filters ? (
    entries.filter(([, forceDiagram]) => ((
      filters.faction === undefined || forceDiagram.faction === filters.faction
    ) && (
      filters.alignment === undefined || factions[forceDiagram.faction].alignment === filters.alignment
    )))
  ) : entries;
  return filtered.map(([key, { displayName }]) => ({
    value: key,
    label: displayName,
  }));
};

export const getForceDiagramDisplayName = (
  key?: string,
): string | undefined => getDisplayName(forceDiagrams, key as ForceDiagram);

export const getForceDiagramFaction = (
  key?: string,
): Faction | undefined => {
  if (key && key in forceDiagrams) {
    return forceDiagrams[key as ForceDiagram].faction;
  }
  return undefined;
};

export const getForceDiagramAlignment = (
  key?: string,
): Alignment | undefined => {
  const faction = getForceDiagramFaction(key);
  return faction ? factions[faction].alignment : undefined;
};
