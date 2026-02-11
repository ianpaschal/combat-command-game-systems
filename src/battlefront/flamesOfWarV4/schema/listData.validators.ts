import { ForceDiagram, forceDiagrams } from '../static/forceDiagrams';
import { series } from '../static/series';
import { Unit, units } from '../static/units';
import { ListData } from './listData';

const getEraFromForceDiagram = (fd: ForceDiagram): string =>
  series[forceDiagrams[fd].series].era;

export const hasNoDuplicateIds = (
  values: ListData,
): boolean => {
  const allIds = [
    ...values.formations.map((f) => f.id),
    ...values.units.map((u) => u.id),
    ...values.commandCards.map((c) => c.id),
  ];
  return new Set(allIds).size === allIds.length;
};

export const hasAtLeastOneFormation = (
  values: ListData,
): boolean => values.formations.length > 0;

export const hasAtLeastOneUnit = (
  values: ListData,
): boolean => values.units.length > 0;

export const isFormationEraValid = (
  values: ListData,
  formationSourceId: Unit,
): boolean => {
  const expectedEra = getEraFromForceDiagram(values.meta.forceDiagram);
  const formationEra = getEraFromForceDiagram(
    units[formationSourceId].sourceForceDiagram,
  );
  return formationEra === expectedEra;
};

export const isUnitEraValid = (
  values: ListData,
  unitSourceId: Unit,
): boolean => {
  const expectedEra = getEraFromForceDiagram(values.meta.forceDiagram);
  const unitEra = getEraFromForceDiagram(
    units[unitSourceId].sourceForceDiagram,
  );
  return unitEra === expectedEra;
};

export const isUnitFormationIdValid = (
  values: ListData,
  formationId: string,
): boolean => {
  if (formationId === 'support') {
    return true;
  }
  const formationIds = new Set(values.formations.map((f) => f.id));
  return formationIds.has(formationId);
};

export const isCommandCardTargetValid = (
  values: ListData,
  appliedTo: string,
): boolean => {
  const allValidTargetIds = new Set([
    ...values.formations.map((f) => f.id),
    ...values.units.map((u) => u.id),
  ]);
  return allValidTargetIds.has(appliedTo);
};
