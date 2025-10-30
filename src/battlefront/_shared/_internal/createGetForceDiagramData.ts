import {
  AlignmentMetadata,
  FactionMetadata,
  ForceDiagramMetadata,
  SeriesMetadata,
} from '../types';

/**
 * @deprecated
 */
export const createGetDiagramData = <
  TAlignment extends string,
  TEra extends string,
  TFaction extends string,
  TForceDiagram extends string,
  TSeries extends string,
>(
  alignments: Record<TAlignment, AlignmentMetadata>,
  factions: Record<TFaction, FactionMetadata<TAlignment>>,
  forceDiagrams: Record<TForceDiagram, ForceDiagramMetadata<TFaction, TSeries>>,
  series: Record<TSeries, SeriesMetadata<TEra>>,
) => (
  forceDiagram: TForceDiagram,
): {
  id: string;
  alignment: TAlignment;
  alignmentDisplayName: string;
  displayName: string;
  faction: TFaction;
  factionDisplayName: string;
  series: TSeries;
  seriesDisplayName: string;
} => {
  const data = forceDiagrams[forceDiagram];
  return {
    alignment: factions[data.faction].alignment,
    alignmentDisplayName: alignments[factions[data.faction].alignment].displayName,
    displayName: data.displayName,
    faction: data.faction,
    factionDisplayName: factions[data.faction].displayName,
    id: forceDiagram,
    series: data.series,
    seriesDisplayName: series[data.series].displayName,
  };
};
