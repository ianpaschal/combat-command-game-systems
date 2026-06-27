import { GenericMetadata, GenericPublicationMetadata } from '../../common/types';

export type FieldManual101VersionMetadata = GenericPublicationMetadata;

export type FactionMetadata<TEra extends string, TAlignment extends string> = GenericMetadata & {
  alignment: Partial<Record<TEra, TAlignment>>;
};

export type ForceDiagramMetadata<TFaction extends string, TSeries extends string> = GenericMetadata & {
  faction: TFaction;
  series: TSeries;
};
