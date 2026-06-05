import { z } from 'zod';

import { listDataId } from '../../../common/schemas/listDataId';

export const createUnitSchema = <T extends z.ZodTypeAny>(
  sourceId: T,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => z.object({
  id: listDataId(),
  sourceId,
  formationId: z.union([listDataId(), z.literal('support')]),
  slotId: z.string(),
});
