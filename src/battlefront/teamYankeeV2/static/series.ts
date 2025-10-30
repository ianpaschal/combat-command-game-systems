import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { SeriesMetadata } from '../../_shared/types';
import { Era } from './eras';

export enum Series {
  Default = 'default',
  NatoForces = 'nato_forces',
  NordicForces = 'nordic_forces',
  OilWar = 'oil_war',
  RedDawn = 'red_dawn',
  WarsawPact = 'warsaw_pact',
}

export const series: Record<Series, SeriesMetadata<Era>> = {
  [Series.Default]: {
    displayName: '-',
    era: Era.Default,
  },
  [Series.NatoForces]: {
    displayName: 'Nato Forces',
    era: Era.Default,
  },
  [Series.NordicForces]: {
    displayName: 'Nordic Forces',
    era: Era.Default,
  },
  [Series.OilWar]: {
    displayName: 'Oil War',
    era: Era.Default,
  },
  [Series.RedDawn]: {
    displayName: 'Red Dawn',
    era: Era.Default,
  },
  [Series.WarsawPact]: {
    displayName: 'Warsaw Pact',
    era: Era.Default,
  },
} as const;

export const getSeriesOptions = (): SelectOption<Series>[] => getOptions(series);

export const getSeriesDisplayName = (
  key: Series,
): string | undefined => getDisplayName(series, key);
