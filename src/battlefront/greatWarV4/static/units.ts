import { UnitMetadata } from '../../_shared/types';
import { ForceDiagram } from './forceDiagrams';

export enum Unit {
  GWB101 = 'GWB101',
  GWB105 = 'GWB105',
  GWB128 = 'GWB128',
  GWB136 = 'GWB136',
  GWBE101 = 'GWBE101',
  GWF101 = 'GWF101',
  GWF107 = 'GWF107',
  GWF118 = 'GWF118',
  GWF124 = 'GWF124',
  GWF130 = 'GWF130',
  GWG101 = 'GWG101',
  GWG105 = 'GWG105',
  GWG109 = 'GWG109',
  GWG114 = 'GWG114',
  GWU101 = 'GWU101',
  GWU107 = 'GWU107',
  GWU118 = 'GWU118',
}

export const units: Record<Unit, UnitMetadata<ForceDiagram>> = {

  [Unit.GWB101]: {
    displayName: 'Line Division Rifle Company',
    sourceForceDiagram: ForceDiagram.British,
    isFormation: true,
  },
  [Unit.GWB105]: {
    displayName: 'Elite Division Rifle Company',
    sourceForceDiagram: ForceDiagram.British,
    isFormation: true,
  },
  [Unit.GWB128]: {
    displayName: 'ANZAC or Canadian Rifle Company',
    sourceForceDiagram: ForceDiagram.British,
    isFormation: true,
  },
  [Unit.GWB136]: {
    displayName: 'Cavalry Squadron',
    sourceForceDiagram: ForceDiagram.British,
    isFormation: true,
  },
  [Unit.GWBE101]: {
    displayName: 'Compagnie d\'Infanterie',
    sourceForceDiagram: ForceDiagram.Belgian,
    isFormation: true,
  },
  [Unit.GWF101]: {
    displayName: 'Compagnie de Fusiliers',
    sourceForceDiagram: ForceDiagram.French,
    isFormation: true,
  },
  [Unit.GWF107]: {
    displayName: 'Compagnie de Tirailleurs',
    sourceForceDiagram: ForceDiagram.French,
    isFormation: true,
  },
  [Unit.GWF118]: {
    displayName: 'Compagnie de Fusiliers Russe',
    sourceForceDiagram: ForceDiagram.French,
    isFormation: true,
  },
  [Unit.GWF124]: {
    displayName: 'Harlem Hellfighters Rifle Company',
    sourceForceDiagram: ForceDiagram.French,
    isFormation: true,
  },
  [Unit.GWF130]: {
    displayName: 'Escadron de Cavalerie',
    sourceForceDiagram: ForceDiagram.French,
    isFormation: true,
  },
  [Unit.GWG101]: {
    displayName: 'Infanteriekompanie',
    sourceForceDiagram: ForceDiagram.German,
    isFormation: true,
  },
  [Unit.GWG105]: {
    displayName: 'Stosskompanie',
    sourceForceDiagram: ForceDiagram.German,
    isFormation: true,
  },
  [Unit.GWG109]: {
    displayName: 'Jägerkompanie',
    sourceForceDiagram: ForceDiagram.German,
    isFormation: true,
  },
  [Unit.GWG114]: {
    displayName: 'Siegfriedstellung',
    sourceForceDiagram: ForceDiagram.German,
    isFormation: true,
  },
  [Unit.GWU101]: {
    displayName: '1st Infantry Division Rifle Company',
    sourceForceDiagram: ForceDiagram.American,
    isFormation: true,
  },
  [Unit.GWU107]: {
    displayName: '42nd Infantry Division Rifle Company',
    sourceForceDiagram: ForceDiagram.American,
    isFormation: true,
  },
  [Unit.GWU118]: {
    displayName: '4th Marine Brigade Rifle Company',
    sourceForceDiagram: ForceDiagram.American,
    isFormation: true,
  },
} as const;
