import { ValidateListDataResult, ValidationIssue } from '../../../common';
import { ListDataOptions, validateListDataShape } from '../../_shared/schema/listData';
import { Alignment, alignments } from '../static/alignments';
import { Faction, factions } from '../static/factions';
import { ForceDiagram, forceDiagrams } from '../static/forceDiagrams';
import { Unit, units } from '../static/units';

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
  formations: { id: string; sourceId: Unit }[];
  units: { id: string; sourceId: Unit; formationId: string; slotId: string }[];
  commandCards: { id: string; sourceId: string; appliedTo: string }[];
};

export type ListData = {
  meta: {
    forceDiagram?: ForceDiagram;
    faction?: Faction;
    alignment?: Alignment;
    pointsLimit: number;
  };
  formations: { id: string; sourceId: Unit }[];
  units: { id: string; sourceId: Unit; formationId: string; slotId: string }[];
  commandCards: { id: string; sourceId: string; appliedTo: string }[];
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

const validate = async (
  rawFormData: unknown,
  options?: ListDataOptions,
): Promise<ValidateListDataResult<ListData>> => {
  const formData = rawFormData as ListDataFormData;
  const meta = {
    forceDiagram: formData.meta.forceDiagram || undefined,
    faction: formData.meta.faction || undefined,
    alignment: formData.meta.alignment || undefined,
  };

  const issues: ValidationIssue[] = validateListDataShape({ ...formData, meta }, context, options);

  for (const unit of formData.units) {
    if (!unit.slotId) {
      issues.push({ message: 'Please select a slot.', path: ['units'] });
    }
  }

  const pointsLimit = Number(formData.meta.pointsLimit);
  if (!Number.isFinite(pointsLimit)) {
    issues.push({
      message: 'Please set a points limit.',
      path: ['meta', 'pointsLimit'],
    });
  } else if (pointsLimit < 0) {
    issues.push({
      message: 'Points limit must be 0 or greater.',
      path: ['meta', 'pointsLimit'],
    });
  }

  if (issues.length > 0) {
    return { success: false, issues };
  }

  return {
    success: true,
    data: {
      ...formData,
      meta: { ...meta, pointsLimit },
    },
  };
};

export const listData = {
  validate,
  defaultValues,
} as const;
