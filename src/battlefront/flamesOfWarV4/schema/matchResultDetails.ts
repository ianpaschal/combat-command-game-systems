import { z } from 'zod';

import { createMatchResultDetails } from '../../_shared/schema/matchResultDetails';
import { Faction } from '../data/factions';

export const matchResultDetails = createMatchResultDetails(Faction);

export type MatchResultDetails = z.infer<typeof matchResultDetails>;

export function isValidMatchResultDetails(data: unknown): data is MatchResultDetails {
  return matchResultDetails.safeParse(data).success;
}
