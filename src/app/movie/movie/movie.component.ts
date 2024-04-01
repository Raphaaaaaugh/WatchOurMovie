import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/service/movies.service';
import { Movie } from 'src/app/type/types';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie:Movie;
  id!: string | null;

  constructor(private movieServie: MoviesService,private route: ActivatedRoute) { 
    this.id = this.route.snapshot.paramMap.get('movie_id');
    console.log(this.id)
   
    this.movie=this.movieServie.movieById(Number(this.id))
  }

  ngOnInit(): void {
  }

}
