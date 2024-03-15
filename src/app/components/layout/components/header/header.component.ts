import { Component, OnInit, effect, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MoviesService } from '../../../../services/movies.service';
import { MoviesResponse } from '../../../../models/interface.movie';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  moviesService = inject(MoviesService);

  movies$ = this.moviesService.movies$;
  searching$ = this.moviesService.searching$;
  page$ = this.moviesService.page$;

  Input = new FormControl('', { nonNullable: true });


  ngOnInit(): void {
      this.Input.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(() => {
        this.searchMovie();
      })
  }

  searchMovie() {
    if(this.Input.value) {
      
      if(this.Input.dirty) {
        this.page$.update(() => 1);
      }

      this.searching$.update(() => true);

      this.moviesService.searchMovie(this.Input.value, this.page$()).subscribe({
        next: (movies: MoviesResponse) => {
          this.moviesService.movies$.update(() => movies);
        }
      });
    } else {
      this.searching$.update(() => false);
      this.page$.update(() => 1);
      this.moviesService.getPopularMovies(this.page$()).subscribe({
        next: (movies: MoviesResponse) => {
          this.moviesService.movies$.update(() => movies);
        }
      });
    }
  }
}
