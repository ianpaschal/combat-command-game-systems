import { MissionPackMetadata } from '../types';
import { isValidMissionPackVersion } from './isValidMissionPackVersion';

/**
 * Factory that builds a function to retrieve mission pack data for a given mission pack version.
 *
 * @param missionPackVersions Map of mission pack versions to their metadata.
 * @returns Function that returns mission pack data or null if not found.
 */
export const createGetMissionPack = <TMissionPackVersion extends string, TMissionMatrix extends string>(
  missionPackVersions: Record<TMissionPackVersion, MissionPackMetadata<TMissionMatrix>>,
) => (
  missionPackVersion?: TMissionPackVersion,
): MissionPackMetadata<TMissionMatrix> | null => {
  if (!isValidMissionPackVersion(missionPackVersions, missionPackVersion)) {
    return null;
  }
  return missionPackVersions[missionPackVersion];
};
