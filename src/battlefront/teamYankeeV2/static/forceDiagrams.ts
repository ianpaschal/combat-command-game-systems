import { getDisplayName, getOptions } from '../../../common/_internal';
import { ForceDiagramMetadata } from '../../_shared/types';
import { Faction } from './factions';
import { Series } from './series';

export enum ForceDiagram {
  American = 'american',
  British = 'british',
  Israeli = 'israeli',
  NatoForcesAnzac = 'nato_forces_anzac',
  NatoForcesBelgian = 'nato_forces_belgian',
  NatoForcesCanadian = 'nato_forces_canadian',
  NatoForcesDutch = 'nato_forces_dutch',
  NatoForcesFrench = 'nato_forces_french',
  NordicForcesDanish = 'nordic_forces_danish',
  NordicForcesFinnish = 'nordic_forces_finnish',
  NordicForcesNorwegian = 'nordic_forces_norwegian',
  NordicForcesSwedish = 'nordic_forces_swedish',
  OilWarIranian = 'oil_war_iranian',
  OilWarIraqi = 'oil_war_iraqi',
  OilWarIsraeli = 'oil_war_israeli',
  OilWarSyrian = 'oil_war_syrian',
  RedDawnCuban = 'red_dawn_cuban',
  Soviet = 'soviet',
  WarsawPactCzechoslovak = 'warsaw_pact_czechoslovak',
  WarsawPactEastGerman = 'warsaw_pact_east_german',
  WarsawPactPolish = 'warsaw_pact_polish',
  WestGerman = 'west_german',
}

export const forceDiagrams: Record<ForceDiagram, ForceDiagramMetadata<Faction, Series>> = {
  [ForceDiagram.American]: {
    displayName: 'American',
    faction: Faction.UnitedStates,
    series: Series.Default,
  },
  [ForceDiagram.British]: {
    displayName: 'British',
    faction: Faction.GreatBritain,
    series: Series.Default,
  },
  [ForceDiagram.Israeli]: {
    displayName: 'Israeli',
    faction: Faction.Israel,
    series: Series.Default,
  },
  [ForceDiagram.NatoForcesAnzac]: {
    displayName: 'NATO Forces: ANZAC',
    faction: Faction.Anzac,
    series: Series.NatoForces,
  },
  [ForceDiagram.NatoForcesBelgian]: {
    displayName: 'NATO Forces: Belgian',
    faction: Faction.Belgium,
    series: Series.NatoForces,
  },
  [ForceDiagram.NatoForcesCanadian]: {
    displayName: 'NATO Forces: Canadian',
    faction: Faction.Canada,
    series: Series.NatoForces,
  },
  [ForceDiagram.NatoForcesDutch]: {
    displayName: 'NATO Forces: Dutch',
    faction: Faction.Netherlands,
    series: Series.NatoForces,
  },
  [ForceDiagram.NatoForcesFrench]: {
    displayName: 'NATO Forces: French',
    faction: Faction.France,
    series: Series.NatoForces,
  },
  [ForceDiagram.NordicForcesDanish]: {
    displayName: 'Nordic Forces: Danish',
    faction: Faction.Denmark,
    series: Series.NordicForces,
  },
  [ForceDiagram.NordicForcesFinnish]: {
    displayName: 'Nordic Forces: Finnish',
    faction: Faction.Finland,
    series: Series.NordicForces,
  },
  [ForceDiagram.NordicForcesNorwegian]: {
    displayName: 'Nordic Forces: Norwegian',
    faction: Faction.Norway,
    series: Series.NordicForces,
  },
  [ForceDiagram.NordicForcesSwedish]: {
    displayName: 'Nordic Forces: Swedish',
    faction: Faction.Sweden,
    series: Series.NordicForces,
  },
  [ForceDiagram.OilWarIranian]: {
    displayName: 'Oil War: Iranian',
    faction: Faction.Iran,
    series: Series.OilWar,
  },
  [ForceDiagram.OilWarIraqi]: {
    displayName: 'Oil War: Iraqi',
    faction: Faction.Iraq,
    series: Series.OilWar,
  },
  [ForceDiagram.OilWarIsraeli]: {
    displayName: 'Oil War: Israeli',
    faction: Faction.Israel,
    series: Series.OilWar,
  },
  [ForceDiagram.OilWarSyrian]: {
    displayName: 'Oil War: Syrian',
    faction: Faction.Syria,
    series: Series.OilWar,
  },
  [ForceDiagram.RedDawnCuban]: {
    displayName: 'Red Dawn: Cuban',
    faction: Faction.Cuba,
    series: Series.RedDawn,
  },
  [ForceDiagram.Soviet]: {
    displayName: 'Soviet',
    faction: Faction.SovietUnion,
    series: Series.Default,
  },
  [ForceDiagram.WarsawPactCzechoslovak]: {
    displayName: 'Warsaw Pact: Czechoslovak',
    faction: Faction.Czechoslovakia,
    series: Series.WarsawPact,
  },
  [ForceDiagram.WarsawPactEastGerman]: {
    displayName: 'Warsaw Pact: East German',
    faction: Faction.EastGermany,
    series: Series.WarsawPact,
  },
  [ForceDiagram.WarsawPactPolish]: {
    displayName: 'Warsaw Pact: Polish',
    faction: Faction.Poland,
    series: Series.WarsawPact,
  },
  [ForceDiagram.WestGerman]: {
    displayName: 'West German',
    faction: Faction.WestGermany,
    series: Series.Default,
  },
};

export const getForceDiagramOptions = () => getOptions(forceDiagrams);

export const getForceDiagramDisplayName = (
  key: ForceDiagram,
) => getDisplayName(forceDiagrams, key);
