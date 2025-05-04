export interface Beach {
  id: string;
  coverUrl: string;
  name: string;
  island: string;
  municipality: string;
  accessByCar: boolean;
  accessByFoot: string | null;
  annualMaxOccupancy: string | null;
  blueFlag: boolean;
  classification: string;
  environmentCondition: string | null;
  hasSand: boolean;
  hasRock: boolean;
  hasToilets: boolean;
  hasShowers: boolean;
  longitude: number;
  latitude: number;
  length: number;
}
