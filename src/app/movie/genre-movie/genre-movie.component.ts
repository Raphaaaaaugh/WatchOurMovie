import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MoviesService } from 'src/app/service/movies.service';
import { Movie } from 'src/app/type/types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genre-movie',
  templateUrl: './genre-movie.component.html',
  styleUrls: ['./genre-movie.component.css']
})
export class GenreMovieComponent implements OnInit {

  movieGenre:Movie[]=[];
  id!: string | null;
  moviePage:Array<Movie>=[];
  pageSize:number=0;
  page:number=1;


  constructor(private movieServie: MoviesService,private route: ActivatedRoute,private router: Router) { 
    const token =  sessionStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('/home');
      Swal.fire('echec Connexion ', 'veuillez vous connecter', 'error');
    }
}



  ngOnInit(): void {

         
    this.id = this.route.snapshot.paramMap.get('genre_id');
    console.log(this.id)
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.location.reload();
      }
    });
    
    this.movieServie.movieGenre(Number(this.id)).subscribe(movie => {
      movie.forEach(mov=>{
        this.movieGenre.push(this.movieServie.movieById(mov));
      })
     
      this.pageSize= this.movieGenre.length/20
    this.page=1;
    this.loadItems()
    }) 
  }


 

  async loadItems() {
   
   
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;


    for (let index = startIndex; index < endIndex-1; index++) {
      this.moviePage.push(this.movieGenre[index]);
      
    }


  }
  onPageChange(page: number) {
    this.page = page;
    this.loadItems();
  }


  seenMovie(id:number){
    const user=sessionStorage.getItem('user');
    const userObject=user ? JSON.parse(user) :""
    console.log(userObject)
    if (userObject)
        this.movieServie.seenMovie({film_id:id, user_id:userObject.id})
  }

}
