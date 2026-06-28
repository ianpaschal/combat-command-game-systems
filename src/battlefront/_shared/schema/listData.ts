import { ValidationIssue } from '../../../common';
import {
  hasNoDuplicateIds,
  ListDataContext,
  ListDataOptions,
  ListDataShape,
  validateAlignment,
  validateCommandCard,
  validateEra,
  validateFaction,
  validateForceDiagram,
  validateFormation,
  validateLegality,
  validateUnit,
} from './listData.validators';

export type { ListDataContext, ListDataOptions, ListDataShape } from './listData.validators';

/**
 * Runs the cross-field validation rules shared by every game system's list data, returning any
 * issues found. Each game system builds its own concrete `ListData`/`ListDataFormData` shape
 * (since `meta` varies, e.g. `era`), then calls this from its own `validate` function.
 */
export const validateListDataShape = (
  data: ListDataShape,
  context: ListDataContext,
  options?: ListDataOptions,
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  // Validate all metadata fields:
  validateForceDiagram(issues, data, context, options);
  validateFaction(issues, data, context, options);
  validateAlignment(issues, data, context, options);

  validateEra(issues, data, context);

  // Units & Formations
  if (!hasNoDuplicateIds(data)) {
    issues.push({
      message: 'Duplicate IDs found.',
      path: [],
    });
  }

  for (const formation of data.formations) {
    validateFormation(issues, data, formation, context);
  }

  for (const unit of data.units) {
    validateUnit(issues, data, unit, context);
  }

  for (const card of data.commandCards) {
    validateCommandCard(issues, data, card);
  }

  if (options?.requireLegal) {
    validateLegality(issues, data);
  }

  return issues;
};
