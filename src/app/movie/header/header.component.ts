import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { Movie } from 'src/app/type/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  /*actionMovie:Movie[];
  adventureMovie:Movie[];
  animationMovie:Movie[];
  comedyMovie:Movie[];
  crimeMovie:Movie[];
  docMovie:Movie[];
  dramaMovie:Movie[];
  famMovie:Movie[];
  fanMovie:Movie[];
  histMovie:Movie[];
  musicMovie:Movie[];
  mystMovie:Movie[];
  romanceMovie:Movie[];
  horrorMovie:Movie[];
  scienceMovie:Movie[];
  tvMovie:Movie[];
  thrillerMovie:Movie[];
  warMovie:Movie[];
  westMovie:Movie[];*/
 

  constructor(movieService: MoviesService) { 
   /* this.actionMovie=movieService.movieGenre(28);
    this.adventureMovie=movieService.movieGenre(12);
    this.animationMovie=movieService.movieGenre(16);
    this.comedyMovie=movieService.movieGenre(35);
  this.crimeMovie=movieService.movieGenre(80);
  this.docMovie=movieService.movieGenre(99);
  this.dramaMovie=movieService.movieGenre(18);
  this.famMovie=movieService.movieGenre(10751);
  this.fanMovie=movieService.movieGenre(14);
  this.histMovie=movieService.movieGenre(36);
  this.musicMovie=movieService.movieGenre(10402);
  this.mystMovie=movieService.movieGenre(9648);
  this.romanceMovie=movieService.movieGenre(10749);
  this.horrorMovie=movieService.movieGenre(27);
  this.scienceMovie=movieService.movieGenre(878);
  this.tvMovie=movieService.movieGenre(10770);
  this.thrillerMovie=movieService.movieGenre(53);
  this.warMovie=movieService.movieGenre(10752);
  this.westMovie=movieService.movieGenre(37);*/
  }

  ngOnInit(): void {
  }

  reload(){
    window.location.reload();
  }

}
