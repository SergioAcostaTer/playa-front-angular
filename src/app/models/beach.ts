export interface Beach {
  id: string;
  access_by_car: boolean;
  access_by_foot: string | null;
  access_by_ship: boolean;
  adapted_shower: boolean;
  annual_max_occupancy: string | null;
  assisted_bathing: boolean;
  bathing_conditions: string | null;
  classification: string;
  environment_condition: string | null;
  has_adapted_showers: boolean;
  blue_flag: boolean;
  has_cobbles: boolean;
  has_concrete: boolean;
  has_foot_showers: boolean;
  has_gravel: boolean;
  has_mixed_composition: boolean;
  has_pebbles: boolean;
  has_rock: boolean;
  has_sand: boolean;
  has_showers: boolean;
  has_toilets: boolean;
  is_beach: boolean;
  is_windy: boolean;
  is_zbm: boolean; // Could be a flag for zones with special regulation (e.g., Marine Protected Areas)
  island: string;
  kids_area: boolean;
  last_update: string;
  latitude: number;
  length: number;
  lifeguard_service: string;
  longitude: number;
  municipality: string;
  name: string;
  pmr_shade: boolean; // PMR = Person with Reduced Mobility
  protection_level: string | null;
  province: string;
  risk_level: string | null;
  sand_color: string | null;
  sports_area: boolean;
  sunbed_rentals: boolean;
  umbrella_rentals: boolean;
  water_sports_rentals: boolean;
  wheelchair_access: boolean;
  width: number;
  cover_url: string;
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
