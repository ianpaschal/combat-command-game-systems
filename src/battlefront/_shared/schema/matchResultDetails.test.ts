import {
  describe,
  expect,
  it,
} from 'vitest';

import { getSchemaFieldErrors } from '../../../common/_internal/getSchemaFieldErrors';
import { BattlePlan } from '../static/battlePlans';
import { MatchOutcomeType } from '../static/matchOutcomeTypes';
import { MissionName } from '../static/missionNames';
import { createMatchResultDetailsSchema, MatchResultDetails } from './matchResultDetails';

describe('createMatchResultDetailsSchema()', () => {

  const validData: MatchResultDetails = {
    player0BattlePlan: BattlePlan.Attack,
    player0UnitsLost: 2,
    player1BattlePlan: BattlePlan.Defend,
    player1UnitsLost: 3,
    attacker: 0 as const,
    firstTurn: 1 as const,
    mission: MissionName.Encounter,
    outcomeType: MatchOutcomeType.ForceBroken,
    turnsPlayed: 6,
    winner: 1 as const,
  };

  const schema = createMatchResultDetailsSchema({} as const);

  it('accepts valid data.', () => {
    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe('.player0BattlePlan', () => {
    it('should emit an error if value is not an valid battle plan.', () => {
      const result = schema.safeParse({
        ...validData,
        player0BattlePlan: null,
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'player0BattlePlan')).toContain('Please select a battle plan');
    });
  });

  describe('.player1BattlePlan', () => {
    it('should emit an error if value is not an valid battle plan.', () => {
      const result = schema.safeParse({
        ...validData,
        player1BattlePlan: null,
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'player1BattlePlan')).toContain('Please select a battle plan');
    });
  });

  describe('.mission', () => {
    it('should emit an error if value is not an valid mission.', () => {
      const result = schema.safeParse({
        ...validData,
        mission: 'custom',
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'mission')).toContain('Please select a mission');
    });
  });

  describe('.outcomeType', () => {
    it('should emit an error if value is not an valid outcome type.', () => {
      const result = schema.safeParse({
        ...validData,
        outcomeType: null,
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'outcomeType')).toContain('Please select an outcome type');
    });
  });
  
  describe('.attacker', () => {
    it('should emit an error if value is not 0 or 1.', () => {
      const result = schema.safeParse({ ...validData, attacker: null });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'attacker')).toContain('Please select an attacker');
    });
  });

  describe('.firstTurn', () => {
    it('should emit an error if value is not 0 or 1.', () => {
      const result = schema.safeParse({ ...validData, firstTurn: null });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'firstTurn')).toContain('Please select who had the first turn');
    });
  });

  describe('.winner', () => {
    it('should emit an error if value is not -1, 0, or 1.', () => {
      const result = schema.safeParse({ ...validData, winner: null });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'winner')).toContain('Please select a winner');
    });
    it('rejects values other than -1 if the outcome type is time_out.', () => {
      const result = schema.safeParse({
        ...validData,
        outcomeType: MatchOutcomeType.TimeOut,
      });
      expect(result.success).toBe(false);
    });

    it('rejects a value of -1 if the outcome type is not time_out.', () => {
      const result = schema.safeParse({
        ...validData,
        outcomeType: MatchOutcomeType.AttackRepelled,
        winner: -1,
      });
      expect(result.success).toBe(false);
    });
  });
});
