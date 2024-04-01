import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { Movie } from 'src/app/type/types';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies:Movie[];

  constructor(private movieServie: MoviesService) {
    
    this.movies=this.movieServie.AllMovies();
   }

  ngOnInit(): void {
  }

}
