export interface Beach {
    imageUrl: string;
    title: string;
    rating: number;
    reviews: number;
    distance?: string;
    services?: string[];
    weather?: string;
    mapImageUrl?: string;           // URL del mapa (opcional)
    description?: BeachDescription; // Descripción de la playa (opcional)
}

export interface BeachDescription {
    intro: string;
    features: string;
    services: string[];
    activities: string[];
    accessibility: string[];
    events: string[];
    climate: string;
    prices: string[];
    availability: string;
}
    