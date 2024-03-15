import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MoviesComponent } from './components/movies/movies.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavBarComponent, HeaderComponent, MoviesComponent],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {

}
