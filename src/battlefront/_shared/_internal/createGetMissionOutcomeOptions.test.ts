import {
  describe,
  expect,
  it,
} from 'vitest';

import { mockMissionPackVersions } from '../_fixtures/mockMissionPack';
import { validateOptionSet } from '../_fixtures/validateOptionSet';
import { MatchOutcomeType } from '../static/matchOutcomeTypes';
import { MissionName } from '../static/missionNames';
import { createGetMissionOutcomeTypeOptions } from './createGetMissionOutcomeOptions';

describe('getMissionOutcomeTypeOptions()', () => {

  const handler = createGetMissionOutcomeTypeOptions(mockMissionPackVersions);

  // Happy
  it('returns all valid outcomes for the mission.', () => {
    const result = handler('mock_mission_pack_version', MissionName.NoRetreat);
    validateOptionSet(result, [
      MatchOutcomeType.AttackRepelled,
      MatchOutcomeType.ForceBroken,
      MatchOutcomeType.ObjectiveTaken,
      MatchOutcomeType.TimeOut,
    ], [
      MatchOutcomeType.MaxPointsReached,
    ]);
  });
      
  // Fallbacks
  it('returns [] when the mission pack version is invalid.', () => {
    const result = handler('invalid' as Parameters<typeof handler>[0]);
    expect(result).toEqual([]);
  });

  it('returns [] when the mission pack version is missing.', () => {
    const result = handler(undefined, MissionName.NoRetreat);
    expect(result).toEqual([]);
  });

  it('returns [] when the mission name is missing.', () => {
    const result = handler('mock_mission_pack_version', undefined);
    expect(result).toEqual([]);
  });

  it('returns [] when mission not found for a valid mission pack version.', () => {
    const result = handler('mock_mission_pack_version', 'invalid' as MissionName);
    expect(result).toEqual([]);
  });
});
