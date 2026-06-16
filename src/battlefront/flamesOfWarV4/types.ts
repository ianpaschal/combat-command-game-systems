import { GenericMetadata, GenericPublicationMetadata } from '../../common/types';

export type LessonsFromTheFrontVersionMetadata = GenericPublicationMetadata;

export type FactionMetadata<TEra extends string, TAlignment extends string> = GenericMetadata & {
  alignment: Partial<Record<TEra, TAlignment>>;
};
