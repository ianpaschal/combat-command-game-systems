import { ForceDiagramMetadata } from '../types';
import { Faction } from './factions';

export enum ForceDiagram {
  American = 'american',
  Belgian = 'belgian',
  British = 'british',
  French = 'french',
  German = 'german',
}

export const forceDiagrams: Record<ForceDiagram, ForceDiagramMetadata<Faction>> = {
  [ForceDiagram.American]: {
    displayName: 'American',
    faction: Faction.UnitedStates,
  },
  [ForceDiagram.Belgian]: {
    displayName: 'Belgian',
    faction: Faction.Belgium,
  },
  [ForceDiagram.British]: {
    displayName: 'British',
    faction: Faction.GreatBritain,
  },
  [ForceDiagram.French]: {
    displayName: 'French',
    faction: Faction.France,
  },
  [ForceDiagram.German]: {
    displayName: 'German',
    faction: Faction.Germany,
  },
};
