import { z } from 'zod';

import { createEnumSchema } from '../_internal';
import { TournamentPairingPolicy } from '../static/tournamentPairingPolicy';

export const tournamentPairingConfigSchema = z.object({
  orderBy: z.union([z.literal('ranking'), z.literal('random')]),
  policies: z.object({
    sameAlignment: createEnumSchema(TournamentPairingPolicy),
    repeat: createEnumSchema(TournamentPairingPolicy),
  }),
});

export type TournamentPairingConfig = z.infer<typeof tournamentPairingConfigSchema>;

export type TournamentPairingPolicies = Partial<TournamentPairingConfig['policies']>;

/**
 * Useful to single import both schema and default values.
 */
export const tournamentPairingConfig = {
  schema: tournamentPairingConfigSchema,
  defaultValues: {
    orderBy: 'ranking',
    policies: {
      sameAlignment: TournamentPairingPolicy.Allow,
      repeat: TournamentPairingPolicy.Block,
    },
  } satisfies TournamentPairingConfig,
} as const;
