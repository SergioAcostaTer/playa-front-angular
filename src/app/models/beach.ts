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
    comments?: Comment[];   // Añadimos los comentarios
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
