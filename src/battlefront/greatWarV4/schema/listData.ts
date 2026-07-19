import lodash from 'lodash';

import { ValidateListDataResult } from '../../../common';
import { ListDataOptions, validateListData } from '../../_shared/helpers/validateListData';
import {
  ListDataCommandCard,
  ListDataFormation,
  ListDataUnit,
} from '../../_shared/types';
import { Alignment, alignments } from '../static/alignments';
import { Faction, factions } from '../static/factions';
import { ForceDiagram, forceDiagrams } from '../static/forceDiagrams';
import { Unit, units } from '../static/units';
import { gameSystemConfig } from './gameSystemConfig';

const context = {
  alignments,
  factions,
  forceDiagrams,
  units,
} as const;

export type ListDataFormData = {
  meta: {
    forceDiagram: ForceDiagram | null;
    faction: Faction | null;
    alignment: Alignment | null;
    pointsLimit: number;
  };
  formations: ListDataFormation<Unit>[];
  units: ListDataUnit<Unit>[];
  commandCards: ListDataCommandCard[];
};

export type ListData = {
  meta: {
    forceDiagram?: ForceDiagram;
    faction?: Faction;
    alignment?: Alignment;
    pointsLimit: number;
  };
  formations: ListDataFormation<Unit>[];
  units: ListDataUnit<Unit>[];
  commandCards: ListDataCommandCard[];
};

const defaultValues: ListDataFormData = {
  meta: {
    forceDiagram: null,
    faction: null,
    alignment: null,
    pointsLimit: 100,
  },
  formations: [],
  units: [],
  commandCards: [],
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
