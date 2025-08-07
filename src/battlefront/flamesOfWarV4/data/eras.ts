import { getOptions } from '../../../common/_internal';
import { EraMetadata } from '../../_shared/types';

export enum Era {
  EW = 'early_war',
  MW = 'mid_war',
  LW = 'late_war',
}

export const eras: Record<Era, EraMetadata> = {
  [Era.EW]: {
    displayName: 'Early War',
    shortName: 'EW',
  },
  [Era.MW]: {
    displayName: 'Mid-War',
    shortName: 'MW',
  },
  [Era.LW]: {
    displayName: 'Late War',
    shortName: 'LW',
  },
} as const;

export const getEraOptions = () => getOptions(eras);

export const getEraDisplayName = (
  key: Era,
  useShortName: boolean = false,
): string => {
  const { displayName, shortName } = eras[key];
  return useShortName ? shortName : displayName;
};
