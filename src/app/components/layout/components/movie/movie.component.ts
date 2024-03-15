import { Component, inject } from '@angular/core';
import { MovieData } from '../../../../models/interface.movie';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {

  public movieData: MovieData = inject(MAT_DIALOG_DATA);
  imgPath = 'https://image.tmdb.org/t/p/w500';

}