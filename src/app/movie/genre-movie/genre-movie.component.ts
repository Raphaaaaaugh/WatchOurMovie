import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/service/movies.service';
import { Movie } from 'src/app/type/types';

@Component({
  selector: 'app-genre-movie',
  templateUrl: './genre-movie.component.html',
  styleUrls: ['./genre-movie.component.css']
})
export class GenreMovieComponent implements OnInit {

  movieGenre:Movie[];
  id!: string | null;

  constructor(private movieServie: MoviesService,private route: ActivatedRoute) { 
    this.id = this.route.snapshot.paramMap.get('genre_id');
    console.log(this.id)
   
    this.movieGenre=this.movieServie.movieGenre(Number(this.id))
  }

  ngOnInit(): void {
  }

}
