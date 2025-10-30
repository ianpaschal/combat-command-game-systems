import { SafeParseReturnType } from 'zod';

export const getSchemaFieldErrors = <TInput, TOutput, K extends keyof TInput & string>(
  result: SafeParseReturnType<TInput, TOutput>,
  field: K,
): string[] => {
  if (result.success) {
    return [];
  }
  return result.error.flatten().fieldErrors[field] ?? [];
};
