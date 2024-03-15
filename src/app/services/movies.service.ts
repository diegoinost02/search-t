import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { MoviesResponse } from '../models/interface.movie';
import { Video } from '../models/interface.video';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private http = inject(HttpClient);

  apiUrl: string = environment.API_MOVIES_URL;
  apiToken: string = environment.API_TOKEN;

  movies$ = signal<MoviesResponse | null>(null);
  searching$ = signal<boolean>(false);
  page$ = signal<number>(1);
  // input$ = signal<FormControl>(new FormControl('', { nonNullable: true }));

  getPopularMovies(page: number) {
    return this.http.get<MoviesResponse>(`${this.apiUrl}/movie/popular?page=${page}`, {
      headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.apiToken}`
      }
    })
  }

  searchMovie(query: string, page: number) {
    return this.http.get<MoviesResponse>(`${this.apiUrl}/search/movie?query=${query}&page=${page}`, {
      headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.apiToken}`,
      }
    }).pipe(tap(movies => this.movies$.update(() => movies)));
  }

  getVideoMovie(movieId: number) {
    return this.http.get<Video>(`${this.apiUrl}/movie/${movieId}/videos`, {
      headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.apiToken}`
      }
    })
  }
}