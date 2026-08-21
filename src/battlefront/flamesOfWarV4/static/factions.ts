import { FactionMetadata } from '../types';
import { Alignment } from './alignments';
import { Era } from './eras';

export enum Faction {
  Australia = 'australia',
  Finland = 'finland',
  France = 'france',
  Germany = 'germany',
  GreatBritain = 'great_britain',
  Hungary = 'hungary',
  Italy = 'italy',
  ItalyAllies = 'italy_allies',
  ItalyAxis = 'italy_axis',
  Japan = 'japan',
  Poland = 'poland',
  Romania = 'romania',
  SovietUnion = 'soviet_union',
  UnitedStates = 'united_states',
}

export const factions: Record<Faction, FactionMetadata<Era, Alignment>> = {
  [Faction.Australia]: {
    displayName: 'Australia',
    displayAdjective: 'Australian',
    displayPlural: 'Australians',
    alignment: {
      [Era.EW]: Alignment.Allies,
      [Era.MW]: Alignment.Allies,
      [Era.LW]: Alignment.Allies,
    },
  },
  [Faction.Finland]: {
    displayName: 'Finland',
    displayAdjective: 'Finnish',
    displayPlural: 'Finns',
    alignment: {
      [Era.EW]: Alignment.Flexible,
      [Era.MW]: Alignment.Flexible,
      [Era.LW]: Alignment.Flexible,
    },
  },
  [Faction.France]: {
    displayName: 'France',
    displayAdjective: 'French',
    displayPlural: 'French',
    alignment: {
      [Era.EW]: Alignment.Allies,
      [Era.MW]: Alignment.Allies,
      [Era.LW]: Alignment.Allies,
    },
  },
  [Faction.Germany]: {
    displayName: 'Germany',
    displayAdjective: 'German',
    displayPlural: 'Germans',
    alignment: {
      [Era.EW]: Alignment.Axis,
      [Era.MW]: Alignment.Axis,
      [Era.LW]: Alignment.Axis,
    },
  },
  [Faction.GreatBritain]: {
    displayName: 'Great Britain',
    displayAdjective: 'British',
    displayPlural: 'British',
    alignment: {
      [Era.EW]: Alignment.Allies,
      [Era.MW]: Alignment.Allies,
      [Era.LW]: Alignment.Allies,
    },
  },
  [Faction.Hungary]: {
    displayName: 'Hungary',
    displayAdjective: 'Hungarian',
    displayPlural: 'Hungarians',
    alignment: {
      [Era.EW]: Alignment.Axis,
      [Era.MW]: Alignment.Axis,
      [Era.LW]: Alignment.Axis,
    },
  },
  [Faction.Italy]: {
    displayName: 'Italy',
    displayAdjective: 'Italian',
    displayPlural: 'Italians',
    alignment: {
      [Era.EW]: Alignment.Axis,
      [Era.MW]: Alignment.Axis,
      [Era.LW]: Alignment.Flexible,
    },
  },
  [Faction.ItalyAllies]: {
    displayName: 'Italy (Allies)',
    displayAdjective: 'Italian (CIL)',
    displayPlural: 'Italians (CIL)',
    alignment: {
      [Era.LW]: Alignment.Allies,
    },
  },
  [Faction.ItalyAxis]: {
    displayName: 'Italy (Axis)',
    displayAdjective: 'Italian (RSI)',
    displayPlural: 'Italians (RSI)',
    alignment: {
      [Era.LW]: Alignment.Axis,
    },
  },
  [Faction.Japan]: {
    displayName: 'Japan',
    displayAdjective: 'Japanese',
    displayPlural: 'Japanese',
    alignment: {
      [Era.EW]: Alignment.Axis,
      [Era.MW]: Alignment.Axis,
      [Era.LW]: Alignment.Axis,
    },
  },
  [Faction.Poland]: {
    displayName: 'Poland',
    displayAdjective: 'Polish',
    displayPlural: 'Poles',
    alignment: {
      [Era.EW]: Alignment.Allies,
      [Era.LW]: Alignment.Allies,
    },
  },
  [Faction.Romania]: {
    displayName: 'Romania',
    displayAdjective: 'Romanian',
    displayPlural: 'Romanians',
    alignment: {
      [Era.MW]: Alignment.Flexible,
      [Era.LW]: Alignment.Flexible,
    },
  },
  [Faction.SovietUnion]: {
    displayName: 'Soviet Union',
    displayAdjective: 'Soviet',
    displayPlural: 'Soviets',
    alignment: {
      [Era.EW]: Alignment.Flexible,
      [Era.MW]: Alignment.Allies,
      [Era.LW]: Alignment.Allies,
    },
  },
  [Faction.UnitedStates]: {
    displayName: 'United States',
    displayAdjective: 'American',
    displayPlural: 'Americans',
    alignment: {
      [Era.MW]: Alignment.Allies,
      [Era.LW]: Alignment.Allies,
    },
  },
} as const;
