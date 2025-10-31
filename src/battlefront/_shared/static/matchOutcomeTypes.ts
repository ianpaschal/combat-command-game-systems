import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { MatchOutcomeTypeMetadata } from '../types';

export enum MatchOutcomeType {
  ObjectiveTaken = 'objective_taken',
  AttackRepelled = 'attack_repelled',
  MaxPointsReached = 'max_points_reached',
  ForceBroken = 'force_broken',
  TimeOut = 'time_out',
}

export const matchOutcomeTypes: Record<MatchOutcomeType, MatchOutcomeTypeMetadata> = {
  [MatchOutcomeType.ObjectiveTaken]: {
    displayName: 'Objective Captured',
  },
  [MatchOutcomeType.AttackRepelled]: {
    displayName: 'Attack Repelled',
  },
  [MatchOutcomeType.MaxPointsReached]: {
    displayName: 'Max. Points Reached',
  }, 
  [MatchOutcomeType.ForceBroken]: {
    displayName: 'Force Broken',
  },
  [MatchOutcomeType.TimeOut]: {
    displayName: 'Time Out / Draw',
  },
} as const;

export const getMatchOutcomeTypeOptions = (): SelectOption<MatchOutcomeType>[] => getOptions(matchOutcomeTypes);

export const getMatchOutcomeTypeDisplayName = (
  key?: MatchOutcomeType,
): string | undefined => getDisplayName(matchOutcomeTypes, key);
