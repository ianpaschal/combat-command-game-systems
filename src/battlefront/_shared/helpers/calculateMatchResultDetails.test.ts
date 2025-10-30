import {
  describe,
  expect,
  it,
} from 'vitest';

import { MatchResultDetails } from '../schema/matchResultDetails';
import { BattlePlan } from '../static/battlePlans';
import { MatchOutcomeType } from '../static/matchOutcomeTypes';
import { MissionData } from '../types';
import { calculateMatchResultDetails } from './calculateMatchResultDetails';

describe('calculateMatchResultDetails()', () => {

  it('returns empty object when mission is null.', () => {
    const result = calculateMatchResultDetails(null, {});
    expect(result).toEqual({});
  });

  it('returns empty object when all sub-utilities return undefined.', () => {
    const mission = {
      attacker: 'roll' as const,
      firstTurn: 'roll' as const,
      victoryConditions: [],
    } as MissionData;
    const result = calculateMatchResultDetails(mission, {});
    expect(result).toEqual({});
  });

  it('returns only attacker when only calculateMatchResultAttacker returns a value.', () => {
    const mission = {
      attacker: 'battle_plan' as const,
      firstTurn: 'roll' as const,
      victoryConditions: [],
    } as MissionData;
    const details = {
      player0BattlePlan: BattlePlan.Attack,
      player1BattlePlan: BattlePlan.Defend,
    } as MatchResultDetails;
    const result = calculateMatchResultDetails(mission, details);
    expect(result).toEqual({ attacker: 0 });
  });

  it('returns only firstTurn when only calculateMatchResultFirstTurn returns a value.', () => {
    const mission = {
      attacker: 'roll' as const,
      firstTurn: 'attacker' as const,
      victoryConditions: [],
    } as MissionData;
    const details = {
      attacker: 0 as const,
    };
    const result = calculateMatchResultDetails(mission, details);
    expect(result).toEqual({ firstTurn: 0 });
  });

  it('returns only winner when only calculateMatchResultWinner returns a value.', () => {
    const mission = {
      attacker: 'roll' as const,
      firstTurn: 'roll' as const,
      victoryConditions: [MatchOutcomeType.AttackRepelled],
    } as MissionData;
    const details = {
      attacker: 0 as const,
      outcomeType: MatchOutcomeType.AttackRepelled,
    };
    const result = calculateMatchResultDetails(mission, details);
    expect(result).toEqual({ winner: 1 });
  });

  it('returns all computed details when all sub-utilities return values.', () => {
    const mission = {
      attacker: 'battle_plan' as const,
      firstTurn: 'attacker' as const,
      victoryConditions: [MatchOutcomeType.AttackRepelled],
    } as MissionData;
    const details = {
      player0BattlePlan: BattlePlan.Attack,
      player1BattlePlan: BattlePlan.Defend,
      outcomeType: MatchOutcomeType.AttackRepelled,
    };
    const result = calculateMatchResultDetails(mission, details);
    expect(result).toEqual({
      attacker: 0,
      firstTurn: 0,
      winner: 1,
    });
  });

  it('should use existing attacker from details when calculateMatchResultAttacker returns undefined.', () => {
    const mission = {
      attacker: 'roll' as const,
      firstTurn: 'attacker' as const,
      victoryConditions: [MatchOutcomeType.AttackRepelled],
    } as MissionData;
    const details = {
      attacker: 1 as const,
      outcomeType: MatchOutcomeType.AttackRepelled,
    };
    const result = calculateMatchResultDetails(mission, details);
    expect(result).toEqual({
      firstTurn: 1,
      winner: 0,
    });
  });

  it('should use computed attacker when both computed and existing attacker are available.', () => {
    const mission = {
      attacker: 'battle_plan' as const,
      firstTurn: 'attacker' as const,
      victoryConditions: [MatchOutcomeType.AttackRepelled],
    } as MissionData;
    const details = {
      player0BattlePlan: BattlePlan.Attack,
      player1BattlePlan: BattlePlan.Defend,
      attacker: 1 as const, // This should be ignored in favor of computed attacker
      outcomeType: MatchOutcomeType.AttackRepelled,
    };
    const result = calculateMatchResultDetails(mission, details);
    expect(result).toEqual({
      attacker: 0, // Computed attacker takes precedence
      firstTurn: 0, // Uses computed attacker (0)
      winner: 1, // Uses computed attacker (0)
    });
  });

  it('should handle partial details with missing battle plans.', () => {
    const mission = {
      attacker: 'battle_plan' as const,
      firstTurn: 'attacker' as const,
      victoryConditions: [MatchOutcomeType.AttackRepelled],
    } as MissionData;
    const details = {
      player0BattlePlan: BattlePlan.Attack,
      // player1BattlePlan is missing
      outcomeType: MatchOutcomeType.AttackRepelled,
    };
    const result = calculateMatchResultDetails(mission, details);
    expect(result).toEqual({
      attacker: undefined,
      firstTurn: undefined,
      winner: undefined,
    });
  });
});
