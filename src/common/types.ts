export interface GenericMetadata {
  displayName: string;
}

export interface GenericPublicationMetadata {
  displayName: string;

  /**
   * Publication date & time in ISO format
   */
  publishedAt: string;
}

export type SelectOption<T> = {
  value: T;
  label: string;
};

export type GameSystemMetadata = GenericMetadata;

export type TournamentPairingMethodMetadata = GenericMetadata;

export type TournamentRoundPhaseMetadata = GenericMetadata;
