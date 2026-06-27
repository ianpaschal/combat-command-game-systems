import { SelectOption } from '../../../common';
import { getOptions } from '../../../common/_internal';
import { Era, eras } from './eras';

export const getEraOptions = (): SelectOption<Era>[] => getOptions(eras);

export const getEraDisplayName = (
  key: Era,
  useShortName: boolean = false,
): string => {
  const { displayName, shortName } = eras[key];
  return useShortName ? shortName : displayName;
};
