import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { FactionMetadata } from '../../_shared/types';
import { Alignment } from './alignments';

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

export const factions: Record<Faction, FactionMetadata<Alignment>> = {
  [Faction.Anzac]: {
    displayName: 'ANZAC',
    alignment: Alignment.Nato,
  },
  [Faction.Belgium]: {
    displayName: 'Belgium',
    alignment: Alignment.Nato,
  },
  [Faction.Canada]: {
    displayName: 'Canada',
    alignment: Alignment.Nato,
  },
  [Faction.Cuba]: {
    displayName: 'Cuba',
    alignment: Alignment.WarsawPact,
  },
  [Faction.Czechoslovakia]: {
    displayName: 'Czechoslovakia',
    alignment: Alignment.WarsawPact,
  },
  [Faction.Denmark]: {
    displayName: 'Denmark',
    alignment: Alignment.Nato,
  },
  [Faction.EastGermany]: {
    displayName: 'East Germany',
    alignment: Alignment.WarsawPact,
  },
  [Faction.Finland]: {
    displayName: 'Finland',
    alignment: Alignment.Nato,
  },
  [Faction.France]: {
    displayName: 'France',
    alignment: Alignment.Nato,
  },
  [Faction.GreatBritain]: {
    displayName: 'Great Britain',
    alignment: Alignment.Nato,
  },
  [Faction.Iran]: {
    displayName: 'Iran',
    alignment: Alignment.WarsawPact,
  },
  [Faction.Iraq]: {
    displayName: 'Iraq',
    alignment: Alignment.Nato,
  },
  [Faction.Israel]: {
    displayName: 'Israel',
    alignment: Alignment.Nato,
  },
  [Faction.Netherlands]: {
    displayName: 'The Netherlands',
    alignment: Alignment.Nato,
  },
  [Faction.Norway]: {
    displayName: 'Norway',
    alignment: Alignment.Nato,
  },
  [Faction.Poland]: {
    displayName: 'Poland',
    alignment: Alignment.WarsawPact,
  },
  [Faction.SovietUnion]: {
    displayName: 'Soviet Union',
    alignment: Alignment.WarsawPact,
  },
  [Faction.Sweden]: {
    displayName: 'Sweden',
    alignment: Alignment.Nato,
  },
  [Faction.Syria]: {
    displayName: 'Syria',
    alignment: Alignment.WarsawPact,
  },
  [Faction.UnitedStates]: {
    displayName: 'United States',
    alignment: Alignment.Nato,
  },
  [Faction.WestGermany]: {
    displayName: 'West Germany',
    alignment: Alignment.Nato,
  },
} as const;

export const getFactionOptions = (): SelectOption<Faction>[] => getOptions(factions);

export const getFactionDisplayName = (
  key: Faction,
): string | undefined => getDisplayName(factions, key);

export const getFactionAlignment = (
  key: string,
): Alignment | undefined => {
  if (key in factions) {
    return factions[key as Faction].alignment;
  }
  return undefined;
};
