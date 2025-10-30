import { createGetMission } from '../../_shared/_internal/createGetMission';
import { createGetMissionMatrixOptions } from '../../_shared/_internal/createGetMissionMatrixOptions';
import { createGetMissionOptions } from '../../_shared/_internal/createGetMissionOptions';
import { createGetMissionOutcomeTypeOptions } from '../../_shared/_internal/createGetMissionOutcomeOptions';
import { createGetMissionPack } from '../../_shared/_internal/createGetMissionPack';
import { missionPackVersions } from './missionPackVersions';

export const getMission = createGetMission(missionPackVersions);
export const getMissionMatrixOptions = createGetMissionMatrixOptions(missionPackVersions);
export const getMissionOptions = createGetMissionOptions(missionPackVersions);
export const getMissionOutcomeOptions = createGetMissionOutcomeTypeOptions(missionPackVersions);
export const getMissionPack = createGetMissionPack(missionPackVersions);
