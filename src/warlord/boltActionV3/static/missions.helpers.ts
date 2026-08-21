import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { Mission, missions } from './missions';
import { MissionType } from './missionTypes';

export const getMissionOptions = (
  options?: { types?: MissionType[] },
): SelectOption<Mission>[] => getOptions(missions).filter(({ value }) => (
  options?.types === undefined || options.types.includes(missions[value].type)
));

export const getMissionDisplayName = (
  key?: Mission,
): string | undefined => getDisplayName(missions, key);

export const getMissionType = (
  key?: Mission,
): MissionType | undefined => (key && key in missions ? missions[key].type : undefined);
