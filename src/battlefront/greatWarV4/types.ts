import { MissionName } from './static/missionNames';
import { GenericMetadata, GenericPublicationMetadata } from '../../common';
import { MatchOutcomeType } from '../_shared/static/matchOutcomeTypes';
import { DynamicPointsVersionMetadata as GenericPointsVersionMetadata } from '../_shared/types';

export type PointsVersionMetadata = Omit<GenericPointsVersionMetadata<string>, 'era'>;

export type MissionData = {
  firstTurn: 'attacker' | 'defender';
  minTurns?: number;
  victoryConditions: MatchOutcomeType[];
};

export type MissionNameMetadata = GenericMetadata;

export type MissionPackMetadata = GenericPublicationMetadata & {
  missions: Partial<Record<MissionName, MissionData>>;
};

export type FactionMetadata<TAlignment extends string> = GenericMetadata & {
  alignment: TAlignment;
  displayAdjective: string;
  displayPlural: string;
};

export type ForceDiagramMetadata<TFaction extends string, TSeries extends string = string> = GenericMetadata & {
  faction: TFaction;
  series?: TSeries;
};
