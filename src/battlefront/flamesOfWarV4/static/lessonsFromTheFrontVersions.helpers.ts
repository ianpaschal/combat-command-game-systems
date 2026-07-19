import { SelectOption } from '../../../common';
import { getDisplayName, getOptions } from '../../../common/_internal';
import {
  LessonsFromTheFrontVersion,
  lessonsFromTheFrontVersions,
} from './lessonsFromTheFrontVersions';

export const getLessonsFromTheFrontVersionOptions = (): SelectOption<LessonsFromTheFrontVersion>[] => getOptions(lessonsFromTheFrontVersions);

export const getLessonsFromTheFrontVersionDisplayName = (
  key: LessonsFromTheFrontVersion,
): string | undefined => getDisplayName(lessonsFromTheFrontVersions, key);
