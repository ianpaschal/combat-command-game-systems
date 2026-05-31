import {
  describe,
  expect,
  it,
} from 'vitest';

import { MissionPackVersion } from '../static/missionPackVersions';
import { PointsVersion } from '../static/pointsVersions';
import { GameSystemConfig,gameSystemConfig } from './gameSystemConfig';

describe('GreatWarV4.gameSystemConfig', () => {

  const validData: GameSystemConfig = {
    points: 100,
    pointsVersion: PointsVersion.Original,
    missionPackVersion: MissionPackVersion.RuleBook,
  };

  it('accepts valid data.', () => {
    const result = gameSystemConfig.schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe('.pointsVersion', () => {
    it('should emit an error if value is missing.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        pointsVersion: undefined,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('.missionPackVersion', () => {
    it('should emit an error if value is missing.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        missionPackVersion: undefined,
      });
      expect(result.success).toBe(false);
    });
  });
});
