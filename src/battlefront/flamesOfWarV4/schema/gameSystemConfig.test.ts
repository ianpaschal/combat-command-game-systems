import {
  describe,
  expect,
  it,
} from 'vitest';

import { getSchemaFieldErrors } from '../../../common/_internal/getSchemaFieldErrors';
import { DynamicPointsVersion } from '../static/dynamicPointsVersions';
import { Era } from '../static/eras';
import { LessonsFromTheFrontVersion } from '../static/lessonsFromTheFrontVersions';
import { MissionMatrix, MissionPackVersion } from '../static/missionPackVersions';
import { GameSystemConfig,gameSystemConfig } from './gameSystemConfig';

describe('FlamesOfWarV4.gameSystemConfig', () => {

  const validData: GameSystemConfig = {
    dynamicPointsVersion: DynamicPointsVersion.LWOriginal,
    era: Era.LW,
    lessonsFromTheFrontVersion: LessonsFromTheFrontVersion.Aug2025,
    missionMatrix: MissionMatrix.Extended,
    missionPackVersion: MissionPackVersion.Apr2023,
    points: 100,
  };

  it('accepts valid data.', () => {
    const result = gameSystemConfig.schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe('.lessonsFromTheFrontVersion', () => {
    it('should emit an error if value is missing.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        lessonsFromTheFrontVersion: undefined,
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'lessonsFromTheFrontVersion')).toContain('Please select a LFTF version.');
    });
  });

  describe('.dynamicPointsVersion', () => {
    it('should emit an error if value is not an valid version for the selected era.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        era: Era.LW,
        dynamicPointsVersion: DynamicPointsVersion.MWDynamic2025,
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'dynamicPointsVersion')).toContain('Please select a valid dynamic points version for the selected era.');
    });
  });

  describe('.missionMatrix', () => {
    it('should emit an error if value is missing.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        missionMatrix: undefined,
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'missionMatrix')).toContain('Please select a mission matrix.');
    });
    it('should emit an error if value is not an valid mission matrix for the selected mission pack version.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        missionPackVersion: MissionPackVersion.Jul2024,
        missionMatrix: MissionMatrix.Extended,
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'missionMatrix')).toContain('Please select a valid mission matrix.');
    });
  });

  describe('.missionPackVersion', () => {
    it('should emit an error if value is missing.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        missionPackVersion: undefined,
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'missionPackVersion')).toContain('Please select a mission pack version.');
    });
  });
});
