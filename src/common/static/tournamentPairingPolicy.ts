import { getDisplayName, getOptions } from '../_internal';
import { SelectOption, TournamentPairingPolicyMetadata } from '../types';

export enum TournamentPairingPolicy {
  Allow = 'allow',
  Avoid = 'avoid',
  Block = 'block',
}

const definitions: Record<TournamentPairingPolicy, TournamentPairingPolicyMetadata> = {
  [TournamentPairingPolicy.Allow]: {
    displayName: 'Allow',
  },
  [TournamentPairingPolicy.Avoid]: {
    displayName: 'Avoid',
  },
  [TournamentPairingPolicy.Block]: {
    displayName: 'Block',
  },
} as const;

export const getTournamentPairingPolicyOptions = (): SelectOption<TournamentPairingPolicy>[] => getOptions(definitions);

export const getTournamentPairingPolicyDisplayName = (
  key: TournamentPairingPolicy,
): string | undefined => getDisplayName(definitions, key);
