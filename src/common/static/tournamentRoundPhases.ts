import { getDisplayName, getOptions } from '../_internal';
import { SelectOption, TournamentRoundPhaseMetadata } from '../types';

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

export const getTournamentRoundPhaseOptions = (): SelectOption<TournamentRoundPhase>[] => getOptions(tournamentRoundPhases);

export const getTournamentRoundPhaseDisplayName = (
  key: TournamentRoundPhase,
): string | undefined => getDisplayName(tournamentRoundPhases, key);
