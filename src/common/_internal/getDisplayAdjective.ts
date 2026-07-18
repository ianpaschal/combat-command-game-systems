export const getDisplayAdjective = <T extends string | number, U extends { displayAdjective: string }>(
  items: Record<T, U>,
  search?: T,
): string | undefined => {
  if (!search) {
    return undefined;
  }
  return items[search]?.displayAdjective;
};
