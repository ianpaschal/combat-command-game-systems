import { MissionPackMetadata } from '../types';

/**
 * Type guard that checks if a version string is a valid mission pack version.
 *
 * Determines whether the provided version exists as a key in the mission pack versions record. Used
 * to narrow the type from `unknown` to the specific version type.
 *
 * @param missionPackVersions Record mapping mission pack versions to their metadata.
 * @param version Version string to validate, typically unknown at compile time.
 * @returns True if version is a valid key in missionPackVersions, false otherwise.
 */
export const isValidMissionPackVersion = <TMissionPackVersion extends string, TMissionMatrix extends string>(
  missionPackVersions: Record<TMissionPackVersion, MissionPackMetadata<TMissionMatrix>>,
  version: unknown,
): version is TMissionPackVersion => (
  Object.keys(missionPackVersions).includes(version as TMissionPackVersion)
);
