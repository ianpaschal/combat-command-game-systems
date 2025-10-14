import { getDisplayName, getOptions } from '../../../common/_internal';
import { BattlePlanMetadata } from '../types';

export enum BattlePlan {
  Attack = 'attack',
  Maneuver = 'maneuver',
  Defend = 'defend',
}

export const battlePlans: Record<BattlePlan, BattlePlanMetadata> = {
  [BattlePlan.Attack]: {
    displayName: 'Attack',
  },
  [BattlePlan.Maneuver]: {
    displayName: 'Maneuver',
  },
  [BattlePlan.Defend]: {
    displayName: 'Defend',
  },
} as const;

export const getBattlePlanOptions = () => getOptions(battlePlans);

export const getBattlePlanDisplayName = (
  key?: BattlePlan,
) => getDisplayName(battlePlans, key);
