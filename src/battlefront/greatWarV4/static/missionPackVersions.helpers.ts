import { SelectOption } from '../../../common';
import { getDisplayName } from '../../../common/_internal';
import { getOptions } from '../../../common/_internal/getOptions';
import { MissionPackVersion, missionPackVersions } from './missionPackVersions';

export const getMissionPackVersionOptions = (): SelectOption<MissionPackVersion>[] => getOptions(missionPackVersions);

export const getMissionPackVersionDisplayName = (
  key: MissionPackVersion,
): string | undefined => getDisplayName(missionPackVersions, key);
