import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { PointsVersionMetadata } from '../types';

export enum PointsVersion {
  Original = 'original', // 2019 Book (ISBN: 9780995104266)
}

export const pointsVersions: Record<PointsVersion, PointsVersionMetadata> = {
  [PointsVersion.Original]: {
    displayName: 'Original Book',
    publishedAt: '2019-01-01T00:00:00+00:00',
    activeAt: '2019-01-01T00:00:00+00:00',
  },
} as const;

export const getPointsVersionOptions = (): SelectOption<PointsVersion>[] => getOptions(pointsVersions);

export const getPointsVersionDisplayName = (
  key: PointsVersion,
): string | undefined => getDisplayName(pointsVersions, key);
