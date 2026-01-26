import { SelectOption } from '../../../common';
import { getOptions } from '../../../common/_internal';
import { EraMetadata } from '../../_shared/types';

export enum Era {
  Default = 'default',
  Early = 'early', // Used by Checkpoint Charlie, 'Nam, and Fate of a Nation
}

export const eras: Record<Era, EraMetadata> = {
  [Era.Default]: {
    displayName: 'World War III',
    shortName: 'WWIII',
  },
  [Era.Early]: {
    displayName: 'Checkpoint Charlie', // Aka Checkpoint Charlie
    shortName: 'CC',
  },
} as const;

export const getEraOptions = (): SelectOption<Era>[] => getOptions(eras);

export const getEraDisplayName = (
  key: Era,
  useShortName: boolean = false,
): string => {
  const { displayName, shortName } = eras[key];
  return useShortName ? shortName : displayName;
};
