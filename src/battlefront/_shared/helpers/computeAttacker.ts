import { BattlePlan } from '../static/battlePlans';
import { MissionData } from '../types';

export const computeAttacker = (
  mission: MissionData | null,
  battlePlans?: [BattlePlan | undefined, BattlePlan | undefined],
): 0 | 1 | undefined => {
  if (!mission || !battlePlans || !battlePlans[0] || !battlePlans[1]) {
    return undefined;
  }
  const [player0BattlePlan, player1BattlePlan] = battlePlans;
  if (mission.attacker === 'roll' || player0BattlePlan === player1BattlePlan) {
    return undefined;
  }
  if (player0BattlePlan === 'attack' && player1BattlePlan === 'maneuver') {
    return 0;
  }
  if (player0BattlePlan === 'attack' && player1BattlePlan === 'defend') {
    return 0;
  }
  if (player0BattlePlan === 'maneuver' && player1BattlePlan === 'defend') {
    return 0;
  }
  if (player0BattlePlan === 'maneuver' && player1BattlePlan === 'attack') {
    return 1;
  }
  if (player0BattlePlan === 'defend' && player1BattlePlan === 'attack') {
    return 1;
  }
  if (player0BattlePlan === 'defend' && player1BattlePlan === 'maneuver') {
    return 1;
  }
};
