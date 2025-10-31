import {
  describe,
  expect,
  it,
} from 'vitest';

import { getSchemaFieldErrors } from '../../../common/_internal/getSchemaFieldErrors';
import { ScoreOverride, scoreOverride } from './scoreOverride';

describe('scoreOverride', () => {
  
  const validData: ScoreOverride = {
    player0Score: 8,
    player1Score: 1,
  };

  it('accepts valid data.', () => {
    const result = scoreOverride.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe('.player0Score', () => {
    it('should emit an error if value is missing.', () => {
      const result = scoreOverride.safeParse({
        ...validData,
        player0Score: undefined,
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'player0Score')).toContain('Please enter a score.');
    });
  });

  describe('.player1Score', () => {
    it('should emit an error if value is missing.', () => {
      const result = scoreOverride.safeParse({
        ...validData,
        player1Score: undefined,
      });
      expect(result.success).toBe(false);
      expect(getSchemaFieldErrors(result, 'player1Score')).toContain('Please enter a score.');
    });
  });
});
