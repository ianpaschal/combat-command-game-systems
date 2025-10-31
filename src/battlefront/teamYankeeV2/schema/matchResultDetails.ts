import { z } from 'zod';

import { createMatchResultDetailsSchema } from '../../_shared/schema/matchResultDetails';
import { Faction } from '../static/factions';

const schema = createMatchResultDetailsSchema(Faction);

export type MatchResultDetails = z.infer<typeof schema>;

/**
 * Useful to single import both schema and default values.
 */
export const matchResultDetails = {
  schema,

  /**
   * React Hook Form doesn't like using undefined as a default value as it causes the inputs to flip
   * between being controlled and uncontrolled. But we also don't really want default values in
   * there: The form should start empty.
   * 
   * See: "Placeholders in Form Fields Are Harmful" by Norman-Nielsen Group
   *      (https://www.nngroup.com/articles/form-design-placeholders/)
   * 
   * Therefore we use empty strings as placeholder values. It is
   * sadly necessary to cast it to the correct type or else React Hook Form will whine about empty
   * strings not being valid match result details.
   */
  defaultValues: {
    attacker: '',
    firstTurn: '',
    mission: '',
    outcomeType: '',
    player0BattlePlan: '',
    player0Faction: '',
    player0UnitsLost: '',
    player1BattlePlan: '',
    player1Faction: '',
    player1UnitsLost: '',
    scoreOverride: undefined, // Except here!
    turnsPlayed: '',
    winner: '',
  } as unknown as MatchResultDetails,
} as const;
