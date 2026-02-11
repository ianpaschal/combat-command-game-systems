import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import { UnitMetadata } from '../../_shared/types';
import { ForceDiagram } from './forceDiagrams';

export enum Unit {

}

export const units: Record<Unit, UnitMetadata<ForceDiagram>> = {
  
} as const;

export const getUnitOptions = (): SelectOption<Unit>[] => getOptions(units);

export const getUnitDisplayName = (
  key: Unit,
): string | undefined => getDisplayName(units, key);
