import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MoviesService } from '../../../../services/movies.service';
import { MoviesResponse } from '../../../../models/interface.movie';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  moviesService = inject(MoviesService);
  destroyRef = inject(DestroyRef);

  movies$ = this.moviesService.movies$;
  searching$ = this.moviesService.searching$;
  page$ = this.moviesService.page$;

  Input = new FormControl('', { nonNullable: true });


  ngOnInit(): void {
      this.Input.valueChanges
      .pipe(
        debounceTime(300)
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.search();
      })
  }

  search() {
    if(this.Input.value) {
      this.searchMovie();
    } else {
      this.getPopular();
    }
  }

  searchMovie() {
    this.searching$.update(() => true);
    if(this.Input.dirty) {
      this.page$.update(() => 1);
    }
    this.moviesService.searchMovie(this.Input.value, this.page$())
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (movies: MoviesResponse) => {
        this.moviesService.movies$.update(() => movies);
      }
    });
  }

  getPopular() {
    this.searching$.update(() => false);
      this.page$.update(() => 1);
      this.moviesService.getPopularMovies(this.page$())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (movies: MoviesResponse) => {
          this.moviesService.movies$.update(() => movies);
        }
      });
  }
}
