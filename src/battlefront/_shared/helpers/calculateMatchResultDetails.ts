import { MatchResultDetails } from '../schema/matchResultDetails';
import { MissionData } from '../types';
import { calculateMatchResultAttacker } from './calculateMatchResultAttacker';
import { calculateMatchResultFirstTurn } from './calculateMatchResultFirstTurn';
import { calculateMatchResultWinner } from './calculateMatchResultWinner';

export const calculateMatchResultDetails = <TGameSystemDetails extends MatchResultDetails>(
  missionData: MissionData | null,
  details: Partial<MatchResultDetails>,
): Partial<TGameSystemDetails> | null => {
  const calculated: Partial<TGameSystemDetails> = {};

  if (!missionData) {
    return calculated;
  }

  const attacker = calculateMatchResultAttacker(missionData, [
    details.player0BattlePlan,
    details.player1BattlePlan,
  ]);

  if (attacker !== undefined) {
    calculated.attacker = attacker;
  }

  const firstTurn = calculateMatchResultFirstTurn(missionData, attacker ?? details.attacker);
  if (firstTurn !== undefined) {
    calculated.firstTurn = firstTurn;
  }

  const winner = calculateMatchResultWinner(missionData, attacker ?? details.attacker, details.outcomeType);
  if (winner !== undefined) {
    calculated.winner = winner;
  }

  return calculated;
};
