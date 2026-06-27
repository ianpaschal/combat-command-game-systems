import { FactionMetadata } from '../types';
import { Alignment } from './alignments';
import { Era } from './eras';

export enum Faction {
  Anzac = 'anzac',
  Belgium = 'belgium',
  Canada = 'canada',
  Cuba = 'cuba',
  Czechoslovakia = 'czechoslovakia',
  Denmark = 'denmark',
  EastGermany = 'east_germany',
  Finland = 'finland',
  France = 'france',
  GreatBritain = 'great_britain',
  Iran = 'iran',
  Iraq = 'iraq',
  Israel = 'israel',
  Netherlands = 'netherlands',
  Norway = 'norway',
  Poland = 'poland',
  SovietUnion = 'soviet_union',
  Sweden = 'sweden',
  Syria = 'syria',
  UnitedStates = 'united_states',
  WestGermany = 'west_germany',
}

export const factions: Record<Faction, FactionMetadata<Era, Alignment>> = {
  [Faction.Anzac]: {
    displayName: 'ANZAC',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.Belgium]: {
    displayName: 'Belgium',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.Canada]: {
    displayName: 'Canada',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.Cuba]: {
    displayName: 'Cuba',
    alignment: {
      [Era.Early]: Alignment.WarsawPact,
      [Era.Default]: Alignment.WarsawPact,
    },
  },
  [Faction.Czechoslovakia]: {
    displayName: 'Czechoslovakia',
    alignment: {
      [Era.Early]: Alignment.WarsawPact,
      [Era.Default]: Alignment.WarsawPact,
    },
  },
  [Faction.Denmark]: {
    displayName: 'Denmark',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.EastGermany]: {
    displayName: 'East Germany',
    alignment: {
      [Era.Early]: Alignment.WarsawPact,
      [Era.Default]: Alignment.WarsawPact,
    },
  },
  [Faction.Finland]: {
    displayName: 'Finland',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.France]: {
    displayName: 'France',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.GreatBritain]: {
    displayName: 'Great Britain',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.Iran]: {
    displayName: 'Iran',
    alignment: {
      [Era.Early]: Alignment.WarsawPact,
      [Era.Default]: Alignment.WarsawPact,
    },
  },
  [Faction.Iraq]: {
    displayName: 'Iraq',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.Israel]: {
    displayName: 'Israel',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.Netherlands]: {
    displayName: 'The Netherlands',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.Norway]: {
    displayName: 'Norway',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.Poland]: {
    displayName: 'Poland',
    alignment: {
      [Era.Early]: Alignment.WarsawPact,
      [Era.Default]: Alignment.WarsawPact,
    },
  },
  [Faction.SovietUnion]: {
    displayName: 'Soviet Union',
    alignment: {
      [Era.Early]: Alignment.WarsawPact,
      [Era.Default]: Alignment.WarsawPact,
    },
  },
  [Faction.Sweden]: {
    displayName: 'Sweden',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.Syria]: {
    displayName: 'Syria',
    alignment: {
      [Era.Early]: Alignment.WarsawPact,
      [Era.Default]: Alignment.WarsawPact,
    },
  },
  [Faction.UnitedStates]: {
    displayName: 'United States',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.WestGermany]: {
    displayName: 'West Germany',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
} as const;
