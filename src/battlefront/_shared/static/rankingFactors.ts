import z from 'zod';

import { getOptions } from '../../../common/_internal';
import { ExtendedRankingFactor, SelectOption } from '../../../common/types';
import { RankingFactorMetadata } from '../types';

export enum BaseStatKey {
  Points = 'points',
  UnitsDestroyed = 'units_destroyed',
  UnitsLost = 'units_lost',
  Wins = 'wins',
}

export type BaseStats = Record<BaseStatKey, number>;

export const defaultBaseStats: BaseStats = {
  points: 0,
  units_destroyed: 0,
  units_lost: 0,
  wins: 0,
};

export type RankingFactor = ExtendedRankingFactor<`${BaseStatKey}`>;

export const rankingFactors: Record<RankingFactor, RankingFactorMetadata> = {
  average_opponent_points: {
    desirability: 'higher',
    displayName: 'Opponent\u2019s Avg. Points per Round',
    shortName: 'AOP',
  },
  average_opponent_units_destroyed: {
    desirability: 'higher',
    displayName: 'Opponent\u2019s Avg. Units Destroyed per Round',
    shortName: 'AOD',
  },
  average_opponent_units_lost: {
    desirability: 'lower',
    displayName: 'Opponent\u2019s Avg. Units Lost per Round',
    shortName: 'AOL',
  },
  average_opponent_wins: {
    desirability: 'higher',
    displayName: 'Opponent\u2019s Avg. Wins per Round',
    shortName: 'AOW',
  },
  average_points: {
    desirability: 'higher',
    displayName: 'Avg. Points per Round',
    shortName: 'AP',
  },
  average_units_destroyed: {
    desirability: 'higher',
    displayName: 'Avg. Units Destroyed per Round',
    shortName: 'AD',
  },
  average_units_lost: {
    desirability: 'lower',
    displayName: 'Avg. Units Lost per Round',
    shortName: 'AL',
  },
  average_wins: {
    desirability: 'higher',
    displayName: 'Avg. Wins per Round',
    shortName: 'AW',
  },
  total_opponent_points: {
    desirability: 'higher',
    displayName: 'Total Opponent Points',
    shortName: 'OP',
  },
  total_opponent_units_destroyed: {
    desirability: 'higher',
    displayName: 'Total Opponent Units Destroyed',
    shortName: 'OD',
  },
  total_opponent_units_lost: {
    desirability: 'lower',
    displayName: 'Total Opponent Units Lost',
    shortName: 'OL',
  },
  total_opponent_wins: {
    desirability: 'higher',
    displayName: 'Total Opponent Wins',
    shortName: 'OW',
  },
  total_points: {
    desirability: 'higher',
    displayName: 'Total Points',
    shortName: 'P',
  },
  total_units_destroyed: {
    desirability: 'higher',
    displayName: 'Total Units Destroyed',
    shortName: 'D',
  },
  total_units_lost: {
    desirability: 'lower',
    displayName: 'Total Units Lost',
    shortName: 'L',
  },
  total_wins: {
    desirability: 'higher',
    displayName: 'Total Wins',
    shortName: 'W',
  },
} as const;

export const rankingFactor = z.nativeEnum(Object.keys(rankingFactors).reduce((acc, key) => {
  acc[key as RankingFactor] = key as RankingFactor;
  return acc;
}, {} as Record<RankingFactor, RankingFactor>));

export const getRankingFactorOptions = (): SelectOption<RankingFactor>[] => getOptions(rankingFactors);

export const getRankingFactorDisplayName = (
  key: RankingFactor,
  useShortName: boolean = false,
): string => {
  const { displayName, shortName } = rankingFactors[key];
  return useShortName ? shortName : displayName;
};
