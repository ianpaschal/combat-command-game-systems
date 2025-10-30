import {
  describe,
  expect,
  it,
} from 'vitest';

import { FlamesOfWarV4, TeamYankeeV2 } from '../../..';
import { isValidMissionPackVersion } from './isValidMissionPackVersion';

/**
 * No reason not to use the real thing. Mocks just makes more code to maintain and test.
 */
export const gameSystems = [
  {
    name: 'Flames of War v4',
    missionPackVersions: FlamesOfWarV4.missionPackVersions,
  },
  {
    name: 'Team Yankee v2',
    missionPackVersions: TeamYankeeV2.missionPackVersions,
  },
] as const;

describe('isValidMissionPackVersion()', () => {

  gameSystems.forEach(({ name, missionPackVersions }) => {

    describe(`when used with ${name} data`, () => {

      type MissionPackVersion = keyof NonNullable<Parameters<typeof isValidMissionPackVersion>[0]>;
      const validMissionPackVersion = Object.keys(missionPackVersions)[0] as MissionPackVersion;

      it('returns true for valid mission pack versions.', () => {
        expect(isValidMissionPackVersion(missionPackVersions, validMissionPackVersion)).toBe(true);
      });

      it('returns false for invalid mission pack versions.', () => {
        expect(isValidMissionPackVersion(missionPackVersions, 'invalid')).toBe(false);
        expect(isValidMissionPackVersion(missionPackVersions, undefined)).toBe(false);
        expect(isValidMissionPackVersion(missionPackVersions, null)).toBe(false);
        expect(isValidMissionPackVersion(missionPackVersions, 123)).toBe(false);
      });
    });
  });
});
