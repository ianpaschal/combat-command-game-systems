import {
  describe,
  expect,
  it,
} from 'vitest';

import { MatchOutcomeType } from '../static/matchOutcomeTypes';
import { MissionData } from '../types';
import { calculateMatchResultWinner } from './calculateMatchResultWinner';

describe('calculateMatchResultWinner()', () => {

  it('returns undefined when mission is null.', () => {
    const result = calculateMatchResultWinner(null);
    expect(result).toBeUndefined();
  });

  it('returns undefined when attacker is undefined.', () => {
    const mission = {
      attacker: 'battle_plan' as const,
      firstTurn: 'attacker' as const,
      victoryConditions: [],
    } as MissionData;
    const result = calculateMatchResultWinner(mission, undefined, MatchOutcomeType.ObjectiveTaken);
    expect(result).toBeUndefined();
  });

  it('returns undefined when outcomeType is undefined.', () => {
    const mission = {
      attacker: 'battle_plan' as const,
      firstTurn: 'attacker' as const,
      victoryConditions: [],
    } as MissionData;
    const result = calculateMatchResultWinner(mission, 0);
    expect(result).toBeUndefined();
  });

  it('returns -1 (none) when a match times out.', () => {
    const mission = {
      attacker: 'battle_plan' as const,
      firstTurn: 'attacker' as const,
      victoryConditions: [],
    } as MissionData;
    const result = calculateMatchResultWinner(mission, 0, MatchOutcomeType.TimeOut);
    expect(result).toEqual(-1);
  });

  describe('when the outcome type is "objective taken"', () => {
    it('returns the attacker in asymmetrical missions (defender can repel).', () => {
      const mission = {
        attacker: 'battle_plan' as const,
        firstTurn: 'attacker' as const,
        victoryConditions: [MatchOutcomeType.AttackRepelled],
      } as MissionData;
      const result = calculateMatchResultWinner(mission, 0, MatchOutcomeType.ObjectiveTaken);
      expect(result).toEqual(0);
    });

    it('returns undefined when mission cannot repel attacks.', () => {
      const mission = {
        attacker: 'battle_plan' as const,
        firstTurn: 'attacker' as const,
        victoryConditions: [],
      } as MissionData;
      const result = calculateMatchResultWinner(mission, 0, MatchOutcomeType.ObjectiveTaken);
      expect(result).toBeUndefined();
    });
  });

  describe('when the outcome type is "attack repelled"', () => {
    it.each([
      { attacker: 0 as const, defender: 1 as const },
      { attacker: 1 as const, defender: 0 as const },
    ])('should return the defender (player $expectedDefender) when attacker is $attacker', ({
      attacker,
      defender,
    }) => {
      const mission = {
        attacker: 'battle_plan' as const,
        firstTurn: 'attacker' as const,
        victoryConditions: [MatchOutcomeType.AttackRepelled],
      } as MissionData;
      const result = calculateMatchResultWinner(mission, attacker, MatchOutcomeType.AttackRepelled);
      expect(result).toEqual(defender);
    });
  });

  it('returns undefined for other outcome types.', () => {
    const mission = {
      attacker: 'battle_plan' as const,
      firstTurn: 'attacker' as const,
      victoryConditions: [],
    } as MissionData;

    const result = calculateMatchResultWinner(mission, 0, MatchOutcomeType.MaxPointsReached);
    expect(result).toBeUndefined();
  });

  describe('when a score override is provided', () => {
    const mission = {
      attacker: 'battle_plan' as const,
      firstTurn: 'attacker' as const,
      victoryConditions: [],
    } as MissionData;
    const attacker = 0;
    const outcomeType = MatchOutcomeType.ForceBroken;
      
    it('returns 0 when player 0 has the higher-scoring player.', () => {
      const result = calculateMatchResultWinner(mission, attacker, outcomeType, {
        player0Score: 9,
        player1Score: 0,
      });
      expect(result).toEqual(0);
    });

    it('returns 1 when player 1 has the higher-scoring player.', () => {
      const result = calculateMatchResultWinner(mission, attacker, outcomeType, {
        player0Score: 1,
        player1Score: 9,
      });
      expect(result).toEqual(1);
    });

    it('returns -1 (none) when players are tied.', () => {
      const result = calculateMatchResultWinner(mission, attacker, outcomeType, {
        player0Score: 3,
        player1Score: 3,
      });
      expect(result).toEqual(-1);
    });
  });
});
