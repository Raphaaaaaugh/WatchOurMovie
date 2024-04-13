import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/service/movies.service';
import { Movie } from 'src/app/type/types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies!:Movie[];

  constructor(private movieServie: MoviesService,private router: Router) {
    const token =  sessionStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('/home');
      Swal.fire('echec Connexion ', 'veuillez vous connecter', 'error');
    }else{
    this.movies=this.movieServie.AllMovies();
   }
  }

  ngOnInit(): void {
  }

}
