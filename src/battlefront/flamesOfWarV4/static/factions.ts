import { SelectOption } from '../../../common';
import { getDisplayName } from '../../../common/_internal';
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
  Japan = 'japan',
  Poland = 'poland',
  Romania = 'romania',
  SovietUnion = 'soviet_union',
  UnitedStates = 'united_states',
}

export const factions: Record<Faction, FactionMetadata<Era, Alignment>> = {
  [Faction.Australia]: {
    displayName: 'Australia',
    alignment: {
      [Era.EW]: Alignment.Allies,
      [Era.MW]: Alignment.Allies,
      [Era.LW]: Alignment.Allies,
    },
  },
  [Faction.Finland]: {
    displayName: 'Finland',
    alignment: {
      [Era.EW]: Alignment.Flexible,
      [Era.MW]: Alignment.Flexible,
      [Era.LW]: Alignment.Flexible,
    },
  },
  [Faction.France]: {
    displayName: 'France',
    alignment: {
      [Era.EW]: Alignment.Allies,
      [Era.MW]: Alignment.Allies,
      [Era.LW]: Alignment.Allies,
    },
  },
  [Faction.Germany]: {
    displayName: 'Germany',
    alignment: {
      [Era.EW]: Alignment.Axis,
      [Era.MW]: Alignment.Axis,
      [Era.LW]: Alignment.Axis,
    },
  },
  [Faction.GreatBritain]: {
    displayName: 'Great Britain',
    alignment: {
      [Era.EW]: Alignment.Allies,
      [Era.MW]: Alignment.Allies,
      [Era.LW]: Alignment.Allies,
    },
  },
  [Faction.Hungary]: {
    displayName: 'Hungary',
    alignment: {
      [Era.EW]: Alignment.Axis,
      [Era.MW]: Alignment.Axis,
      [Era.LW]: Alignment.Axis,
    },
  },
  [Faction.Italy]: {
    displayName: 'Italy',
    alignment: {
      [Era.EW]: Alignment.Axis,
      [Era.MW]: Alignment.Axis,
      [Era.LW]: Alignment.Flexible,
    },
  },
  [Faction.Japan]: {
    displayName: 'Japan',
    alignment: {
      [Era.EW]: Alignment.Axis,
      [Era.MW]: Alignment.Axis,
      [Era.LW]: Alignment.Axis,
    },
  },
  [Faction.Poland]: {
    displayName: 'Poland',
    alignment: {
      [Era.EW]: Alignment.Allies,
      [Era.LW]: Alignment.Allies,
    },
  },
  [Faction.Romania]: {
    displayName: 'Romania',
    alignment: {
      [Era.MW]: Alignment.Flexible,
      [Era.LW]: Alignment.Flexible,
    },
  },
  [Faction.SovietUnion]: {
    displayName: 'Soviet Union',
    alignment: {
      [Era.EW]: Alignment.Flexible,
      [Era.MW]: Alignment.Allies,
      [Era.LW]: Alignment.Allies,
    },
  },
  [Faction.UnitedStates]: {
    displayName: 'United States',
    alignment: {
      [Era.MW]: Alignment.Allies,
      [Era.LW]: Alignment.Allies,
    },
  },
};

export type GetFactionOptionsFilters = {
  alignment?: Alignment;
  era?: Era;
};

export const getFactionOptions = (filters?: GetFactionOptionsFilters): SelectOption<Faction>[] => {
  const entries = Object.entries(factions) as [Faction, FactionMetadata<Era, Alignment>][];
  const filtered = filters ? (
    entries.filter(([, f]) => {
      if (filters.era !== undefined && filters.alignment !== undefined) {
        return f.alignment[filters.era] === filters.alignment;
      }
      if (filters.era !== undefined) {
        return f.alignment[filters.era] !== undefined;
      }
      if (filters.alignment !== undefined) {
        return Object.values(f.alignment).some((a) => a === filters.alignment);
      }
      return true;
    })
  ) : entries;
  return filtered.map(([key, { displayName }]) => ({
    value: key,
    label: displayName,
  }));
};

export const getFactionDisplayName = (
  key: Faction,
): string | undefined => getDisplayName(factions, key);

export const getFactionAlignment = (
  key: string,
  era: Era,
): Alignment | undefined => {
  if (key in factions) {
    return factions[key as Faction].alignment[era];
  }
  return undefined;
};
