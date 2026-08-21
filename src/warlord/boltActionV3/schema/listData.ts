import lodash from 'lodash';

import { ValidateListDataResult } from '../../../common';
import { ListDataOptions, validateListData } from '../helpers/validateListData';
import { Alignment, alignments } from '../static/alignments';
import { Faction, factions } from '../static/factions';
import { ListDataPlatoon, ListDataUnit } from '../types';
import { gameSystemConfig } from './gameSystemConfig';

/**
 * Neither the platoon selectors nor the units are catalogued yet, so the
 * validator sees empty registries for both and checks only that a source was
 * picked at all.
 */
const context = {
  alignments,
  factions,
  platoons: {},
  units: {},
} as const;

export type ListDataFormData = {
  meta: {
    faction: Faction | null;
    alignment: Alignment | null;
    pointsLimit: number;
  };
  platoons: ListDataPlatoon<string>[];
  units: ListDataUnit<string>[];
};

export type ListData = {
  meta: {
    faction?: Faction;
    alignment?: Alignment;
    pointsLimit: number;
  };
  platoons: ListDataPlatoon<string>[];
  units: ListDataUnit<string>[];
};

const defaultValues: ListDataFormData = {
  meta: {
    faction: null,
    alignment: null,
    pointsLimit: 1000,
  },
  platoons: [],
  units: [],
};

export const listData = {
  defaultValues,
  getDefaultValues: (config: unknown): ListDataFormData => {
    const { points } = gameSystemConfig.schema.parse(config);
    return lodash.merge({}, defaultValues, {
      meta: {
        pointsLimit: points,
      },
    });
  },
  validate: async (
    data: unknown,
    options?: ListDataOptions,
  ): Promise<ValidateListDataResult<ListData>> => (
    validateListData<ListData>(data, context, options)
  ),
} as const;
