export const getDisplayName = <T extends string | number, U extends { displayName: string }>(
  items: Record<T, U>,
  search?: T,
): string | undefined => {
  if (!search) {
    return undefined;
  }
  const entry = (Object.entries(items) as [T, U][]).find(([key]) => (key === search));
  return entry ? entry[1].displayName : undefined;
};
