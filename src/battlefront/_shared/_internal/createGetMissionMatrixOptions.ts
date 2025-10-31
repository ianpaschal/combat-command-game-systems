import { SelectOption } from '../../../common';
import { MissionPackMetadata } from '../types';
import { isValidMissionPackVersion } from './isValidMissionPackVersion';

/**
 * Factory that builds a function to retrieve mission matrix options for a given mission pack version.
 *
 * @param missionPackVersions - Map of mission pack versions to their metadata
 * @returns Function that returns mission matrix options
 */
export const createGetMissionMatrixOptions = <TMissionPackVersion extends string, TMissionMatrix extends string>(
  missionPackVersions: Record<TMissionPackVersion, MissionPackMetadata<TMissionMatrix>>,
) => (
  missionPackVersion?: TMissionPackVersion,
): SelectOption<TMissionMatrix>[] => {
  if (!isValidMissionPackVersion(missionPackVersions, missionPackVersion)) {
    return [];
  }
  const missionPack = missionPackVersions[missionPackVersion];
  return Object.entries(missionPack.matrixes).map(([value, matrixData]) => ({
    value: value as TMissionMatrix,
    label: (matrixData as { displayName: string }).displayName,
  }));
};
