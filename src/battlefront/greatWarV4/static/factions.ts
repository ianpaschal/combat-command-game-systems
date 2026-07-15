import { FactionMetadata } from '../types';
import { Alignment } from './alignments';

export enum Faction {
  Belgium = 'belgium',
  France = 'france',
  Germany = 'germany',
  GreatBritain = 'great_britain',
  UnitedStates = 'united_states',
}

export const factions: Record<Faction, FactionMetadata<Alignment>> = {
  [Faction.Belgium]: {
    displayName: 'Belgium',
    displayAdjective: 'Belgian',
    displayPlural: 'Belgians',
    alignment: Alignment.AlliedPowers,
  },
  [Faction.France]: {
    displayName: 'France',
    displayAdjective: 'French',
    displayPlural: 'French',
    alignment: Alignment.AlliedPowers,
  },
  [Faction.Germany]: {
    displayName: 'Germany',
    displayAdjective: 'German',
    displayPlural: 'Germans',
    alignment: Alignment.CentralPowers,
  },
  [Faction.GreatBritain]: {
    displayName: 'Great Britain',
    displayAdjective: 'British',
    displayPlural: 'British',
    alignment: Alignment.AlliedPowers,
  },
  [Faction.UnitedStates]: {
    displayName: 'United States',
    displayAdjective: 'American',
    displayPlural: 'Americans',
    alignment: Alignment.AlliedPowers,
  },
} as const;
