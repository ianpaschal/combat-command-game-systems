import {
  describe,
  expect,
  it,
} from 'vitest';

import { ListData } from '../schema/listData';
import { Alignment } from '../static/alignments';
import { Faction } from '../static/factions';
import { ForceDiagram } from '../static/forceDiagrams';
import { getListDisplayName } from './getListDisplayName';

describe('getListDisplayName()', () => {

  it('returns the force diagram display name when present.', () => {
    const list: Partial<ListData> = {
      meta: {
        forceDiagram: ForceDiagram.British,
        faction: Faction.Germany,
        alignment: Alignment.AlliedPowers,
        pointsLimit: 100,
      },
    };
    const result = getListDisplayName(list);
    expect(result).toEqual('British Force\'');
  });

  it('falls back to the faction display name when there is no force diagram.', () => {
    const list: Partial<ListData> = {
      meta: {
        faction: Faction.Germany,
        alignment: Alignment.AlliedPowers,
        pointsLimit: 100,
      },
    };
    const result = getListDisplayName(list);
    expect(result).toEqual('Germany Force\'');
  });

  it('falls back to the alignment display name when there is no force diagram or faction.', () => {
    const list: Partial<ListData> = {
      meta: {
        alignment: Alignment.CentralPowers,
        pointsLimit: 100,
      },
    };
    const result = getListDisplayName(list);
    expect(result).toEqual('Central Powers Force\'');
  });

  it('falls back to "Unknown" when there is no force diagram, faction, or alignment.', () => {
    const list: Partial<ListData> = {};
    const result = getListDisplayName(list);
    expect(result).toEqual('Unknown Force\'');
  });
});
