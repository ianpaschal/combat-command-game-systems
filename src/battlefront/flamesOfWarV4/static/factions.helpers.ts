import { SelectOption } from '../../../common';
import { getDisplayName } from '../../../common/_internal';
import { FactionMetadata } from '../types';
import { Alignment } from './alignments';
import { Era } from './eras';
import { Faction, factions } from './factions';
import { forceDiagrams } from './forceDiagrams';
import { series } from './series';

export type GetFactionOptionsFilters = {
  alignment?: Alignment | null;
  era?: Era | null;
};

export const getFactionOptions = (
  filters?: GetFactionOptionsFilters,
): SelectOption<Faction>[] => {
  const entries = Object.entries(factions) as [Faction, FactionMetadata<Era, Alignment>][];
  const filtered = filters ? (
    entries.filter(([key, factionMetadata]) => {
      if (filters.era && filters.alignment) {
        if (factionMetadata.alignment[filters.era] !== filters.alignment) {
          return false;
        }
      } else if (filters.era) {
        if (factionMetadata.alignment[filters.era] === undefined) {
          return false;
        }
      } else if (filters.alignment) {
        if (!Object.values(factionMetadata.alignment).some((factionAlignment) => factionAlignment === filters.alignment)) {
          return false;
        }
      }

      const hasForceDiagram = Object.values(forceDiagrams).some((forceDiagram) => {
        if (forceDiagram.faction !== key) {
          return false;
        }
        if (filters.era !== undefined && series[forceDiagram.series].era !== filters.era) {
          return false;
        }
        if (filters.alignment !== undefined) {
          const forceDiagramAlignment = factions[forceDiagram.faction].alignment[series[forceDiagram.series].era];
          if (forceDiagramAlignment !== filters.alignment) {
            return false;
          }
        }
        return true;
      });
      if (!hasForceDiagram) {
        return false;
      }

      return true;
    })
  ) : entries;
  return filtered.map(([key, { displayName }]) => ({
    value: key,
    label: displayName,
  }));
};

export const getFactionDisplayName = (
  key?: string,
): string | undefined => getDisplayName(factions, key as Faction);

export const getFactionDisplayAdjective = (
  key?: string,
): string | undefined => {
  if (!key || !(key in factions)) {
    return undefined;
  }
  return factions[key as Faction].displayAdjective;
};

export const getFactionAlignment = (
  key: string,
  era: Era,
): Alignment | undefined => {
  if (key in factions) {
    return factions[key as Faction].alignment[era];
  }
  return undefined;
};
