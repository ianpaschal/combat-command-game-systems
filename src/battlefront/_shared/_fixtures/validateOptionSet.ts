import { expect } from 'vitest';

import { SelectOption } from '../../../common';

export const validateOptionSet = <T extends string>(
  result: SelectOption<T>[],
  included: T[],
  excluded: T[],
): void => {
  result.forEach((option) => {
    expect(included).toContain(option.value);
  });
  const resultValues = result.map((o) => o.value);
  excluded.forEach((excludedValue) => {
    expect(resultValues).not.toContain(excludedValue);
  });
};
