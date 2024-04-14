import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/app/service/movies.service';
import { Movie } from 'src/app/type/types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie!:Movie;
  id!: string | null;

  constructor(private movieServie: MoviesService,private route: ActivatedRoute,private router: Router) { 
    const token =  sessionStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('/home');
      Swal.fire('echec Connexion ', 'veuillez vous connecter', 'error');
    }else{
    this.id = this.route.snapshot.paramMap.get('movie_id');
    console.log(this.id)
   
    this.movie=this.movieServie.movieById(Number(this.id))
  }
}

  ngOnInit(): void {
  }

  seenMovie(id:number){
    const user=sessionStorage.getItem('user');
    const userObject=user ? JSON.parse(user) :""
    console.log(userObject)
    if (userObject)
        this.movieServie.seenMovie({film_id:id, user_id:userObject.id})
  }

}
