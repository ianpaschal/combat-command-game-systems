import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { LessonsFromTheFrontVersionMetadata } from '../types';

export enum LessonsFromTheFrontVersion {
  Dec2018 = '2018_12',
  Oct2019 = '2019_10',
  Mar2023 = '2023_03',
  Mar2024 = '2024_03',
  Aug2025 = '2025_08',
}

export const lessonsFromTheFrontVersions: Record<LessonsFromTheFrontVersion, LessonsFromTheFrontVersionMetadata> = {
  [LessonsFromTheFrontVersion.Dec2018]: {
    displayName: 'December 2018',
    publishedAt: '2018-12-01T13:00:00+13:00',
  },
  [LessonsFromTheFrontVersion.Oct2019]: {
    displayName: 'October 2019',
    publishedAt: '2019-10-01T13:00:00+13:00',
  },
  // Presumably 1 or 2 missing...
  [LessonsFromTheFrontVersion.Mar2023]: {
    displayName: 'March 2023',
    publishedAt: '2023-03-01T13:00:00+13:00',
  },
  [LessonsFromTheFrontVersion.Mar2024]: {
    displayName: 'March 2024',
    publishedAt: '2024-03-01T13:00:00+13:00',
  },
  [LessonsFromTheFrontVersion.Aug2025]: {
    displayName: 'August 2025',
    publishedAt: '2025-09-19T13:00:00+13:00',
  },
} as const;

export const getLessonsFromTheFrontVersionOptions = (): SelectOption<LessonsFromTheFrontVersion>[] => getOptions(lessonsFromTheFrontVersions);

export const getLessonsFromTheFrontVersionDisplayName = (
  key: LessonsFromTheFrontVersion,
): string | undefined => getDisplayName(lessonsFromTheFrontVersions, key);
