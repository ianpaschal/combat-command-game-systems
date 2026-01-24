import { getDisplayName, getOptions } from '../_internal';
import { SelectOption, TournamentPairingMethodMetadata } from '../types';

export enum TournamentPairingMethod {
  Adjacent = 'adjacent',
  AdjacentAlignment = 'adjacent_alignment',
  Random = 'random',
}

const tournamentPairingMethods: Record<TournamentPairingMethod, TournamentPairingMethodMetadata> = {
  [TournamentPairingMethod.Adjacent]: {
    displayName: 'Adjacent',
  },
  [TournamentPairingMethod.AdjacentAlignment]: {
    displayName: 'Adjacent (Red vs. Blue)',
  },
  [TournamentPairingMethod.Random]: {
    displayName: 'Random',
  },
} as const;

export const getTournamentPairingMethodOptions = (): SelectOption<TournamentPairingMethod>[] => getOptions(tournamentPairingMethods);

export const getTournamentPairingMethodDisplayName = (
  key: TournamentPairingMethod,
): string | undefined => getDisplayName(tournamentPairingMethods, key);
