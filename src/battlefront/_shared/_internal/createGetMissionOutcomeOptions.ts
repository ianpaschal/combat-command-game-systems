import { SelectOption } from '../../../common';
import { getMatchOutcomeTypeOptions, MatchOutcomeType } from '../static/matchOutcomeTypes';
import { MissionName } from '../static/missionNames';
import { MissionPackMetadata } from '../types';
import { isValidMissionPackVersion } from './isValidMissionPackVersion';

/**
 * Factory that builds a function to return valid match outcome options for a given mission pack
 * version and mission.
 *
 * @param missionPackVersions Map of mission pack versions to their metadata.
 * @returns Function that returns filtered outcome options for the inputs.
 */
export const createGetMissionOutcomeTypeOptions = <TMissionPackVersion extends string, TMissionMatrix extends string>(
  missionPackVersions: Record<TMissionPackVersion, MissionPackMetadata<TMissionMatrix>>,
) => (
  missionPackVersion?: TMissionPackVersion,
  missionName?: MissionName,
): SelectOption<MatchOutcomeType>[] => {
  if (!isValidMissionPackVersion(missionPackVersions, missionPackVersion) || !missionName) {
    return [];
  }
  const mission = missionPackVersions[missionPackVersion].missions[missionName] ?? null;
  if (!mission) {
    return [];
  }
  const validOutcomes: Set<MatchOutcomeType> = new Set([
    MatchOutcomeType.ForceBroken, // Always possible
    MatchOutcomeType.TimeOut, // Always possible
    ...mission.victoryConditions,
  ]);
  return getMatchOutcomeTypeOptions().filter((option) => validOutcomes.has(option.value));
};
