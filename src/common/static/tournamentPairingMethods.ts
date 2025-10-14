import { getDisplayName, getOptions } from '../_internal';
import { TournamentPairingMethodMetadata } from '../types';

export enum TournamentPairingMethod {
  Adjacent = 'adjacent',
  // AdjacentAlignment = 'adjacent_alignment',
  Random = 'random',
}

const tournamentPairingMethods: Record<TournamentPairingMethod, TournamentPairingMethodMetadata> = {
  [TournamentPairingMethod.Adjacent]: {
    displayName: 'Adjacent',
  },
  // [TournamentPairingMethod.AdjacentAlignment]: {
  //   displayName: 'Adjacent (Red vs. Blue)',
  // },
  [TournamentPairingMethod.Random]: {
    displayName: 'Random',
  },
} as const;

export const getTournamentPairingMethodOptions = () => getOptions(tournamentPairingMethods);

export const getTournamentPairingMethodDisplayName = (
  key: TournamentPairingMethod,
) => getDisplayName(tournamentPairingMethods, key);
