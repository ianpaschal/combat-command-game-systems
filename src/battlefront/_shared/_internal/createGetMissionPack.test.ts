import {
  describe,
  expect,
  it,
} from 'vitest';

import { mockMissionPackVersions } from '../_fixtures/mockMissionPack';
import { createGetMissionPack } from './createGetMissionPack';

describe('getMissionPack()', () => {

  const handler = createGetMissionPack(mockMissionPackVersions);

  // Happy
  it('returns mission pack data for a valid mission pack version.', () => {
    const result = handler('mock_mission_pack_version');
    expect(result).toEqual(mockMissionPackVersions['mock_mission_pack_version']);
  });

  // Fallbacks
  it('returns null for invalid mission pack version.', () => {
    const result = handler('invalid' as Parameters<typeof handler>[0]);
    expect(result).toBeNull();
  });
});
