import z from 'zod';

import { getDisplayName, getOptions } from '../_internal';
import { TournamentPairingConfig, tournamentPairingConfig } from '../schemas/tournamentPairingConfig';
import { SelectOption, TournamentPairingMethodMetadata } from '../types';
import { TournamentPairingPolicy } from './tournamentPairingPolicy';

export enum TournamentPairingMethod {
  Adjacent = 'adjacent',
  AdjacentAlignment = 'adjacent_alignment',
  Random = 'random',
  RandomAlignment = 'random_alignment',
  Custom = 'custom',
}

const createPreset = (
  config: TournamentPairingConfig,
): Omit<TournamentPairingMethodMetadata, 'displayName'> => ({
  schema: z.object({
    orderBy: z.literal(config.orderBy),
    policies: z.object({
      sameAlignment: z.literal(config.policies.sameAlignment),
      repeat: z.literal(config.policies.repeat),
    }),
  }),
  values: config,
});

const definitions: Record<TournamentPairingMethod, TournamentPairingMethodMetadata> = {
  [TournamentPairingMethod.Adjacent]: {
    displayName: 'Adjacent',
    ...createPreset({
      orderBy: 'ranking',
      policies: {
        sameAlignment: TournamentPairingPolicy.Allow,
        repeat: TournamentPairingPolicy.Block,
      },
    }),
  },
  [TournamentPairingMethod.AdjacentAlignment]: {
    displayName: 'Adjacent (Red vs. Blue)',
    ...createPreset({
      orderBy: 'ranking',
      policies: {
        sameAlignment: TournamentPairingPolicy.Block,
        repeat: TournamentPairingPolicy.Block,
      },
    }),
  },
  [TournamentPairingMethod.Random]: {
    displayName: 'Random',
    ...createPreset({
      orderBy: 'random',
      policies: {
        sameAlignment: TournamentPairingPolicy.Allow,
        repeat: TournamentPairingPolicy.Block,
      },
    }),
  },
  [TournamentPairingMethod.RandomAlignment]: {
    displayName: 'Random  (Red vs. Blue)',
    ...createPreset({
      orderBy: 'random',
      policies: {
        sameAlignment: TournamentPairingPolicy.Block,
        repeat: TournamentPairingPolicy.Block,
      },
    }),
  },
  [TournamentPairingMethod.Custom]: {
    displayName: 'Custom',
    schema: tournamentPairingConfig.schema,
    values: tournamentPairingConfig.defaultValues,
  },
} as const;

export const getTournamentPairingMethodOptions = (): SelectOption<TournamentPairingMethod>[] => getOptions(definitions);

export const getTournamentPairingMethodDisplayName = (
  key: TournamentPairingMethod,
): string | undefined => getDisplayName(definitions, key);

export const getTournamentPairingMethodByConfig = (
  config: TournamentPairingConfig,
): TournamentPairingMethod => {
  for (const [method, metadata] of Object.entries(definitions)) {
    if (method === TournamentPairingMethod.Custom) {
      continue;
    }
    if (metadata.schema.safeParse(config).success) {
      return method as TournamentPairingMethod;
    }
  }
  return TournamentPairingMethod.Custom;
};

export const getTournamentPairingConfigByMethod = (
  method: string,
): TournamentPairingConfig | undefined => definitions[method as TournamentPairingMethod].values;
