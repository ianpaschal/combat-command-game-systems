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
