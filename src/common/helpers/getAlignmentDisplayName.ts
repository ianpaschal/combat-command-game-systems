import { alignments as flamesOfWarV4 } from '../../battlefront/flamesOfWarV4/static/alignments';
import { alignments as teamYankeeV2 } from '../../battlefront/teamYankeeV2/static/alignments';
import { GenericMetadata } from '../types';

export const getAlignmentDisplayName = (
  key: string,
): string | undefined => {
  const alignments: Record<string, GenericMetadata> = {
    ...flamesOfWarV4,
    ...teamYankeeV2,
  };
  return alignments[key]?.displayName;
};
