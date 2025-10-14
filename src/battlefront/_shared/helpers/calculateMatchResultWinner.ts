import { MatchOutcomeType } from '../static/matchOutcomeTypes';
import { MissionData } from '../types';

export const calculateMatchResultWinner = (
  mission: MissionData | null,
  attacker?: 0 | 1,
  outcomeType?: MatchOutcomeType,
): -1 | 0 | 1 | undefined => {
  if (!mission || attacker === undefined || !outcomeType) {
    return undefined;
  }
  if (outcomeType === MatchOutcomeType.TimeOut) {
    return -1;
  }
  const canRepel = mission.victoryConditions.includes(MatchOutcomeType.AttackRepelled);
  if (outcomeType === MatchOutcomeType.ObjectiveTaken && attacker !== undefined && canRepel) {
    return attacker;
  }
  if (outcomeType === MatchOutcomeType.AttackRepelled && attacker !== undefined) {
    return attacker === 0 ? 1 : 0; // Defender
  }
};
