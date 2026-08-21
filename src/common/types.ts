import { z } from 'zod';

import { TournamentPairingConfig } from './schemas/tournamentPairingConfig';
import { GameSystem } from './static/gameSystems';
import * as FlamesOfWarV4 from '../battlefront/flamesOfWarV4';
import * as GreatWarV4 from '../battlefront/greatWarV4';
import * as TeamYankeeV2 from '../battlefront/teamYankeeV2';
import * as BoltActionV3 from '../warlord/boltActionV3';

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

/**
 * Options a caller passes when asking a game system for its config's default
 * values or schema. Each game system decides for itself which options (if
 * any) it acts on; a caller that doesn't apply doesn't need to do anything.
 */
export interface GameSystemConfigOptions {
  tournament?: boolean;
}

export type GameSystemConfigByGameSystem = {
  [GameSystem.BoltActionV3]: BoltActionV3.GameSystemConfig;
  [GameSystem.FlamesOfWarV4]: FlamesOfWarV4.GameSystemConfig;
  [GameSystem.GreatWarV4]: GreatWarV4.GameSystemConfig;
  [GameSystem.TeamYankeeV2]: TeamYankeeV2.GameSystemConfig;
};

export type TournamentPairingMethodMetadata = GenericMetadata & {
  schema: z.ZodType<TournamentPairingConfig>,
  values: TournamentPairingConfig,
};

export type TournamentPairingOrderMethodMetadata = GenericMetadata;

export type TournamentPairingPolicyMetadata = GenericMetadata;

export type TournamentRoundPhaseMetadata = GenericMetadata;

export type ValidationIssue = {
  path: (string | number)[];
  message: string;
};

export type ValidateListDataResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  issues: ValidationIssue[];
};

export type Winner = -1 | 0 | 1;
