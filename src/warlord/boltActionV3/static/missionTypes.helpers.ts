import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { MissionType, missionTypes } from './missionTypes';

export const getMissionTypeOptions = (): SelectOption<MissionType>[] => getOptions(missionTypes);

export const getMissionTypeDisplayName = (
  key?: MissionType,
): string | undefined => getDisplayName(missionTypes, key);
