import { ForceDiagramMetadata } from '../types';
import { Faction } from './factions';
import { Series } from './series';

export enum ForceDiagram {

  // Mid-War:
  AfrikaKorps = 'afrika_korps',
  ArmouredFist = 'armoured_fist',
  Avanti = 'avanti',
  FightingFirst = 'fighting_first',
  EnemyAtTheGates = 'enemy_at_the_gates',
  GhostPanzers = 'ghost_panzers',
  IronCross = 'iron_cross',
  RedBanner = 'red_banner',
  BraveRomania = 'brave_romania',
  HungarianSteel = 'hungarian_steel',
  WhiteDeath = 'white_death',

  // Late War:
  BagrationFinnish = 'bagration_finnish',
  BagrationGerman = 'bagration_german',
  BagrationHungarian = 'bagration_hungarian',
  BagrationRomanian = 'bagration_romanian',
  BagrationSoviet = 'bagration_soviet',
  BerlinGerman = 'berlin_german',
  BerlinSoviet = 'berlin_soviet',
  BulgeAmerican = 'bulge_american',
  BulgeBritish = 'bulge_british',
  BulgeGerman = 'bulge_german',
  DDayAmerican = 'd_day_american',
  DDayBritish = 'd_day_british',
  DDayGerman = 'd_day_german',
  DDayWaffenSs = 'd_day_waffen_ss',
  FortressEuropeAmerican = 'fortress_europe_american',
  FortressEuropeBritish = 'fortress_europe_british',
  FortressEuropeGerman = 'fortress_europe_german',
  FortressEuropeSoviet = 'fortress_europe_soviet',
  LeviathansAmerican = 'leviathans_american',
  LeviathansBritish = 'leviathans_british',
  LeviathansGerman = 'leviathans_german',
  LeviathansSoviet = 'leviathans_soviet',
  LiberationOfItalyAmerican = 'liberation_of_italy_american',
  LiberationOfItalyBritish = 'liberation_of_italy_british',
  LiberationOfItalyCIL = 'liberation_of_italy_cil',
  LiberationOfItalyFrench = 'liberation_of_italy_french',
  LiberationOfItalyGerman = 'liberation_of_italy_german',
  LiberationOfItalyGruppiDiCombattimentoBritish = 'liberation_of_italy_gruppi_di_combattimento_british',
  LiberationOfItalyGruppiDiCombattimentoUs = 'liberation_of_italy_gruppi_di_combattimento_us',
  LiberationOfItalyRSI = 'liberation_of_italy_rsi',
  PacificAmerican = 'pacific_american',
  PacificAustralian = 'pacific_australian',
  PacificBritish = 'pacific_british',
  PacificJapanese = 'pacific_japanese',
}

