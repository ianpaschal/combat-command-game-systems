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
    displayAdjective: 'ANZAC',
    displayPlural: 'ANZAC',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.Belgium]: {
    displayName: 'Belgium',
    displayAdjective: 'Belgian',
    displayPlural: 'Belgians',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.Canada]: {
    displayName: 'Canada',
    displayAdjective: 'Canadian',
    displayPlural: 'Canadians',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.Cuba]: {
    displayName: 'Cuba',
    displayAdjective: 'Cuban',
    displayPlural: 'Cubans',
    alignment: {
      [Era.Early]: Alignment.WarsawPact,
      [Era.Default]: Alignment.WarsawPact,
    },
  },
  [Faction.Czechoslovakia]: {
    displayName: 'Czechoslovakia',
    displayAdjective: 'Czechoslovak',
    displayPlural: 'Czechoslovaks',
    alignment: {
      [Era.Early]: Alignment.WarsawPact,
      [Era.Default]: Alignment.WarsawPact,
    },
  },
  [Faction.Denmark]: {
    displayName: 'Denmark',
    displayAdjective: 'Danish',
    displayPlural: 'Danes',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.EastGermany]: {
    displayName: 'East Germany',
    displayAdjective: 'East German',
    displayPlural: 'East Germans',
    alignment: {
      [Era.Early]: Alignment.WarsawPact,
      [Era.Default]: Alignment.WarsawPact,
    },
  },
  [Faction.Finland]: {
    displayName: 'Finland',
    displayAdjective: 'Finnish',
    displayPlural: 'Finns',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.France]: {
    displayName: 'France',
    displayAdjective: 'French',
    displayPlural: 'French',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.GreatBritain]: {
    displayName: 'Great Britain',
    displayAdjective: 'British',
    displayPlural: 'British',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.Iran]: {
    displayName: 'Iran',
    displayAdjective: 'Iranian',
    displayPlural: 'Iranians',
    alignment: {
      [Era.Early]: Alignment.WarsawPact,
      [Era.Default]: Alignment.WarsawPact,
    },
  },
  [Faction.Iraq]: {
    displayName: 'Iraq',
    displayAdjective: 'Iraqi',
    displayPlural: 'Iraqis',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.Israel]: {
    displayName: 'Israel',
    displayAdjective: 'Israeli',
    displayPlural: 'Israelis',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.Netherlands]: {
    displayName: 'The Netherlands',
    displayAdjective: 'Dutch',
    displayPlural: 'Dutch',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.Norway]: {
    displayName: 'Norway',
    displayAdjective: 'Norwegian',
    displayPlural: 'Norwegians',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.Poland]: {
    displayName: 'Poland',
    displayAdjective: 'Polish',
    displayPlural: 'Poles',
    alignment: {
      [Era.Early]: Alignment.WarsawPact,
      [Era.Default]: Alignment.WarsawPact,
    },
  },
  [Faction.SovietUnion]: {
    displayName: 'Soviet Union',
    displayAdjective: 'Soviet',
    displayPlural: 'Soviets',
    alignment: {
      [Era.Early]: Alignment.WarsawPact,
      [Era.Default]: Alignment.WarsawPact,
    },
  },
  [Faction.Sweden]: {
    displayName: 'Sweden',
    displayAdjective: 'Swedish',
    displayPlural: 'Swedes',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.Syria]: {
    displayName: 'Syria',
    displayAdjective: 'Syrian',
    displayPlural: 'Syrians',
    alignment: {
      [Era.Early]: Alignment.WarsawPact,
      [Era.Default]: Alignment.WarsawPact,
    },
  },
  [Faction.UnitedStates]: {
    displayName: 'United States',
    displayAdjective: 'American',
    displayPlural: 'Americans',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
  [Faction.WestGermany]: {
    displayName: 'West Germany',
    displayAdjective: 'West German',
    displayPlural: 'West Germans',
    alignment: {
      [Era.Early]: Alignment.Nato,
      [Era.Default]: Alignment.Nato,
    },
  },
} as const;
