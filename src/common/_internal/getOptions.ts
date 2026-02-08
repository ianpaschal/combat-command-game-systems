import { SelectOption } from '../types';

export const getOptions = <T extends string | number, U extends { displayName: string }>(
  items: Record<T, U>,
): SelectOption<T>[] => {
  const iterableItems = Object.entries(items) as [T, U][];
  return iterableItems.map(([key, { displayName }]) => ({
    value: key,
    label: displayName,
  }));
};
