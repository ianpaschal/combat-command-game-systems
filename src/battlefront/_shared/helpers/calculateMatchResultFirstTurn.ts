import { MissionData } from '../types';

export const calculateMatchResultFirstTurn = (
  mission: MissionData | null,
  attacker?: 0 | 1,
): 0 | 1 | undefined => {
  if (!mission || attacker === undefined) {
    return undefined;
  }
  if (mission.firstTurn === 'roll') {
    return undefined;
  }
  if (mission.firstTurn === 'attacker') {
    return attacker;
  }
  if (mission.firstTurn === 'defender') {
    return attacker === 0 ? 1 : 0; // Defender
  }
};
