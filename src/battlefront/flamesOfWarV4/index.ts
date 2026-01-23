// Shared Battlefront System data & types
// Re-exported here so that it's possible to import only a single game system.
export * from '../_shared/helpers/calculateMatchResultAttacker';
export * from '../_shared/helpers/calculateMatchResultFirstTurn';
export * from '../_shared/helpers/calculateMatchResultScore';
export * from '../_shared/helpers/calculateMatchResultWinner';
export * from '../_shared/helpers/extractMatchResultStats';
export * from '../_shared/static/battlePlans';
export * from '../_shared/static/matchOutcomeTypes';
export * from '../_shared/static/missionNames';
export * from '../_shared/static/rankingFactors';
export type * from '../_shared/types';

// Flames of War, 4th Edition
export * from './helpers/getValidGameSystemConfig';
export * from './helpers/getValidMatchResultDetails';
export * from './helpers/isGameSystemConfigValid';
export * from './helpers/isMatchResultDetailsValid';
export * from './schema/gameSystemConfig';
export * from './schema/matchResultDetails';
export * from './schema/registrationDetails';
export * from './static/alignments';
export * from './static/dynamicPointsVersions';
export * from './static/eras';
export * from './static/factions';
export * from './static/forceDiagrams';
export * from './static/lessonsFromTheFrontVersions';
export * from './static/missionPackUtils';
export * from './static/missionPackVersions';
export * from './static/series';
export * from './static/units';
export type * from './types';
