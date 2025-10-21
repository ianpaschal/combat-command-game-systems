import { getOptions } from '../../../common/_internal';
import { RankingFactorMetadata } from '../types';

export enum RankingFactor {
  AverageOpponentPoints = 'average_opponent_points',
  AverageOpponentUnitsDestroyed = 'average_opponent_units_destroyed',
  AverageOpponentUnitsLost = 'average_opponent_units_lost',
  AverageOpponentWins = 'average_opponent_wins',
  AveragePoints = 'average_points',
  AverageUnitsDestroyed = 'average_units_destroyed',
  AverageUnitsLost = 'average_units_lost',
  AverageWins = 'average_wins',
  TotalOpponentPoints = 'total_opponent_points',
  TotalOpponentUnitsDestroyed = 'total_opponent_units_destroyed',
  TotalOpponentUnitsLost = 'total_opponent_units_lost',
  TotalOpponentWins = 'total_opponent_wins',
  TotalPoints = 'total_points',
  TotalUnitsDestroyed = 'total_units_destroyed',
  TotalUnitsLost = 'total_units_lost',
  TotalWins = 'total_wins',
}

export enum RankingFactorRoot {
  Points = 'points',
  UnitsDestroyed = 'units_destroyed',
  UnitsLost = 'units_lost',
  Wins = 'wins',
}

export enum RankingFactorGroup {
  AverageOpponent = 'average_opponent',
  Average = 'average',
  TotalOpponent = 'total_opponent',
  Total = 'total',
}

export const rankingFactors: Record<RankingFactor, RankingFactorMetadata> = {
  [RankingFactor.AverageOpponentPoints]: {
    desirability: 'higher',
    displayName: 'Opponent\u2019s Avg. Points per Round',
    shortName: 'AOP',
  },
  [RankingFactor.AverageOpponentUnitsDestroyed]: {
    desirability: 'higher',
    displayName: 'Opponent\u2019s Avg. Units Destroyed per Round',
    shortName: 'AOD',
  },
  [RankingFactor.AverageOpponentUnitsLost]: {
    desirability: 'lower',
    displayName: 'Opponent\u2019s Avg. Units Lost per Round',
    shortName: 'AOL',
  },
  [RankingFactor.AverageOpponentWins]: {
    desirability: 'higher',
    displayName: 'Opponent\u2019s Avg. Wins per Round',
    shortName: 'AOW',
  },
  [RankingFactor.AveragePoints]: {
    desirability: 'higher',
    displayName: 'Avg. Points per Round',
    shortName: 'AP',
  },
  [RankingFactor.AverageUnitsDestroyed]: {
    desirability: 'higher',
    displayName: 'Avg. Units Destroyed per Round',
    shortName: 'AD',
  },
  [RankingFactor.AverageUnitsLost]: {
    desirability: 'lower',
    displayName: 'Avg. Units Lost per Round',
    shortName: 'AL',
  },
  [RankingFactor.AverageWins]: {
    desirability: 'higher',
    displayName: 'Avg. Wins per Round',
    shortName: 'AW',
  },
  [RankingFactor.TotalOpponentPoints]: {
    desirability: 'higher',
    displayName: 'Total Opponent Points',
    shortName: 'OP',
  },
  [RankingFactor.TotalOpponentUnitsDestroyed]: {
    desirability: 'higher',
    displayName: 'Total Opponent Units Destroyed',
    shortName: 'OD',
  },
  [RankingFactor.TotalOpponentUnitsLost]: {
    desirability: 'lower',
    displayName: 'Total Opponent Units Lost',
    shortName: 'OL',
  },
  [RankingFactor.TotalOpponentWins]: {
    desirability: 'higher',
    displayName: 'Total Opponent Wins',
    shortName: 'OW',
  },
  [RankingFactor.TotalPoints]: {
    desirability: 'higher',
    displayName: 'Total Points',
    shortName: 'P',
  },
  [RankingFactor.TotalUnitsDestroyed]: {
    desirability: 'higher',
    displayName: 'Total Units Destroyed',
    shortName: 'D',
  },
  [RankingFactor.TotalUnitsLost]: {
    desirability: 'lower',
    displayName: 'Total Units Lost',
    shortName: 'L',
  },
  [RankingFactor.TotalWins]: {
    desirability: 'higher',
    displayName: 'Total Wins',
    shortName: 'W',
  },
} as const;

export const getRankingFactorOptions = () => getOptions(rankingFactors);

export const getRankingFactorDisplayName = (
  key: RankingFactor,
  useShortName: boolean = false,
): string => {
  const { displayName, shortName } = rankingFactors[key];
  return useShortName ? shortName : displayName;
};
