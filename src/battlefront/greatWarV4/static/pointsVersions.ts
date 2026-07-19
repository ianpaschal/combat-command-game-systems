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
