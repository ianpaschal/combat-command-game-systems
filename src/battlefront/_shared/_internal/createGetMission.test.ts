import {
  describe,
  expect,
  it,
} from 'vitest';

import { mockMissionPackVersions } from '../_fixtures/mockMissionPack';
import { MissionName } from '../static/missionNames';
import { createGetMission } from './createGetMission';

describe('getMission()', () => {

  const handler = createGetMission(mockMissionPackVersions);

  // Happy
  it('returns mission data for a valid mission from a valid mission pack.', () => {
    const result = handler('mock_mission_pack_version', MissionName.NoRetreat);
    expect(result).toEqual(mockMissionPackVersions['mock_mission_pack_version'].missions[MissionName.NoRetreat]);
  });

  // Fallbacks
  it('returns null for invalid mission pack version.', () => {
    const result = handler('invalid' as Parameters<typeof handler>[0]);
    expect(result).toBeNull();
  });

  it('returns null when mission name is not provided.', () => {
    const result = handler('mock_mission_pack_version', undefined);
    expect(result).toBeNull();
  });

  it('returns null for a missing mission.', () => {
    const result = handler('mock_mission_pack_version', 'invalid' as MissionName);
    expect(result).toBeNull();
  });
});
