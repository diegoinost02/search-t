import { Component, OnInit, effect, inject } from '@angular/core';
import { MoviesService } from '../../../../services/movies.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'; // npm install ngx-infinite-scroll --save
import { MoviesResponse } from '../../../../models/interface.movie';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [InfiniteScrollModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit{

  moviesService = inject(MoviesService);

  movies$ = this.moviesService.movies$;
  searching$ = this.moviesService.searching$;
  page$ = this.moviesService.page$;

  imgPath = 'https://image.tmdb.org/t/p/w500';
  ytUrl: string = 'https://www.youtube.com/embed/';

  ngOnInit(): void {
    this.moviesService.getPopularMovies(this.page$()).subscribe({
      next: (movies: MoviesResponse) => {
        if (movies) {
          this.moviesService.movies$.update(() => movies);
        }
      }
    })
  }

  appendMovies() {
    if(this.searching$() === true) return;
    this.page$.update(page => page + 1);
    this.getMovies();
  }

  getMovies() {
    this.moviesService.getPopularMovies(this.page$()).subscribe({
      next: (newMovies: MoviesResponse) => {
        this.moviesService.movies$.update( movies => {
          movies!.results = [...movies!.results, ...newMovies!.results];
          return movies;
        });
      }
    });
  }
}
