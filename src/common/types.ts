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

/**
 * @example
 * ```typescript
 * type FlamesOfWarV4RankingFactor = RankingFactor<typeof StatKey>;
 * ```
 */
export type RankingFactor<T extends Record<string, string>> = {
  [K in keyof T]: `total_${T[K]}` | `average_${T[K]}` | `total_opponent_${T[K]}` | `average_opponent_${T[K]}`
}[keyof T];

export type GameSystemMetadata = GenericMetadata;

export type TournamentPairingMethodMetadata = GenericMetadata;

export type TournamentRoundPhaseMetadata = GenericMetadata;
