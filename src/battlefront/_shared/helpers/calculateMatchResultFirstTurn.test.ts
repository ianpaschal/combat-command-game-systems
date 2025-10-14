import {
  describe,
  expect,
  it,
} from 'vitest';

import { MissionData } from '../types';
import { calculateMatchResultFirstTurn } from './calculateMatchResultFirstTurn';

describe('calculateMatchResultFirstTurn', () => {

  it('should return undefined when mission is null.', () => {
    const result = calculateMatchResultFirstTurn(null);

    expect(result).toBeUndefined();
  });

  it('should return undefined when attacker is undefined.', () => {
    const mission = {
      firstTurn: 'attacker' as const,
    } as MissionData;

    const result = calculateMatchResultFirstTurn(mission);

    expect(result).toBeUndefined();
  });

  it('should return undefined when mission firstTurn is roll.', () => {
    const mission = {
      firstTurn: 'roll' as const,
    } as MissionData;

    const result = calculateMatchResultFirstTurn(mission, 0);

    expect(result).toBeUndefined();
  });

  describe('when player 0 attacks', () => {

    it('should return 0 when the attacker has the first turn.', () => {
      const mission = {
        firstTurn: 'attacker' as const,
      } as MissionData;

      const result = calculateMatchResultFirstTurn(mission, 0);

      expect(result).toEqual(0);
    });

    it('should return 1 when the defender has the first turn.', () => {
      const mission = {
        firstTurn: 'defender' as const,
      } as MissionData;

      const result = calculateMatchResultFirstTurn(mission, 0);

      expect(result).toEqual(1);
    });

  });

  describe('when player 1 attacks', () => {

    it('should return 0 when the attacker has the first turn.', () => {
      const mission = {
        firstTurn: 'attacker' as const,
      } as MissionData;

      const result = calculateMatchResultFirstTurn(mission, 1);

      expect(result).toEqual(1);
    });

    it('should return 1 when the defender has the first turn.', () => {
      const mission = {
        firstTurn: 'defender' as const,
      } as MissionData;

      const result = calculateMatchResultFirstTurn(mission, 1);

      expect(result).toEqual(0);
    });
  });
});
