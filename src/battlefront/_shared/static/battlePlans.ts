import { SelectOption } from '../../../common';
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

export const getBattlePlanOptions = (): SelectOption<BattlePlan>[] => getOptions(battlePlans);

export const getBattlePlanDisplayName = (
  key?: BattlePlan,
): string | undefined => getDisplayName(battlePlans, key);
