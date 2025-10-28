import { SelectOption } from '../../../common/types';
import { BattlePlan } from '../static/battlePlans';
import { getMatchOutcomeTypeOptions, MatchOutcomeType } from '../static/matchOutcomeTypes';
import { getMissionNameOptions ,MissionName } from '../static/missionNames';
import { MissionData, MissionPackMetadata } from '../types';

export interface GameSystemData<
  TForceDiagram extends string,
  TFaction extends string,
  TAlignment extends string,
  TSeries extends string,
  TMissionPackVersion extends string,
  TMissionMatrix extends string,
> {
  forceDiagrams: Record<TForceDiagram, {
    displayName: string;
    faction: TFaction;
    series: TSeries;
  }>;
  factions: Record<TFaction, {
    displayName: string;
    alignment: TAlignment;
  }>;
  alignments: Record<TAlignment, {
    displayName: string;
  }>;
  series: Record<TSeries, {
    displayName: string;
  }>;
  missionPackVersions: Record<TMissionPackVersion, MissionPackMetadata<TMissionMatrix>>;
}

export function createGameSystemUtils<
  TForceDiagram extends string,
  TFaction extends string,
  TAlignment extends string,
  TSeries extends string,
  TMissionPackVersion extends string,
  TMissionMatrix extends string
>(
  gameSystemData: GameSystemData<TForceDiagram, TFaction, TAlignment, TSeries, TMissionPackVersion, TMissionMatrix>,
) {
  const { forceDiagrams, factions, alignments, series, missionPackVersions } = gameSystemData;
  
  const isValidMissionPackVersion = (version: unknown): version is TMissionPackVersion => (
    Object.keys(missionPackVersions).includes(version as TMissionPackVersion)
  );

  // const isValidMissionMatrix = (matrix: unknown): matrix is TMissionMatrix => (
  //   Object.keys(missionMa).includes(matrix as TMissionMatrix)
  // );

  const getForceDiagramData = (forceDiagram: TForceDiagram) => {
    const data = forceDiagrams[forceDiagram];
    return {
      id: forceDiagram,
      displayName: data.displayName,
      series: data.series,
      seriesDisplayName: series[data.series].displayName,
      faction: data.faction,
      factionDisplayName: factions[data.faction].displayName,
      alignment: factions[data.faction].alignment,
      alignmentDisplayName: alignments[factions[data.faction].alignment].displayName,
    };
  };

  const getMission = (
    missionPackVersion?: string,
    missionName?: MissionName,
  ): MissionData | null => {
    if (!isValidMissionPackVersion(missionPackVersion) || !missionName) {
      return null;
    }
    return missionPackVersions[missionPackVersion].missions[missionName] ?? null;
  };

  const getMissionPack = (
    missionPackVersion: string,
  ): MissionPackMetadata<TMissionMatrix> | null => isValidMissionPackVersion(missionPackVersion) ? missionPackVersions[missionPackVersion] : null;

  const getMissionMatrixOptions = (
    missionPackVersion?: string,
  ): SelectOption<TMissionMatrix>[] => {
    if (!isValidMissionPackVersion(missionPackVersion)) {
      return [];
    }
    const pack = missionPackVersions[missionPackVersion];
    if (!pack) {
      return [];
    }
    return Object.entries(pack.matrixes).map(([value, matrixData]) => ({
      value: value as TMissionMatrix,
      label: (matrixData as { displayName: string }).displayName,
    }));
  };

  const getMissionOptions = (
    missionPackVersion?: string,
    missionMatrix?: TMissionMatrix,
    battlePlans?: [BattlePlan | undefined, BattlePlan | undefined],
  ): SelectOption<MissionName>[] => {
    if (!isValidMissionPackVersion(missionPackVersion)) {
      return [];
    }
    const pack = missionPackVersions[missionPackVersion];
    if (!pack) {
      return [];
    }
    const packMissionIds = new Set(Object.keys(pack.missions) as MissionName[]);

    // Gather missions
    const missionOptions: SelectOption<MissionName>[] = getMissionNameOptions().filter((option) => (
      packMissionIds.has(option.value)
    ));

    // If not using matrix, return. Otherwise, proceed
    if (!missionMatrix) {
      return missionOptions;
    }

    const matrix = pack.matrixes[missionMatrix];

    if (!matrix || !battlePlans) {
      return missionOptions;
    }

    const entry = matrix.entries.find((entry) => entry.selector(...battlePlans));
    if (!entry) {
      return missionOptions;
    }
    const matrixMissionIds = entry.missions.reduce((acc, missionIds) => [
      ...acc,
      ...missionIds,
    ], []);

    return missionOptions.filter((item) => matrixMissionIds.includes(item.value));
  };

  const getMissionOutcomeOptions = (
    missionPackVersion?: string,
    missionName?: MissionName,
  ): SelectOption<MatchOutcomeType>[] => {
    if (!isValidMissionPackVersion(missionPackVersion) || !missionName) {
      return [];
    }
    const mission = getMission(missionPackVersion, missionName);
    if (!mission) {
      return [];
    }
    const validOutcomes: Set<MatchOutcomeType> = new Set([
      MatchOutcomeType.ForceBroken, // Always possible
      MatchOutcomeType.TimeOut, // Always possible
      ...mission.victoryConditions,
    ]);
    return getMatchOutcomeTypeOptions().filter((option) => validOutcomes.has(option.value));
  };

  return {
    getForceDiagramData,
    getMission,
    getMissionPack,
    getMissionMatrixOptions,
    getMissionOptions,
    getMissionOutcomeOptions,
  };
}
