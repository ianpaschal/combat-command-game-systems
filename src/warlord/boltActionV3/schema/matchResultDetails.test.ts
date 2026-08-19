import {
  describe,
  expect,
  it,
} from 'vitest';

import { Mission } from '../static/missions';
import { MatchResultDetails, matchResultDetails } from './matchResultDetails';

describe('BoltActionV3.matchResultDetails', () => {

  const validData: MatchResultDetails = {
    mission: Mission.KeyPositions,
    player0UnitsLost: 2,
    player1UnitsLost: 3,
    turnsPlayed: 6,
    winner: 0,
  };

  it('accepts valid data.', () => {
    const result = matchResultDetails.schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('accepts a score override.', () => {
    const result = matchResultDetails.schema.safeParse({
      ...validData,
      scoreOverride: { player0Score: 5, player1Score: 2 },
    });
    expect(result.success).toBe(true);
  });

  describe('.player0UnitsLost', () => {
    it('should emit an error if value is missing.', () => {
      const result = matchResultDetails.schema.safeParse({
        ...validData,
        player0UnitsLost: undefined,
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if value is negative.', () => {
      const result = matchResultDetails.schema.safeParse({
        ...validData,
        player0UnitsLost: -1,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.player1UnitsLost', () => {
    it('should emit an error if value is missing.', () => {
      const result = matchResultDetails.schema.safeParse({
        ...validData,
        player1UnitsLost: undefined,
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if value is negative.', () => {
      const result = matchResultDetails.schema.safeParse({
        ...validData,
        player1UnitsLost: -1,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.mission', () => {
    it('should emit an error if value is missing.', () => {
      const result = matchResultDetails.schema.safeParse({
        ...validData,
        mission: undefined,
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if value is not a recognized mission.', () => {
      const result = matchResultDetails.schema.safeParse({
        ...validData,
        mission: 'siege',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.turnsPlayed', () => {
    it('should emit an error if value is missing.', () => {
      const result = matchResultDetails.schema.safeParse({
        ...validData,
        turnsPlayed: undefined,
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if value is less than one.', () => {
      const result = matchResultDetails.schema.safeParse({
        ...validData,
        turnsPlayed: 0,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.winner', () => {
    it('should emit an error if value is missing.', () => {
      const result = matchResultDetails.schema.safeParse({
        ...validData,
        winner: undefined,
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if value is not a player or a draw.', () => {
      const result = matchResultDetails.schema.safeParse({
        ...validData,
        winner: 2,
      });
      expect(result.success).toBe(false);
    });
  });
});
