import { SelectOption } from '../../../common';
import { getDisplayName } from '../../../common/_internal';
import { ForceDiagramMetadata } from '../../_shared/types';
import { Alignment } from './alignments';
import { Faction, factions } from './factions';

export enum ForceDiagram {
  American = 'american',
  Belgian = 'belgian',
  British = 'british',
  French = 'french',
  German = 'german',
}

export const forceDiagrams: Record<ForceDiagram, ForceDiagramMetadata<Faction>> = {
  [ForceDiagram.American]: {
    displayName: 'American',
    faction: Faction.UnitedStates,
  },
  [ForceDiagram.Belgian]: {
    displayName: 'Belgian',
    faction: Faction.Belgium,
  },
  [ForceDiagram.British]: {
    displayName: 'British',
    faction: Faction.GreatBritain,
  },
  [ForceDiagram.French]: {
    displayName: 'French',
    faction: Faction.France,
  },
  [ForceDiagram.German]: {
    displayName: 'German',
    faction: Faction.Germany,
  },
};

export type GetForceDiagramOptionsFilters = {
  faction?: Faction;
  alignment?: Alignment;
};

export const getForceDiagramOptions = (filters?: GetForceDiagramOptionsFilters): SelectOption<ForceDiagram>[] => {
  const entries = Object.entries(forceDiagrams) as [ForceDiagram, ForceDiagramMetadata<Faction>][];
  const filtered = filters ? (
    entries.filter(([, fd]) => ((
      filters.faction === undefined || fd.faction === filters.faction
    ) && (
      filters.alignment === undefined || factions[fd.faction].alignment === filters.alignment
    )))
  ) : entries;
  return filtered.map(([key, { displayName }]) => ({
    value: key,
    label: displayName,
  }));
};

export const getForceDiagramDisplayName = (
  key: ForceDiagram,
): string | undefined => getDisplayName(forceDiagrams, key);

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
