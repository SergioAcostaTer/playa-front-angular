import { Beach } from "./beach";

export interface SearchBeachesResponse {
    status: number;
    data: Beach[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        nextPage: string | null;
        limit: number;
    };
}