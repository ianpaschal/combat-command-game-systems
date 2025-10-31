import { MatchResultDetails } from './matchResultDetails';

export const isWinnerValid = (
  values: MatchResultDetails,
): boolean => {
  if (values.outcomeType === 'time_out' && values.winner !== -1) {
    return false;
  }
  if (values.outcomeType !== 'time_out' && values.winner === -1) {
    return false;
  }
  return true; 
};
