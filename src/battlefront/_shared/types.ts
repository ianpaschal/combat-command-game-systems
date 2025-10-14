import { BattlePlan } from './static/battlePlans';
import { MatchOutcomeType } from './static/matchOutcomeTypes';
import { MissionName } from './static/missionNames';
import { GenericMetadata, GenericPublicationMetadata } from '../../common/types';

export type AlignmentMetadata = GenericMetadata;

export type BattlePlanMetadata = GenericMetadata;

export type DynamicPointsVersionMetadata<TEra extends string> = GenericPublicationMetadata & {
  activeAt: string;
  era: TEra;
};

export type EraMetadata = GenericMetadata & {
  shortName: string;
};

export type FactionMetadata<TAlignment extends string> = GenericMetadata & {
  alignment: TAlignment;
};

export type ForceDiagramMetadata<TFaction extends string, TSeries extends string> = GenericMetadata & {
  faction: TFaction;
  series: TSeries;
};

export type MatchOutcomeTypeMetadata = GenericMetadata;

export type MatrixData = GenericMetadata & {
  entries: {
    selector: (a: BattlePlan | undefined, b: BattlePlan | undefined) => boolean;
    missions: MissionName[][];
  }[];
};

export type MissionData = {
  attacker: 'battle_plan' | 'roll';
  firstTurn: 'attacker' | 'defender' | 'roll';
  minTurns?: number;
  victoryConditions: MatchOutcomeType[];
};

export type MissionNameMetadata = GenericMetadata;

export type MissionPackMetadata<TMissionMatrix extends string> = GenericPublicationMetadata & {
  missions: Partial<Record<MissionName, MissionData>>;
  matrixes: Partial<Record<TMissionMatrix, MatrixData>>;
};

export type RankingFactorMetadata = GenericMetadata & {
  desirability: 'higher' | 'lower'; // If two opponents are tied, does the tie breaker go to the higher or lower value?
  shortName: string;
};

export type SeriesMetadata<TEra extends string> = GenericMetadata & {
  era: TEra;
};

export type UnitMetadata<TForceDiagram extends string> = GenericMetadata & {
  sourceForceDiagram: TForceDiagram;
  isFormation?: boolean;
};
