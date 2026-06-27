import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { Unit, units } from './units';

export const getUnitOptions = (): SelectOption<Unit>[] => getOptions(units);

export const getUnitDisplayName = (
  key: Unit,
): string | undefined => getDisplayName(units, key);
