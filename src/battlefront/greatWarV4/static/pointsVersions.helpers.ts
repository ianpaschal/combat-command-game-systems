import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { PointsVersion, pointsVersions } from './pointsVersions';

export const getPointsVersionOptions = (): SelectOption<PointsVersion>[] => getOptions(pointsVersions);

export const getPointsVersionDisplayName = (
  key: PointsVersion,
): string | undefined => getDisplayName(pointsVersions, key);
