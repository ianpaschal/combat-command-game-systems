export type ListDataId = string;

export const isListDataId = (value: unknown): value is ListDataId => (
  typeof value === 'string' && /^[0-9a-z]{6}$/.test(value)
);
