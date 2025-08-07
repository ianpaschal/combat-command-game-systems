import {
  describe,
  expect,
  it,
} from 'vitest';

import { SelectOption } from '../types';
import { getOptions } from './getOptions';

describe('getOptions', () => {
  const testItems = {
    item1: { displayName: 'First Item' },
    item2: { displayName: 'Second Item' },
    item3: { displayName: 'Third Item' },
  } as const;

  it('should return an array of SelectOption objects.', () => {
    const result = getOptions(testItems);
    
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(3);
    
    result.forEach((option) => {
      expect(option).toHaveProperty('value');
      expect(option).toHaveProperty('label');
    });
  });

  it('should return correct TypeScript types.', () => {
    const result = getOptions(testItems);
    
    // Type assertion to verify the return type:
    const typedResult: SelectOption<keyof typeof testItems>[] = result;
    expect(typedResult).toBeDefined();
  });
});
