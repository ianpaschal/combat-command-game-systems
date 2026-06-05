import { GameSystemConfig } from './gameSystemConfig';

export const isPointsVersionValid = (
  values: GameSystemConfig,
): boolean => {
  if (values.pointsVersion) {
    return true;
  }
  return false;
};
