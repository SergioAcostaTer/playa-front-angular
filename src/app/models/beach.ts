export interface Beach {
  id: string;
  coverUrl: string;
  name: string;
  blueFlag: boolean;
  classification: string;
  annualMaxOccupancy: string | null;
  municipality: string;
  environmentCondition: string | null;
  hasSand: boolean;
  hasRock: boolean;
  accessByCar: boolean;
  accessByFoot: string | null;
  hasToilets: boolean;
  hasShowers: boolean;
}
