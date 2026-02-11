import {
  describe,
  expect,
  it,
} from 'vitest';
import { z } from 'zod';

import { getIssueMessages } from './getIssueMessages';

const schema = z.object({
  name: z.string(),
  age: z.number(),
});

describe('getIssueMessages()', () => {
  it('returns an empty array when the result is successful.', () => {
    const result = schema.safeParse({ name: 'Alice', age: 30 });
    expect(getIssueMessages(result, ['name'])).toEqual([]);
  });

  it('returns messages matching the given path.', () => {
    const result = schema.safeParse({ name: 123, age: 30 });
    expect(getIssueMessages(result, ['name'])).not.toHaveLength(0);
  });

  it('returns an empty array when no issues match the given path.', () => {
    const result = schema.safeParse({ name: 123, age: 30 });
    expect(getIssueMessages(result, ['age'])).toHaveLength(0);
  });
});
