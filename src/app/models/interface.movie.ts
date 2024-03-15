import { SafeResourceUrl } from "@angular/platform-browser";

export interface MoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface Movie {
    id: number;
    genre_ids: number[];
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
export interface MovieData {
    movie: Movie;
    urlVideo: SafeResourceUrl;
}