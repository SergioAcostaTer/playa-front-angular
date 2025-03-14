export interface Beach {
    imageUrl: string;         // URL de la imagen de la playa
    title: string;            // Nombre de la playa
    rating: number;           // Calificación (e.g., 4.5)
    reviews: number;          // Número de reseñas
    distance: string;         // Distancia (e.g., "A 10 km")
    services: string[];       // Lista de servicios y características
    weather: string;          // Información del clima
    recommended?: boolean;    // Indicador opcional de recomendación
    description?: string;     // Descripción opcional de la playa
}