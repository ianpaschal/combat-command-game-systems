import { z } from 'zod';

export const getIssueMessages = (
  result: z.SafeParseReturnType<unknown, unknown>,
  path: (string | number)[],
): string[] => {
  if (result.success) {
    return [];
  }
  return result.error.issues.filter((i) => (
    i.path.length === path.length && i.path.every((p, idx) => p === path[idx])
  )).map((i) => i.message);
};
