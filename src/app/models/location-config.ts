export interface LocationConfig {
    defaultCenter: [number, number];
    defaultZoom: number;
    bounds: {
        minLat: number;
        maxLat: number;
        minLng: number;
        maxLng: number;
    };
}
