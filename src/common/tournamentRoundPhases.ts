import { getDisplayName, getOptions } from './_internal';
import { TournamentRoundPhaseMetadata } from './types';

export enum TournamentRoundPhase {
  Pairing = 'pairing',
  SetUp = 'set_up',
  Playing = 'playing',
  Completed = 'completed',
}

const tournamentRoundPhases: Record<TournamentRoundPhase, TournamentRoundPhaseMetadata> = {
  [TournamentRoundPhase.Pairing]: {
    displayName: 'Pairing',
  },
  [TournamentRoundPhase.SetUp]: {
    displayName: 'Set-Up',
  },
  [TournamentRoundPhase.Playing]: {
    displayName: 'Playing',
  },
  [TournamentRoundPhase.Completed]: {
    displayName: 'Completed',
  },
} as const;

export const getTournamentRoundPhaseOptions = () => getOptions(tournamentRoundPhases);

export const getTournamentRoundPhaseDisplayName = (
  key: TournamentRoundPhase,
) => getDisplayName(tournamentRoundPhases, key);
