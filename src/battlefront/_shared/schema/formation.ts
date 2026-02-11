import { z } from 'zod';

import { listDataId } from '../../../common/schemas/listDataId';

export const createFormationSchema = <T extends z.ZodTypeAny>(
  sourceId: T,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => z.object({
  id: listDataId({
    message: 'Please set an ID',
  }),
  sourceId,
});
