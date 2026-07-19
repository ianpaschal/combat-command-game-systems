import { SelectOption } from '../../../common';
import { getDisplayName } from '../../../common/_internal';
import { DynamicPointsVersionMetadata } from '../../_shared/types';
import { DynamicPointsVersion, dynamicPointsVersions } from './dynamicPointsVersions';
import { Era } from './eras';

export const getDynamicPointsVersionOptions = (
  era?: string,
): SelectOption<DynamicPointsVersion>[] => {
  if (!era) {
    return [];
  }
  const versions = Object.entries(dynamicPointsVersions) as [DynamicPointsVersion, DynamicPointsVersionMetadata<Era>][];
  return versions.filter(([, metadata]) => metadata.era === era).map(([key, { displayName }]) => ({
    value: key,
    label: displayName,
  }));
};

export const getDynamicPointsVersionDisplayName = (
  key: DynamicPointsVersion,
): string | undefined => getDisplayName(dynamicPointsVersions, key);
