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
export type ExtendedRankingFactor<T extends string> = `total_${T}` | `average_${T}` | `total_opponent_${T}` | `average_opponent_${T}`;

export type GameSystemMetadata = GenericMetadata;

export type TournamentPairingMethodMetadata = GenericMetadata;

export type TournamentRoundPhaseMetadata = GenericMetadata;
