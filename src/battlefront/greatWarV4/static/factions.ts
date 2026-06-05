import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { FactionMetadata } from '../../_shared/types';
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
    alignment: Alignment.AlliedPowers,
  },
  [Faction.France]: {
    displayName: 'France',
    alignment: Alignment.AlliedPowers,
  },
  [Faction.Germany]: {
    displayName: 'Germany',
    alignment: Alignment.CentralPowers,
  },
  [Faction.GreatBritain]: {
    displayName: 'Great Britain',
    alignment: Alignment.AlliedPowers,
  },
  [Faction.UnitedStates]: {
    displayName: 'United States',
    alignment: Alignment.AlliedPowers,
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
