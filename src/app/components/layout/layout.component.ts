import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MoviesComponent } from './components/movies/movies.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, MoviesComponent],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {

}
