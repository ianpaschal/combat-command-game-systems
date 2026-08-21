import {
  describe,
  expect,
  it,
} from 'vitest';

import { MissionType } from '../static/missionTypes';
import { GameSystemConfig, gameSystemConfig } from './gameSystemConfig';

describe('BoltActionV3.gameSystemConfig', () => {

  const validData: GameSystemConfig = {
    points: 1000,
    maxOrderDice: 12,
    maxUnits: 15,
    missionTypes: [MissionType.Battle],
  };

  it('accepts valid data.', () => {
    const result = gameSystemConfig.schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe('.points', () => {
    it('should emit an error if value is missing.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        points: undefined,
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if value is negative.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        points: -1,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.maxOrderDice', () => {
    it('should emit an error if value is missing.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        maxOrderDice: undefined,
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if value is negative.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        maxOrderDice: -1,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.maxUnits', () => {
    it('should emit an error if value is missing.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        maxUnits: undefined,
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if value is negative.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        maxUnits: -1,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.missionTypes', () => {
    it('should emit an error if value is missing.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        missionTypes: undefined,
      });
      expect(result.success).toBe(false);
    });

    it('should emit an error if the array is empty.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        missionTypes: [],
      });
      expect(result.success).toBe(false);
    });

    it('accepts more than one mission type.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        missionTypes: [MissionType.Battle, MissionType.Story, MissionType.Custom],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('.getDefaultValues', () => {
    it('defaults missionTypes to Battle only.', () => {
      expect(gameSystemConfig.getDefaultValues().missionTypes).toEqual([MissionType.Battle]);
    });

    it('should not include tournamentScoring by default.', () => {
      expect(gameSystemConfig.getDefaultValues().tournamentScoring).toBeUndefined();
    });

    it('should not include tournamentScoring when tournament is false.', () => {
      expect(gameSystemConfig.getDefaultValues({ tournament: false }).tournamentScoring).toBeUndefined();
    });

    it('should include tournamentScoring when tournament is true.', () => {
      expect(gameSystemConfig.getDefaultValues({ tournament: true }).tournamentScoring).toEqual({
        win: 3,
        draw: 1,
        loss: 0,
      });
    });
  });

  describe('.getSchema', () => {
    it('should accept a missing tournamentScoring by default.', () => {
      const result = gameSystemConfig.getSchema().safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept a missing tournamentScoring when tournament is false.', () => {
      const result = gameSystemConfig.getSchema({ tournament: false }).safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should emit an error for a missing tournamentScoring when tournament is true.', () => {
      const result = gameSystemConfig.getSchema({ tournament: true }).safeParse(validData);
      expect(result.success).toBe(false);
    });

    it('should accept a populated tournamentScoring when tournament is true.', () => {
      const result = gameSystemConfig.getSchema({ tournament: true }).safeParse({
        ...validData,
        tournamentScoring: { win: 3, draw: 1, loss: 0 },
      });
      expect(result.success).toBe(true);
    });
  });
});
