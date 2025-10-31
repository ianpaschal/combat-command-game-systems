import { MissionName } from '../static/missionNames';
import { MissionData, MissionPackMetadata } from '../types';
import { isValidMissionPackVersion } from './isValidMissionPackVersion';

/**
 * Factory that builds a function to retrieve mission metadata for a given mission pack version and
 * mission name.
 *
 * @param missionPackVersions - Map of mission pack versions to their metadata
 * @returns Function that returns mission data or null if not found
 */
export const createGetMission = <TMissionPackVersion extends string, TMissionMatrix extends string>(
  missionPackVersions: Record<TMissionPackVersion, MissionPackMetadata<TMissionMatrix>>,
) => (
  missionPackVersion?: TMissionPackVersion,
  missionName?: MissionName,
): MissionData | null => {
  if (!isValidMissionPackVersion(missionPackVersions, missionPackVersion) || !missionName) {
    return null;
  }
  return missionPackVersions[missionPackVersion].missions[missionName] ?? null;
};
