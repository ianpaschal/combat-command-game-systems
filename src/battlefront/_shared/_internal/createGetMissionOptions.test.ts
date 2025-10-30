import {
  describe,
  expect,
  it,
} from 'vitest';

import { mockMissionPackVersions } from '../_fixtures/mockMissionPack';
import { validateOptionSet } from '../_fixtures/validateOptionSet';
import { BattlePlan } from '../static/battlePlans';
import { MissionName } from '../static/missionNames';
import { createGetMissionOptions } from './createGetMissionOptions';

describe('getMissionOptions()', () => {

  const handler = createGetMissionOptions(mockMissionPackVersions);
  const allMissions = [
    MissionName.DustUp,
    MissionName.NoRetreat,
  ];
    
  // Happy
  describe('when a matrix and battle plans are provided', () => {

    it('returns valid mission options when the matrix has an entry for the provided battle plans.', () => {        
      const result = handler('mock_mission_pack_version', 'mock_matrix', [
        BattlePlan.Attack,
        BattlePlan.Defend,
      ]);
      validateOptionSet(result, [MissionName.NoRetreat], [MissionName.DustUp]);
    });

    it('returns all mission options when the matrix does not have an entry for the provided battle plans.', () => {
      const result = handler('mock_mission_pack_version', 'mock_matrix', [
        BattlePlan.Attack,
        BattlePlan.Maneuver,
      ]);
      validateOptionSet(result, allMissions, [MissionName.Bypass]);
    });
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

  it('returns all mission options when the matrix is missing.', () => {
    const result = handler('mock_mission_pack_version', undefined);
    validateOptionSet(result, allMissions, [MissionName.Bypass]);
  });

  it('returns all mission options when the matrix is provided but the battle plans are missing.', () => {
    const result = handler('mock_mission_pack_version', 'mock_matrix', undefined);
    validateOptionSet(result, allMissions, [MissionName.Bypass]);
  });
});
