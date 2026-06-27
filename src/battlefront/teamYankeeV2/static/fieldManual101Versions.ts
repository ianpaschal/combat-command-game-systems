import { FieldManual101VersionMetadata } from '../types';

export enum FieldManual101Version {
  Mar2024 = '2024_03',
}

export const fieldManual101Versions: Record<FieldManual101Version, FieldManual101VersionMetadata> = {

  // Presumably several missing...
  [FieldManual101Version.Mar2024]: {
    displayName: 'March 2024',
    publishedAt: '2024-03-01T00:00:00+13:00',
  },
} as const;
