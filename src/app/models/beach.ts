export interface Beach {
  id: string;
  coverUrl: string;
  name: string;
  island: string;
  municipality: string;
  province: string;
  accessByCar: boolean;
  accessByFoot: string | null;
  accessByShip: boolean;
  adaptedShower: boolean;
  annualMaxOccupancy: string | null;
  assistedBathing: boolean;
  bathingConditions: string | null;
  classification: string;
  environmentCondition: string | null;
  blueFlag: boolean;
  hasAdaptedShowers: boolean;
  hasCobbles: boolean;
  hasConcrete: boolean;
  hasFootShowers: boolean;
  hasGravel: boolean;
  hasMixedComposition: boolean;
  hasPebbles: boolean;
  hasRock: boolean;
  hasSand: boolean;
  hasShowers: boolean;
  hasToilets: boolean;
  isBeach: boolean;
  isWindy: boolean;
  isZbm: boolean;
  kidsArea: boolean;
  lastUpdate: string | null;
  latitude: number;
  longitude: number;
  length: number;
  width: number;
  lifeguardService: string;
  pmrShade: boolean;
  protectionLevel: string | null;
  riskLevel: string | null;
  sandColor: string | null;
  sportsArea: boolean;
  sunbedRentals: boolean;
  umbrellaRentals: boolean;
  waterSportsRentals: boolean;
  wheelchairAccess: boolean;
}

export interface BeachDescription {
  intro: string;
  paragraph: string;
}

export interface Comment {
  author: string;
  rating: number;
  text: string;
}
