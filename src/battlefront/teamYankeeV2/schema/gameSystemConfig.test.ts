import {
  describe,
  expect,
  it,
} from 'vitest';

import { getSchemaFieldErrors } from '../../../common/_internal/getSchemaFieldErrors';
import { DynamicPointsVersion } from '../static/dynamicPointsVersions';
import { Era } from '../static/eras';
import { FieldManual101Version } from '../static/fieldManual101Versions';
import { MissionMatrix, MissionPackVersion } from '../static/missionPackVersions';
import { GameSystemConfig,gameSystemConfig } from './gameSystemConfig';

describe('TeamYankeeV2.gameSystemConfig', () => {

  const validData: GameSystemConfig = {
    dynamicPointsVersion: DynamicPointsVersion.Dynamic2025,
    era: Era.Default,
    fieldManual101Version: FieldManual101Version.Mar2024,
    missionMatrix: MissionMatrix.Extended,
    missionPackVersion: MissionPackVersion.Apr2023,
    points: 100,
  };

  it('accepts valid data.', () => {
    const result = gameSystemConfig.schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe('.fieldManual101Version', () => {
    it('should emit an error if value is missing.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        fieldManual101Version: undefined,
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'fieldManual101Version')).toContain('Please select a FM101 version.');
    });
  });

  describe('.dynamicPointsVersion', () => {
    it('should emit an error if value is not an valid version for the selected era.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        era: Era.Early,
        dynamicPointsVersion: DynamicPointsVersion.Original,
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
    // NOTE: There is no combination right now which would be invalid, so test is skipped.
    it.skip('should emit an error if value is not an valid mission matrix for the selected mission pack version.', () => {
      const result = gameSystemConfig.schema.safeParse({
        ...validData,
        missionPackVersion: MissionPackVersion.Apr2023,
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
