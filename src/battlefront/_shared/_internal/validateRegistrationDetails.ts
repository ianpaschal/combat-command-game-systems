import { z } from 'zod';

import {
  AlignmentMetadata,
  FactionMetadata,
  ForceDiagramMetadata,
  SeriesMetadata,
} from '../types';

export const validateRegistrationDetails = (
  context: {
    alignments: Record<string, AlignmentMetadata>;
    factions: Record<string, FactionMetadata<string>>;
    forceDiagrams: Record<string, ForceDiagramMetadata<string, string>>;
    series?: Record<string, SeriesMetadata<string>>;
  },
  data: {
    alignment: string;
    faction: string;
    forceDiagram: string;
  },
  gameSystemConfig: { era?: unknown },
  requiredFields?: {
    alignment?: boolean;
    faction?: boolean;
    forceDiagram?: boolean;
  },
): z.IssueData[] => {
  const { alignments, factions, forceDiagrams, series } = context;
  
  const alignment = data.alignment in alignments ? alignments[data.alignment] : undefined;
  const faction = data.faction in factions ? factions[data.faction] : undefined;
  const forceDiagram = data.forceDiagram in forceDiagrams ? forceDiagrams[data.forceDiagram] : undefined;
  const forceSeries = series && forceDiagram && forceDiagram.series in series ? series[forceDiagram.series] : undefined;

  const issues: z.IssueData[] = [];

  if (data.alignment && !alignment) {
    issues.push({
      code: z.ZodIssueCode.custom,
      message: 'Invalid alignment for this game system.',
      path: ['alignment'],
    });
  }

  if (!data.alignment && (data.faction || requiredFields?.alignment)) {
    issues.push({
      code: z.ZodIssueCode.custom,
      message: 'Required',
      path: ['alignment'],
    });
  }

  if (data.faction && !faction) {
    issues.push({
      code: z.ZodIssueCode.custom,
      message: 'Invalid faction for this game system.',
      path: ['faction'],
    });
  }

  if (!data.faction && data.forceDiagram) {
    issues.push({
      code: z.ZodIssueCode.custom,
      message: 'Required',
      path: ['faction'],
    });
  }

  if (data.forceDiagram && !forceDiagram) {
    issues.push({
      code: z.ZodIssueCode.custom,
      message: 'Invalid force diagram for this game system.',
      path: ['forceDiagram'],
    });
  }

  if (data.forceDiagram && forceSeries && forceSeries.era !== gameSystemConfig.era) {
    issues.push({
      code: z.ZodIssueCode.custom,
      message: 'Invalid force diagram for this tournament\'s era.',
      path: ['forceDiagram'],
    });
  }

  if (data.alignment && faction && faction.alignment !== data.alignment) {
    issues.push({
      code: z.ZodIssueCode.custom,
      message: 'Mismatch between alignment and faction.',
      path: ['alignment', 'faction'],
    });
  }
  
  if (data.faction && forceDiagram && forceDiagram.faction !== data.faction) {
    issues.push({
      code: z.ZodIssueCode.custom,
      message: 'Mismatch between faction and force diagram.',
      path: ['faction', 'forceDiagram'],
    });
  }

  return issues;
};
