import {
  describe,
  expect,
  it,
} from 'vitest';

import { getAlignmentDisplayName } from './getAlignmentDisplayName';

describe('getAlignmentDisplayName()', () => {

  it('returns display name for Flames of War V4 alignments.', () => {
    expect(getAlignmentDisplayName('allies')).toBe('Allies');
    expect(getAlignmentDisplayName('axis')).toBe('Axis');
  });

  it('returns display name for Team Yankee V2 alignments.', () => {
    expect(getAlignmentDisplayName('nato')).toBe('NATO');
    expect(getAlignmentDisplayName('warsaw_pact')).toBe('Warsaw Pact');
  });

  it('returns display name for shared alignments.', () => {
    expect(getAlignmentDisplayName('flexible')).toBe('Flexible');
  });

  it('returns undefined for unknown alignment keys.', () => {
    expect(getAlignmentDisplayName('unknown')).toBeUndefined();
    expect(getAlignmentDisplayName('')).toBeUndefined();
  });
});
