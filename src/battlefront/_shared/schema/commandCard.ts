import { z } from 'zod';

import { listDataId } from '../../../common/schemas/listDataId';

export const commandCard = z.object({
  id: listDataId(),
  sourceId: z.string(),
  appliedTo: listDataId(),
});
