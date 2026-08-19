import { MissionType } from './static/missionTypes';
import { GenericMetadata } from '../../common';

export type AlignmentMetadata = GenericMetadata & {
  displayAdjective: string;
  displayPlural: string;
};

export type DeploymentTypeMetadata = GenericMetadata;

export type DeploymentZoneMetadata = GenericMetadata;

export type FactionMetadata<TAlignment extends string> = GenericMetadata & {
  alignment: TAlignment;
  displayAdjective: string;
  displayPlural: string;
};

/**
 * A Bolt Action army is built as one or more reinforced platoons, each taken
 * from a selector, rather than as formations from a force diagram.
 */
export type ListDataPlatoon<TSourceId extends string> = {
  id: string;
  sourceId: TSourceId;
};

export type ListDataUnit<TSourceId extends string> = {
  id: string;
  sourceId: TSourceId;
  platoonId: string;
  slotId: string;
};

export type MissionMetadata = GenericMetadata & {
  type: MissionType;
};

export type MissionTypeMetadata = GenericMetadata;

export type RankingFactorMetadata = GenericMetadata & {
  desirability: 'higher' | 'lower'; // If two opponents are tied, does the tie breaker go to the higher or lower value?
  shortName: string;
};

export type OfficerOutcomeMetadata = GenericMetadata;
