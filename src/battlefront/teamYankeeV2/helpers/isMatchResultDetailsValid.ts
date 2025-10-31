import { MatchResultDetails, matchResultDetails } from '../../flamesOfWarV4';

/**
 * @deprecated
 */
export function isValidMatchResultDetails(data: unknown): data is MatchResultDetails {
  return matchResultDetails.schema.safeParse(data).success;
}
