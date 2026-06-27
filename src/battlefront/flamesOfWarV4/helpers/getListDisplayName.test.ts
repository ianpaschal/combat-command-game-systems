import {
  describe,
  expect,
  it,
} from 'vitest';

import { ListData } from '../schema/listData';
import { Alignment } from '../static/alignments';
import { Era } from '../static/eras';
import { Faction } from '../static/factions';
import { ForceDiagram } from '../static/forceDiagrams';
import { getListDisplayName } from './getListDisplayName';

describe('getListDisplayName()', () => {

  it('returns the force diagram display name when present.', () => {
    const list: Partial<ListData> = {
      meta: {
        forceDiagram: ForceDiagram.DDayBritish,
        faction: Faction.GreatBritain,
        alignment: Alignment.Allies,
        pointsLimit: 100,
        era: Era.LW,
      },
    };
    const result = getListDisplayName(list);
    expect(result).toEqual('D-Day: British Force\'');
  });

  it('falls back to the faction display name when there is no force diagram.', () => {
    const list: Partial<ListData> = {
      meta: {
        faction: Faction.Germany,
        alignment: Alignment.Axis,
        pointsLimit: 100,
        era: Era.LW,
      },
    };
    const result = getListDisplayName(list);
    expect(result).toEqual('Germany Force\'');
  });

  it('falls back to the alignment display name when there is no force diagram or faction.', () => {
    const list: Partial<ListData> = {
      meta: {
        alignment: Alignment.Axis,
        pointsLimit: 100,
        era: Era.LW,
      },
    };
    const result = getListDisplayName(list);
    expect(result).toEqual('Axis Force\'');
  });

  it('falls back to "Unknown" when there is no force diagram, faction, or alignment.', () => {
    const list: Partial<ListData> = {};
    const result = getListDisplayName(list);
    expect(result).toEqual('Unknown Force\'');
  });
});
