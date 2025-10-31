import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { SeriesMetadata } from '../../_shared/types';
import { Era } from './eras';

export enum Series {
  Bagration = 'bagration',
  Berlin = 'berlin',
  Bulge = 'bulge',
  DDay = 'd_day',
  EasternFront = 'eastern_front',
  FortressEurope = 'fortress_europe',
  Leviathans = 'leviathans',
  NorthAfrica = 'north_africa',
  Pacific = 'pacific',
}

export const series: Record<Series, SeriesMetadata<Era>> = {
  [Series.Bagration]: {
    displayName: 'Bagration',
    era: Era.LW,
  },
  [Series.Berlin]: {
    displayName: 'Berlin',
    era: Era.LW,
  },
  [Series.Bulge]: {
    displayName: 'Bulge',
    era: Era.LW,
  },
  [Series.DDay]: {
    displayName: 'D-Day',
    era: Era.LW,
  },
  [Series.EasternFront]: {
    displayName: 'Eastern Front',
    era: Era.MW,
  },
  [Series.FortressEurope]: {
    displayName: 'Fortress Europe',
    era: Era.LW,
  },
  [Series.Leviathans]: {
    displayName: 'Leviathans',
    era: Era.LW,
  },
  [Series.NorthAfrica]: {
    displayName: 'North Africa',
    era: Era.MW,
  },
  [Series.Pacific]: {
    displayName: 'The Pacific',
    era: Era.MW,
  },
} as const;

export const getSeriesOptions = (): SelectOption<Series>[] => getOptions(series);

export const getSeriesDisplayName = (
  key: Series,
): string | undefined => getDisplayName(series, key);
