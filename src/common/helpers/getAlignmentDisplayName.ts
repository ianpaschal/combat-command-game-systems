import { alignments as flamesOfWarV4 } from '../../battlefront/flamesOfWarV4/static/alignments';
import { alignments as teamYankeeV2 } from '../../battlefront/teamYankeeV2/static/alignments';
import { GenericMetadata } from '../types';

const mergedAlignments: Record<string, GenericMetadata> = {
  ...flamesOfWarV4,
  ...teamYankeeV2,
};

export const getAlignmentDisplayName = (
  key: string,
): string | undefined => mergedAlignments[key]?.displayName;
