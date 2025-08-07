import { getDisplayName, getOptions } from '../../../common/_internal';
import { FactionMetadata } from '../../_shared/types';
import { Alignment } from './alignments';

export enum Faction {
  Australia = 'australia',
  Finland = 'finland',
  France = 'france',
  Germany = 'germany',
  GreatBritain = 'great_britain',
  Hungary = 'hungary',
  Italy = 'italy',
  Japan = 'japan',
  Romania = 'romania',
  SovietUnion = 'soviet_union',
  UnitedStates = 'united_states',
}

export const factions: Record<Faction, FactionMetadata<Alignment>> = {
  [Faction.Australia]: {
    displayName: 'Australia',
    alignment: Alignment.Allies,
  },
  [Faction.Finland]: {
    displayName: 'Finland',
    alignment: Alignment.Axis,
  },
  [Faction.France]: {
    displayName: 'France',
    alignment: Alignment.Allies,
  },
  [Faction.Germany]: {
    displayName: 'Germany',
    alignment: Alignment.Axis,
  },
  [Faction.GreatBritain]: {
    displayName: 'Great Britain',
    alignment: Alignment.Allies,
  },
  [Faction.Hungary]: {
    displayName: 'Hungary',
    alignment: Alignment.Axis,
  },
  [Faction.Italy]: {
    displayName: 'Italy',
    alignment: Alignment.Axis,
  },
  [Faction.Japan]: {
    displayName: 'Japan',
    alignment: Alignment.Axis,
  },
  [Faction.Romania]: {
    displayName: 'Romania',
    alignment: Alignment.Axis,
  },
  [Faction.SovietUnion]: {
    displayName: 'Soviet Union',
    alignment: Alignment.Allies,
  },
  [Faction.UnitedStates]: {
    displayName: 'United States',
    alignment: Alignment.Allies,
  },
} as const;

export const getFactionOptions = () => getOptions(factions);

export const getFactionDisplayName = (
  key: Faction,
) => getDisplayName(factions, key);
