import {
  describe,
  expect,
  it,
} from 'vitest';

import { ValidateListDataResult } from '../../../common';
import { getIssueMessages } from './getIssueMessages';

const success: ValidateListDataResult<unknown> = { success: true, data: {} };
const failure: ValidateListDataResult<unknown> = {
  success: false,
  issues: [
    { path: ['name'], message: 'Invalid name.' },
  ],
};

describe('getIssueMessages()', () => {
  it('returns an empty array when the result is successful.', () => {
    expect(getIssueMessages(success, ['name'])).toEqual([]);
  });

  it('returns messages matching the given path.', () => {
    expect(getIssueMessages(failure, ['name'])).not.toHaveLength(0);
  });

  it('returns an empty array when no issues match the given path.', () => {
    expect(getIssueMessages(failure, ['age'])).toHaveLength(0);
  });
});
