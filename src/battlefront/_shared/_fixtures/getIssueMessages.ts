import { ValidateListDataResult } from '../../../common';

export const getIssueMessages = (
  result: ValidateListDataResult<unknown>,
  path: (string | number)[],
): string[] => {
  if (result.success) {
    return [];
  }
  return result.issues.filter((i) => (
    i.path.length === path.length && i.path.every((p, idx) => p === path[idx])
  )).map((i) => i.message);
};
