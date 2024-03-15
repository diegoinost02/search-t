import { Component, inject } from '@angular/core';
import { MovieData } from '../../../../models/interface.movie';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {

  public movieData: MovieData = inject(MAT_DIALOG_DATA);
}