import { SelectOption } from '../../../common';
import { getDisplayName } from '../../../common/_internal';
import { Alignment } from './alignments';
import { Era } from './eras';
import { Faction, factions } from './factions';
import { ForceDiagram, forceDiagrams } from './forceDiagrams';
import { Series, series } from './series';

export type GetForceDiagramOptionsFilters = {
  alignment?: Alignment | null;
  era?: Era | null;
  faction?: Faction | null;
  series?: Series | null;
};

export const getForceDiagramOptions = (
  filters?: GetForceDiagramOptionsFilters,
): SelectOption<ForceDiagram>[] => {
  const entries = Object.entries(forceDiagrams) as [ForceDiagram, {
    faction: Faction;
    series: Series;
    displayName: string;
  }][];
  const filtered = filters ? (
    entries.filter(([, { faction, series: diagramSeries }]) => {
      const alignment = factions[faction].alignment[series[diagramSeries].era];
      return (
        filters.faction == null || faction === filters.faction
      ) && (
        filters.alignment == null || alignment === filters.alignment
      ) && (
        filters.series == null || diagramSeries === filters.series
      ) && (
        filters.era == null || series[diagramSeries].era === filters.era
      );
    })) : entries;
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

export const getForceDiagramSeries = (
  key?: string,
): Series | undefined => {
  if (key && key in forceDiagrams) {
    return forceDiagrams[key as ForceDiagram].series;
  }
  return undefined;
};

export const getForceDiagramEra = (
  key?: string,
): Era | undefined => {
  const s = getForceDiagramSeries(key);
  return s ? series[s].era : undefined;
};

export const getForceDiagramAlignment = (
  key?: string,
): Alignment | undefined => {
  const faction = getForceDiagramFaction(key);
  const era = getForceDiagramEra(key);
  if (!faction || !era) {
    return undefined;
  }
  return factions[faction].alignment[era as Era] ?? undefined;
};
