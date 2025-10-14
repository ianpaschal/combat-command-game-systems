import {
  describe,
  expect,
  it,
} from 'vitest';

import { BattlePlan } from '../static/battlePlans';
import { MissionData } from '../types';
import { calculateMatchResultAttacker } from './calculateMatchResultAttacker';

describe('calculateMatchResultAttacker', () => {

  it('should return undefined when the mission is null.', () => {
    const result = calculateMatchResultAttacker(null);

    expect(result).toBeUndefined();
  });

  it('should return undefined when battle plans are missing.', () => {
    const mission = {
      attacker: 'battle_plan' as const,
    } as MissionData;

    const result = calculateMatchResultAttacker(mission);

    expect(result).toBeUndefined();
  });

  it('should return undefined when mission attacker is "roll".', () => {
    const mission = {
      attacker: 'roll' as const,
    } as MissionData;

    const result = calculateMatchResultAttacker(mission, [BattlePlan.Attack, BattlePlan.Defend]);

    expect(result).toBeUndefined();
  });

  it('should return undefined when both players have the same battle plan.', () => {
    const mission = {
      attacker: 'battle_plan' as const,
    } as MissionData;

    const result = calculateMatchResultAttacker(mission, [BattlePlan.Attack, BattlePlan.Attack]);

    expect(result).toBeUndefined();
  });

  it('should return the player with the "more aggressive" battle plan in asymmetrical match ups.', () => {
    const mission = {
      attacker: 'battle_plan' as const, 
    } as MissionData;

    const matchUps: { battlePlans: [BattlePlan, BattlePlan], expected: number }[] = [
      { battlePlans: [BattlePlan.Attack, BattlePlan.Maneuver], expected: 0 },
      { battlePlans: [BattlePlan.Attack, BattlePlan.Defend], expected: 0 },
      { battlePlans: [BattlePlan.Maneuver, BattlePlan.Attack], expected: 1 },
      { battlePlans: [BattlePlan.Maneuver, BattlePlan.Defend], expected: 0 },
      { battlePlans: [BattlePlan.Defend, BattlePlan.Attack], expected: 1 },
      { battlePlans: [BattlePlan.Defend, BattlePlan.Maneuver], expected: 1 },
    ];

    matchUps.forEach(({ battlePlans, expected }) => {
      const result = calculateMatchResultAttacker(mission, battlePlans);
      expect(result).toEqual(expected);
    });
  });
});
