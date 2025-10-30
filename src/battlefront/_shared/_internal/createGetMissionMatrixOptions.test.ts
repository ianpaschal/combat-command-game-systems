import {
  describe,
  expect,
  it,
} from 'vitest';

import { mockMissionPackVersions } from '../_fixtures/mockMissionPack';
import { createGetMissionMatrixOptions } from './createGetMissionMatrixOptions';

describe('getMissionOptions()', () => {
  
  const handler = createGetMissionMatrixOptions(mockMissionPackVersions);

  // Happy
  it('returns all mission matrix options for the mission pack version.', () => {
    const result = handler('mock_mission_pack_version');
    expect(result).toEqual([
      { value: 'mock_matrix', label: 'Mock Matrix' },
    ]);
  });
      
  // Fallbacks
  it('returns [] when the mission pack version is missing.', () => {
    const result = handler(undefined);
    expect(result).toEqual([]);
  });

  it('returns [] when the mission pack version is invalid.', () => {
    const result = handler('invalid' as Parameters<typeof handler>[0]);
    expect(result).toEqual([]);
  });
});
