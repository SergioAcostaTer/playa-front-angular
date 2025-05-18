import { LocationConfig } from "../models/location-config";

export const CANARY_ISLANDS_CONFIG: LocationConfig = {
  defaultCenter: [-16.6291, 28.2916], // Canary Islands default center
  defaultZoom: 8,
  bounds: {
    minLat: 27.6,
    maxLat: 29.5,
    minLng: -18.2,
    maxLng: -13.3,
  },
};

export const BALEARIC_ISLANDS_CONFIG: LocationConfig = {
  defaultCenter: [2.6502, 39.5694], // Balearic Islands default center
  defaultZoom: 8,
  bounds: {
    minLat: 38.6,
    maxLat: 40.1,
    minLng: 1.2,
    maxLng: 4.3,
  },
};