import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { DynamicPointsVersionMetadata } from '../../_shared/types';
import { Era } from './eras';

export enum DynamicPointsVersion {
  Original = 'original',
  Dynamic2024 = '2024_07',
  Dynamic2025 = '2025_01',
}

export const dynamicPointsVersions: Record<DynamicPointsVersion, DynamicPointsVersionMetadata<Era>> = {
  [DynamicPointsVersion.Original]: {
    displayName: 'Original Book',
    publishedAt: '2015-01-01T00:00:00+00:00',
    activeAt: '2015-01-01T00:00:00+00:00',
    era: Era.Default,
  },
  [DynamicPointsVersion.Dynamic2024]: {
    displayName: 'Dynamic (2024)',
    publishedAt: '2024-06-01T00:00:00+13:00',
    activeAt: '2024-07-01T00:00:00+13:00',
    era: Era.Default,
  },
  [DynamicPointsVersion.Dynamic2025]: {
    displayName: 'Dynamic (2025)',
    publishedAt: '2024-12-13T00:00:00+13:00',
    activeAt: '2025-01-01T00:00:00+13:00',
    era: Era.Default,
  },
} as const;

export const getDynamicPointsVersionOptions = (): SelectOption<DynamicPointsVersion>[] => getOptions(dynamicPointsVersions);

export const getDynamicPointsVersionDisplayName = (
  key: DynamicPointsVersion,
): string | undefined => getDisplayName(dynamicPointsVersions, key);
