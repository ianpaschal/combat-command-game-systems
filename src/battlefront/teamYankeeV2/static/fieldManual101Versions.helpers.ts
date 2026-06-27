import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { FieldManual101Version, fieldManual101Versions } from './fieldManual101Versions';

export const getFieldManual101VersionOptions = (): SelectOption<FieldManual101Version>[] => getOptions(fieldManual101Versions);

export const getFieldManual101VersionDisplayName = (
  key: FieldManual101Version,
): string | undefined => getDisplayName(fieldManual101Versions, key);
