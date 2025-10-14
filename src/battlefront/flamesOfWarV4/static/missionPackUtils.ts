import { createGameSystemUtils } from '../../_shared/_internal/createGameSystemUtils';
import { alignments } from './alignments';
import { factions } from './factions';
import { forceDiagrams } from './forceDiagrams';
import { missionPackVersions } from './missionPackVersions';
import { series } from './series';

export const {
  getForceDiagramData,
  getMission,
  getMissionMatrixOptions,
  getMissionOptions,
  getMissionOutcomeOptions,
  getMissionPack,
} = createGameSystemUtils({
  forceDiagrams,
  factions,
  alignments,
  series,
  missionPackVersions,
});
