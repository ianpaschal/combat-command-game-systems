import { getDisplayName, getOptions } from '../_internal';
import { SelectOption, TournamentPairingOrderMethodMetadata } from '../types';

export enum TournamentPairingOrderMethod {
  Ranking = 'ranking',
  Random = 'random',
}

const definitions: Record<TournamentPairingOrderMethod, TournamentPairingOrderMethodMetadata> = {
  [TournamentPairingOrderMethod.Ranking]: {
    displayName: 'Ranking',
  },
  [TournamentPairingOrderMethod.Random]: {
    displayName: 'Random',
  },
} as const;

export const getTournamentPairingOrderMethodOptions = (): SelectOption<TournamentPairingOrderMethod>[] => getOptions(definitions);

export const getTournamentPairingOrderMethodDisplayName = (
  key: TournamentPairingOrderMethod,
): string | undefined => getDisplayName(definitions, key);
