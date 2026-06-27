import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { Alignment } from './alignments';
import { Faction, factions } from './factions';

export const getFactionOptions = (): SelectOption<Faction>[] => getOptions(factions);

export const getFactionDisplayName = (
  key?: string,
): string | undefined => getDisplayName(factions, key as Faction);

export const getFactionAlignment = (
  key: string,
): Alignment | undefined => {
  if (key in factions) {
    return factions[key as Faction].alignment;
  }
  return undefined;
};
