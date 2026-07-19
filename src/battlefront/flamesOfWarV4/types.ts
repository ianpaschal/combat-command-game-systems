import { GenericMetadata, GenericPublicationMetadata } from '../../common/types';

export type LessonsFromTheFrontVersionMetadata = GenericPublicationMetadata;

export type FactionMetadata<TEra extends string, TAlignment extends string> = GenericMetadata & {
  alignment: Partial<Record<TEra, TAlignment>>;
  displayAdjective: string;
  displayPlural: string;
};

export type ForceDiagramMetadata<TFaction extends string, TSeries extends string> = GenericMetadata & {
  faction: TFaction;
  series: TSeries;
};