export const forceDiagrams: Record<ForceDiagram, ForceDiagramMetadata<Faction, Series>> = {
  [ForceDiagram.BerlinGerman]: {
    displayName: 'Berlin: German',
    faction: Faction.Germany,
    series: Series.Berlin,
  },
  [ForceDiagram.BerlinSoviet]: {
    displayName: 'Berlin: Soviet',
    faction: Faction.SovietUnion,
    series: Series.Berlin,
  },
  [ForceDiagram.BulgeGerman]: {
    displayName: 'Bulge: German',
    faction: Faction.Germany,
    series: Series.Bulge,
  },
  [ForceDiagram.BulgeAmerican]: {
    displayName: 'Bulge: American',
    faction: Faction.UnitedStates,
    series: Series.Bulge,
  },
  [ForceDiagram.BulgeBritish]: {
    displayName: 'Bulge: British',
    faction: Faction.GreatBritain,
    series: Series.Bulge,
  },
  [ForceDiagram.BagrationFinnish]: {
    displayName: 'Bagration: Finnish',
    faction: Faction.Finland,
    series: Series.Bagration,
  },
  [ForceDiagram.BagrationGerman]: {
    displayName: 'Bagration: German',
    faction: Faction.Germany,
    series: Series.Bagration,
  },
  [ForceDiagram.BagrationHungarian]: {
    displayName: 'Bagration: Hungarian',
    faction: Faction.Hungary,
    series: Series.Bagration,
  },
  [ForceDiagram.BagrationRomanian]: {
    displayName: 'Bagration: Romanian',
    faction: Faction.Romania,
    series: Series.Bagration,
  },
  [ForceDiagram.BagrationSoviet]: {
    displayName: 'Bagration: Soviet',
    faction: Faction.SovietUnion,
    series: Series.Bagration,
  },
  [ForceDiagram.DDayAmerican]: {
    displayName: 'D-Day: American',
    faction: Faction.UnitedStates,
    series: Series.DDay,
  },
  [ForceDiagram.DDayBritish]: {
    displayName: 'D-Day: British',
    faction: Faction.GreatBritain,
    series: Series.DDay,
  },
  [ForceDiagram.DDayGerman]: {
    displayName: 'D-Day: German',
    faction: Faction.Germany,
    series: Series.DDay,
  },
  [ForceDiagram.DDayWaffenSs]: {
    displayName: 'D-Day: Waffen-SS',
    faction: Faction.Germany,
    series: Series.DDay,
  },
  [ForceDiagram.FortressEuropeAmerican]: {
    displayName: 'Fortress Europe: American',
    faction: Faction.UnitedStates,
    series: Series.FortressEurope,
  },
  [ForceDiagram.FortressEuropeBritish]: {
    displayName: 'Fortress Europe: British',
    faction: Faction.GreatBritain,
    series: Series.FortressEurope,
  },
  [ForceDiagram.FortressEuropeGerman]: {
    displayName: 'Fortress Europe: German',
    faction: Faction.Germany,
    series: Series.FortressEurope,
  },
  [ForceDiagram.FortressEuropeSoviet]: {
    displayName: 'Fortress Europe: Soviet',
    faction: Faction.SovietUnion,
    series: Series.FortressEurope,
  },
  [ForceDiagram.LeviathansAmerican]: {
    displayName: 'Leviathans: American',
    faction: Faction.UnitedStates,
    series: Series.Leviathans,
  },
  [ForceDiagram.LeviathansBritish]: {
    displayName: 'Leviathans: British',
    faction: Faction.GreatBritain,
    series: Series.Leviathans,
  },
  [ForceDiagram.LeviathansGerman]: {
    displayName: 'Leviathans: German',
    faction: Faction.Germany,
    series: Series.Leviathans,
  },
  [ForceDiagram.LeviathansSoviet]: {
    displayName: 'Leviathans: Soviet',
    faction: Faction.SovietUnion,
    series: Series.Leviathans,
  },
  [ForceDiagram.PacificAmerican]: {
    displayName: 'The Pacific: US Marine & Army',
    faction: Faction.UnitedStates,
    series: Series.Pacific,
  },
  [ForceDiagram.PacificAustralian]: {
    displayName: 'The Pacific: Australian',
    faction: Faction.Australia,
    series: Series.Pacific,
  },
  [ForceDiagram.PacificBritish]: {
    displayName: 'The Pacific: British & Indian',
    faction: Faction.GreatBritain,
    series: Series.Pacific,
  },
  [ForceDiagram.PacificJapanese]: {
    displayName: 'The Pacific: Japanese',
    faction: Faction.Japan,
    series: Series.Pacific,
  },
  [ForceDiagram.EnemyAtTheGates]: {
    displayName: 'Avanti',
    faction: Faction.SovietUnion,
    series: Series.EasternFront,
  },
  [ForceDiagram.GhostPanzers]: {
    displayName: 'Ghost Panzers',
    faction: Faction.Germany,
    series: Series.EasternFront,
  },
  [ForceDiagram.IronCross]: {
    displayName: 'Iron Cross',
    faction: Faction.Germany,
    series: Series.EasternFront,
  },
  [ForceDiagram.RedBanner]: {
    displayName: 'Red Banner',
    faction: Faction.SovietUnion,
    series: Series.EasternFront,
  },
  [ForceDiagram.BraveRomania]: {
    displayName: 'Brave Romania',
    faction: Faction.Romania,
    series: Series.EasternFront,
  },
  [ForceDiagram.HungarianSteel]: {
    displayName: 'Hungarian Steel',
    faction: Faction.Hungary,
    series: Series.EasternFront,
  },
  [ForceDiagram.WhiteDeath]: {
    displayName: 'White Death',
    faction: Faction.Finland,
    series: Series.EasternFront,
  },
  [ForceDiagram.AfrikaKorps]: {
    displayName: 'Afrika Korps',
    faction: Faction.Germany,
    series: Series.NorthAfrica,
  },
  [ForceDiagram.ArmouredFist]: {
    displayName: 'Armoured Fist',
    faction: Faction.GreatBritain,
    series: Series.NorthAfrica,
  },
  [ForceDiagram.Avanti]: {
    displayName: 'Avanti',
    faction: Faction.Italy,
    series: Series.NorthAfrica,
  },
  [ForceDiagram.FightingFirst]: {
    displayName: 'Fighting First',
    faction: Faction.UnitedStates,
    series: Series.NorthAfrica,
  },
  [ForceDiagram.LiberationOfItalyFrench]: {
    displayName: 'Liberation of Italy: French',
    faction: Faction.France,
    series: Series.LiberationOfItaly,
  },
  [ForceDiagram.LiberationOfItalyGerman]: {
    displayName: 'Liberation of Italy: German',
    faction: Faction.Germany,
    series: Series.LiberationOfItaly,
  },
  [ForceDiagram.LiberationOfItalyAmerican]: {
    displayName: 'Liberation of Italy: American',
    faction: Faction.UnitedStates,
    series: Series.LiberationOfItaly,
  },
  [ForceDiagram.LiberationOfItalyBritish]: {
    displayName: 'Liberation of Italy: British',
    faction: Faction.GreatBritain,
    series: Series.LiberationOfItaly,
  },
  [ForceDiagram.LiberationOfItalyRSI]: {
    displayName: 'Liberation of Italy: RSI',
    faction: Faction.ItalyAxis,
    series: Series.LiberationOfItaly,
  },
  [ForceDiagram.LiberationOfItalyCIL]: {
    displayName: 'Liberation of Italy: CIL',
    faction: Faction.ItalyAllies,
    series: Series.LiberationOfItaly,
  },
  [ForceDiagram.LiberationOfItalyGruppiDiCombattimentoUs]: {
    displayName: 'Liberation of Italy: Gruppi di Combattimento (US)',
    faction: Faction.ItalyAllies,
    series: Series.LiberationOfItaly,
  },
  [ForceDiagram.LiberationOfItalyGruppiDiCombattimentoBritish]: {
    displayName: 'Liberation of Italy: Gruppi di Combattimento (British)',
    faction: Faction.ItalyAllies,
    series: Series.LiberationOfItaly,
  },
};
