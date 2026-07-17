import { createGetListDisplayName } from '../../_shared/_internal/createGetListDisplayName';
import { ListData } from '../schema/listData';
import { alignments } from '../static/alignments';
import { factions } from '../static/factions';
import { forceDiagrams } from '../static/forceDiagrams';

export const getListDisplayName = createGetListDisplayName<ListData>({
  forceDiagrams,
  factions,
  alignments,
});
