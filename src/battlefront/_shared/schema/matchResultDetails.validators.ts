import { MatchResultDetails } from './matchResultDetails';

export const isWinnerValid = (
  values: Pick<MatchResultDetails, 'winner' | 'outcomeType'>,
): boolean => {
  if (values.outcomeType === 'time_out' && values.winner !== -1) {
    return false;
  }
  if (values.outcomeType !== 'time_out' && values.winner === -1) {
    return false;
  }
  return true; 
};
