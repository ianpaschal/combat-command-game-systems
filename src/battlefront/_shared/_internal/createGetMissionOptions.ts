import { SelectOption } from '../../../common';
import { BattlePlan } from '../static/battlePlans';
import { getMissionNameOptions, MissionName } from '../static/missionNames';
import { MissionPackMetadata } from '../types';
import { isValidMissionPackVersion } from './isValidMissionPackVersion';

/**
 * Factory that builds a function to retrieve mission options for a given mission pack
 * version, mission matrix, and battle plans.
 *
 * @param missionPackVersions - Map of mission pack versions to their metadata
 * @returns Function that returns mission options
 */
export const createGetMissionOptions = <TMissionPackVersion extends string, TMissionMatrix extends string>(
  missionPackVersions: Record<TMissionPackVersion, MissionPackMetadata<TMissionMatrix>>,
) => (
  missionPackVersion?: TMissionPackVersion,
  missionMatrix?: TMissionMatrix,
  battlePlans?: [BattlePlan | undefined, BattlePlan | undefined],
): SelectOption<MissionName>[] => {
  if (!isValidMissionPackVersion(missionPackVersions, missionPackVersion)) {
    return [];
  }
  const pack = missionPackVersions[missionPackVersion];

  // Gather missions:
  const packMissionIds = new Set(Object.keys(pack.missions) as MissionName[]);
  const allMissionOptions: SelectOption<MissionName>[] = getMissionNameOptions().filter((option) => (
    packMissionIds.has(option.value)
  ));

  // If matrix or battle plans are missing or invalid, return all options:
  const matrix = missionMatrix ? pack.matrixes[missionMatrix] : undefined;
  if (!matrix || !battlePlans) {
    return allMissionOptions;
  }
  const matrixEntry = matrix.entries.find((entry) => entry.selector(...battlePlans));
  if (!matrixEntry) {
    return allMissionOptions;
  }

  // Otherwise return options for the given matrix and battle plans:
  const matrixMissionIds = matrixEntry.missions.reduce((acc, missionIds) => [
    ...acc,
    ...missionIds,
  ], []);

  return allMissionOptions.filter((item) => matrixMissionIds.includes(item.value));
};
