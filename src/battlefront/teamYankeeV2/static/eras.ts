import { getOptions } from '../../../common/_internal';
import { EraMetadata } from '../../_shared/types';

export enum Era {
  Default = 'default',
}

export const eras: Record<Era, EraMetadata> = {
  [Era.Default]: {
    displayName: 'World War III',
    shortName: 'WWIII',
  },
} as const;

export const getEraOptions = () => getOptions(eras);

export const getEraDisplayName = (
  key: Era,
  useShortName: boolean = false,
): string => {
  const { displayName, shortName } = eras[key];
  return useShortName ? shortName : displayName;
};
