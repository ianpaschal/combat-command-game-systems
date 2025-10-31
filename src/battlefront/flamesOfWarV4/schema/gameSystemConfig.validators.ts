import { dynamicPointsVersions } from '../static/dynamicPointsVersions';
import { missionPackVersions } from '../static/missionPackVersions';
import { GameSystemConfig } from './gameSystemConfig';

export const isMissionMatrixValid = (
  values: GameSystemConfig,
): boolean => (
  Object.keys(missionPackVersions[values.missionPackVersion].matrixes).includes(values.missionMatrix)
);

export const isDynamicPointsVersionValid = (
  values: GameSystemConfig,
): boolean => {
  if (values.dynamicPointsVersion && dynamicPointsVersions[values.dynamicPointsVersion].era === values.era) {
    return true;
  }
  return false;
};
