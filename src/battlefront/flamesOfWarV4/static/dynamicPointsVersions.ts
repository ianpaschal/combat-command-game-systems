import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { DynamicPointsVersionMetadata } from '../../_shared/types';
import { Era } from './eras';

export enum DynamicPointsVersion {
  MWOriginal = 'mw_original',
  MWDynamic2023 = 'mw_dynamic_2023',
  MWDynamic2024 = 'mw_dynamic_2024',
  MWDynamic2025 = 'mw_dynamic_2025',
  LWOriginal = 'lw_original',
  LWDynamic2026Proposed = 'lw_dynamic_2025_proposed',
  LWDynamic2026 = 'lw_dynamic_2025',
}

export const dynamicPointsVersions: Record<DynamicPointsVersion, DynamicPointsVersionMetadata<Era>> = {
  [DynamicPointsVersion.MWOriginal]: {
    displayName: 'Original Book',
    publishedAt: '2015-01-01T00:00:00+00:00',
    activeAt: '2015-01-01T00:00:00+00:00',
    era: Era.MW,
  },
  [DynamicPointsVersion.MWDynamic2023]: {
    displayName: 'Dynamic (2023)',
    publishedAt: '2023-02-09T13:00:00+13:00',
    activeAt: '2023-02-09T13:00:00+13:00',
    era: Era.MW,
  },
  [DynamicPointsVersion.MWDynamic2024]: {
    displayName: 'Dynamic (2024)',
    publishedAt: '2023-12-20T13:00:00+13:00',
    activeAt: '2024-01-01T13:00:00+13:00',
    era: Era.MW,
  },
  [DynamicPointsVersion.MWDynamic2025]: {
    displayName: 'Dynamic (2025)',
    publishedAt: '2024-12-13T13:00:00+13:00',
    activeAt: '2025-01-01T13:00:00+13:00',
    era: Era.MW,
  },
  [DynamicPointsVersion.LWOriginal]: {
    displayName: 'Original Book',
    publishedAt: '2015-01-01T00:00:00+00:00',
    activeAt: '2015-01-01T00:00:00+00:00',
    era: Era.LW,
  },
  [DynamicPointsVersion.LWDynamic2026Proposed]: {
    displayName: 'Dynamic (2026 - Proposed)',
    publishedAt: '2015-01-01T00:00:00+00:00',
    activeAt: '2015-01-01T00:00:00+00:00',
    era: Era.LW,
  },
  [DynamicPointsVersion.LWDynamic2026]: {
    displayName: 'Dynamic (2026)',
    publishedAt: '2025-12-24T00:00:00+00:00',
    activeAt: '2026-01-01T00:00:00+00:00',
    era: Era.LW,
  },
} as const;

export const getDynamicPointsVersionOptions = (): SelectOption<DynamicPointsVersion>[] => getOptions(dynamicPointsVersions);

export const getDynamicPointsVersionDisplayName = (
  key: DynamicPointsVersion,
): string | undefined => getDisplayName(dynamicPointsVersions, key);
