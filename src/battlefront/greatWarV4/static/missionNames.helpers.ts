import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { MissionName, missionNames } from './missionNames';

export const getMissionNameOptions = (): SelectOption<MissionName>[] => getOptions(missionNames);

export const getMissionDisplayName = (
  key?: MissionName,
): string | undefined => getDisplayName(missionNames, key);
