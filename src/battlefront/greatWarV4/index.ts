// Shared Battlefront System data & types
// Re-exported here so that it's possible to import only a single game system.
export * from '../_shared/helpers/calculateMatchResultAttacker';
export * from '../_shared/helpers/calculateMatchResultFirstTurn';
export * from '../_shared/helpers/calculateMatchResultScore';
export * from '../_shared/helpers/calculateMatchResultWinner';
export * from '../_shared/helpers/extractMatchResultStats';
export * from '../_shared/static/battlePlans';
export * from '../_shared/static/matchOutcomeTypes';
export * from '../_shared/static/rankingFactors';
export type {
  AlignmentMetadata,
  BattlePlanMetadata,
  MatchOutcomeTypeMetadata,
  RankingFactorMetadata,
  UnitMetadata,
} from '../_shared/types';
export * from './static/missionNames';
export * from './static/missionNames.helpers';

// Great War, 4th Edition
export * from './helpers/getListDisplayName';
export * from './schema/gameSystemConfig';
export * from './schema/listData';
export * from './schema/matchResultDetails';
export * from './static/alignments';
export * from './static/alignments.helpers';
export * from './static/factions';
export * from './static/factions.helpers';
export * from './static/forceDiagrams';
export * from './static/forceDiagrams.helpers';
export * from './static/missionPackUtils';
export * from './static/missionPackVersions';
export * from './static/missionPackVersions.helpers';
export * from './static/pointsVersions';
export * from './static/pointsVersions.helpers';
export * from './static/units';
export * from './static/units.helpers';
export type * from './types';
