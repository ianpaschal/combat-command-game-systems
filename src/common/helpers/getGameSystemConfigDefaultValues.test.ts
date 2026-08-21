import {
  describe,
  expect,
  it,
} from 'vitest';

import * as FlamesOfWarV4 from '../../battlefront/flamesOfWarV4';
import * as GreatWarV4 from '../../battlefront/greatWarV4';
import * as TeamYankeeV2 from '../../battlefront/teamYankeeV2';
import * as BoltActionV3 from '../../warlord/boltActionV3';
import { GameSystem } from '../static/gameSystems';
import { getGameSystemConfigDefaultValues } from './getGameSystemConfigDefaultValues';

describe('getGameSystemConfigDefaultValues()', () => {
  it.each([
    [GameSystem.BoltActionV3, BoltActionV3.gameSystemConfig],
    [GameSystem.FlamesOfWarV4, FlamesOfWarV4.gameSystemConfig],
    [GameSystem.GreatWarV4, GreatWarV4.gameSystemConfig],
    [GameSystem.TeamYankeeV2, TeamYankeeV2.gameSystemConfig],
  ])('returns the plain defaultValues for %s when no options are given.', (gameSystem, gameSystemConfig) => {
    expect(getGameSystemConfigDefaultValues(gameSystem)).toEqual(gameSystemConfig.defaultValues);
  });

  it('ignores options for a game system with no getDefaultValues.', () => {
    const result = getGameSystemConfigDefaultValues(GameSystem.FlamesOfWarV4, { tournament: true });

    expect(result).not.toHaveProperty('tournamentScoring');
  });

  it('returns Bolt Action v3 defaults without tournamentScoring when no options are given.', () => {
    const result = getGameSystemConfigDefaultValues(GameSystem.BoltActionV3);

    expect(result.tournamentScoring).toBeUndefined();
  });

  it('returns Bolt Action v3 defaults without tournamentScoring when tournament is false.', () => {
    const result = getGameSystemConfigDefaultValues(GameSystem.BoltActionV3, { tournament: false });

    expect(result.tournamentScoring).toBeUndefined();
  });

  it('returns Bolt Action v3 defaults with tournamentScoring when tournament is true.', () => {
    const result = getGameSystemConfigDefaultValues(GameSystem.BoltActionV3, { tournament: true });

    expect(result.tournamentScoring).toEqual({ win: 3, draw: 1, loss: 0 });
  });
});
