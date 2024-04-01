import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { Movie } from 'src/app/type/types';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent implements OnInit {


  topRated:Movie[];

  constructor(private movieServie: MoviesService) {
    
    this.topRated=this.movieServie.topRated();
   }

  ngOnInit(): void {
  }

}
