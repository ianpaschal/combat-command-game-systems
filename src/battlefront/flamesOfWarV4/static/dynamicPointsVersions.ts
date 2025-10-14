import { getDisplayName, getOptions } from '../../../common/_internal';
import { DynamicPointsVersionMetadata } from '../../_shared/types';
import { Era } from './eras';

export enum DynamicPointsVersion {
  MWOriginal = 'mw_original',
  MW2023 = 'mw_2023',
  MW2024 = 'mw_2024',
  MW2025 = 'mw_2025',
}

export const dynamicPointsVersions: Record<DynamicPointsVersion, DynamicPointsVersionMetadata<Era>> = {
  [DynamicPointsVersion.MWOriginal]: {
    displayName: 'Original Book',
    publishedAt: '2015-01-01T00:00:00+00:00',
    activeAt: '2015-01-01T00:00:00+00:00',
    era: Era.MW,
  },
  [DynamicPointsVersion.MW2023]: {
    displayName: '2023',
    publishedAt: '2023-02-09T13:00:00+13:00',
    activeAt: '2023-02-09T13:00:00+13:00',
    era: Era.MW,
  },
  [DynamicPointsVersion.MW2024]: {
    displayName: '2024',
    publishedAt: '2023-12-20T13:00:00+13:00',
    activeAt: '2024-01-01T13:00:00+13:00',
    era: Era.MW,
  },
  [DynamicPointsVersion.MW2025]: {
    displayName: '2025',
    publishedAt: '2024-12-13T13:00:00+13:00',
    activeAt: '2025-01-01T13:00:00+13:00',
    era: Era.MW,
  },
} as const;

export const getDynamicPointsVersionOptions = () => getOptions(dynamicPointsVersions);

export const getDynamicPointsVersionDisplayName = (
  key: DynamicPointsVersion,
) => getDisplayName(dynamicPointsVersions, key);
