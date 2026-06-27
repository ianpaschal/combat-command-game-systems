import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { Series, series } from './series';

export const getSeriesOptions = (): SelectOption<Series>[] => getOptions(series);

export const getSeriesDisplayName = (
  key: Series,
): string | undefined => getDisplayName(series, key);
