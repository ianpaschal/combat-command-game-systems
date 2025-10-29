import { z } from 'zod';

export const scoreOverride = z.object({
  player0Score: z.coerce.number({
    message: 'Please enter a score.',
  }).min(0),
  player1Score: z.coerce.number({
    message: 'Please enter a score.',
  }).min(0),
});

export type ScoreOverride = z.infer<typeof scoreOverride>;
