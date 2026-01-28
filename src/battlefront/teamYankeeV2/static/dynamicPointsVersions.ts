import { SelectOption } from '../../../common';
import { getDisplayName } from '../../../common/_internal';
import { DynamicPointsVersionMetadata } from '../../_shared/types';
import { Era } from './eras';

export enum DynamicPointsVersion {
  CCOriginal = 'cc_original',
  Original = 'original', // FIXME: Rename to wwiii_original, required DB migration
  Dynamic2024 = '2024_07', // FIXME: Rename to wwiii_dynamic_2024_07, required DB migration
  Dynamic2025 = '2025_01', // FIXME: Rename to wwiii_dynamic_2025_01, required DB migration
}

export const dynamicPointsVersions: Record<DynamicPointsVersion, DynamicPointsVersionMetadata<Era>> = {
  [DynamicPointsVersion.CCOriginal]: {
    displayName: 'Original Book',
    publishedAt: '2015-01-01T00:00:00+00:00',
    activeAt: '2015-01-01T00:00:00+00:00',
    era: Era.Early,
  },
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

export const getDynamicPointsVersionOptions = (
  era?: string,
): SelectOption<DynamicPointsVersion>[] => {
  if (!era) {
    return [];
  }
  const versions = Object.entries(dynamicPointsVersions) as [DynamicPointsVersion, DynamicPointsVersionMetadata<Era>][];
  return versions.filter(([_, metadata]) => metadata.era === era).map(([key, { displayName }]) => ({
    value: key,
    label: displayName,
  }));
};

export const getDynamicPointsVersionDisplayName = (
  key: DynamicPointsVersion,
): string | undefined => getDisplayName(dynamicPointsVersions, key);
