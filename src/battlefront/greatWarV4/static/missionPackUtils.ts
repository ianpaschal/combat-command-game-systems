import { SelectOption } from '../../../common';
import {
  getMatchOutcomeTypeOptions,
  MatchOutcomeType,
} from '../../_shared/static/matchOutcomeTypes';
import { MissionData, MissionPackMetadata } from '../types';
import { MissionName } from './missionNames';
import { getMissionNameOptions } from './missionNames.helpers';
import {
  MissionPackVersion,
  missionPackVersions as rawMissionPackVersions,
} from './missionPackVersions';

const missionPackVersions = rawMissionPackVersions as Record<MissionPackVersion, MissionPackMetadata>;

const isValidMissionPackVersion = (version: unknown): version is MissionPackVersion => (
  Object.keys(missionPackVersions).includes(version as MissionPackVersion)
);

const getMissionPackData = (
  missionPackVersion?: MissionPackVersion,
): MissionPackMetadata | null => {
  if (!isValidMissionPackVersion(missionPackVersion)) {
    return null;
  }
  return missionPackVersions[missionPackVersion];
};

export const getMission = (
  missionPackVersion?: MissionPackVersion,
  missionName?: MissionName,
): MissionData | null => {
  if (!isValidMissionPackVersion(missionPackVersion) || !missionName) {
    return null;
  }
  return missionPackVersions[missionPackVersion].missions[missionName] ?? null;
};

export const getMissionMatrixOptions = (
  _missionPackVersion?: MissionPackVersion | string,
): SelectOption<never>[] => [];

export const getMissionOptions = (
  missionPackVersion?: MissionPackVersion,
): SelectOption<MissionName>[] => {
  const pack = getMissionPackData(missionPackVersion);
  if (!pack) {
    return [];
  }
  const packMissionIds = new Set(Object.keys(pack.missions) as MissionName[]);
  return getMissionNameOptions().filter((option) => packMissionIds.has(option.value));
};

export const getMissionOutcomeOptions = (
  missionPackVersion?: MissionPackVersion,
  missionName?: MissionName,
): SelectOption<MatchOutcomeType>[] => {
  if (!isValidMissionPackVersion(missionPackVersion) || !missionName) {
    return [];
  }
  const mission = missionPackVersions[missionPackVersion].missions[missionName] ?? null;
  if (!mission) {
    return [];
  }
  const validOutcomes: Set<MatchOutcomeType> = new Set([
    MatchOutcomeType.ForceBroken,
    MatchOutcomeType.TimeOut,
    ...mission.victoryConditions,
  ]);
  return getMatchOutcomeTypeOptions().filter((option) => validOutcomes.has(option.value));
};

export const getMissionPack = getMissionPackData;
