import {
  describe,
  expect,
  it,
} from 'vitest';

import { ListData } from '../schema/listData';
import { Alignment } from '../static/alignments';
import { Faction } from '../static/factions';
import { getListDisplayName } from './getListDisplayName';

describe('getListDisplayName()', () => {

  it('returns the faction display name when present.', () => {
    const list: Partial<ListData> = {
      meta: {
        faction: Faction.Germany,
        alignment: Alignment.Axis,
        pointsLimit: 1000,
      },
    };
    const result = getListDisplayName(list);
    expect(result).toEqual('German Force');
  });

  it('falls back to the alignment display name when there is no faction.', () => {
    const list: Partial<ListData> = {
      meta: {
        alignment: Alignment.Axis,
        pointsLimit: 1000,
      },
    };
    const result = getListDisplayName(list);
    expect(result).toEqual('Axis Force');
  });

  it('falls back to "Unknown" when there is no faction or alignment.', () => {
    const list: Partial<ListData> = {};
    const result = getListDisplayName(list);
    expect(result).toEqual('Unknown Force');
  });

  it('falls back to "Unknown" when there is no list at all.', () => {
    expect(getListDisplayName()).toEqual('Unknown Force');
  });
});
