import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Movie,User,Users,apiUrl,httpOptions } from 'src/app/type/types';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

 topRatedMovie: Array<Movie>=[];
  

  constructor(private httpClient: HttpClient) { 
  this.topRated()

  }
  

  public movieGenre(genre_id: number): Observable<number[]>
  {


   return  this.httpClient.get<any[]>(`${apiUrl}/movie_genre/${genre_id}`)


  }


  public seenMovie(ids:{user_id:number, film_id:number})
  {


     this.httpClient.post<any[]>(`${apiUrl}/add_seen_film/`,ids).subscribe(

    { 
     
     next: message => {
      Swal.fire('Enregistrement réussie', 'Le film a été ajouté à vos films vus', 'success');
      console.log(message)},
     error: (err:any) => {
      Swal.fire('Echec Enregistrement', 'Le film est déjà dans votre liste de films vus.', 'error');
      console.error('Quelque chose s\'est mal passé :', err)},
     complete: () => console.log('L\'histoire est terminée !')
    
  }
      
   );


  }


  public movieById(movie_id: number): Movie
  {


    let movie:Movie={
      title: '',
      release_date: '',
      original_title: '',
      original_language: '',
      backdrop_path: '',
      id: 0
    };

    this.httpClient.get<Movie>(`${apiUrl}/movie_id/${movie_id}`).subscribe(

     { 
      
      next: (movies: Movie) => {
 
        movie.title=movies.title
       
        movie.release_date=movies.release_date,
        movie.original_title=movies.original_title,
        movie.original_language=movies.original_language,
        movie.backdrop_path=movies.backdrop_path,
        movie.id = movies.id
        movie.adult=movies.adult,
        movie.homepage=movies.homepage,
        movie.popularity=movies.popularity,
        movie.revenue=movies.revenue,
        movie.runtime = movies.runtime

      },
      error: (err:any) => console.error('Quelque chose s\'est mal passé :', err),
      complete: () => console.log('L\'histoire est terminée !')
     
   }
       
    );

  return movie;


  }


  
     topRated(): Observable<Movie[]>
{
    
    return    this.httpClient.get<Movie[]>(`${apiUrl}/top_rated/`);
  }


  getMovieToSee(user: string): Observable<any>
  {
      
      return    this.httpClient.get<any>(`${apiUrl}/engine/${ user}`);
    }
  


  public AllMovies(): Movie[]
  {


    let movies:Movie[]=[]

    this.httpClient.get<Movie[]>(`${apiUrl}/movies/`).subscribe(

     { 
      
      next: (movie: Movie[]) => {
    
        movie.forEach((movie) => {
          movies.push(movie)
        })
       },
      error: (err:any) => console.error('Quelque chose s\'est mal passé :', err),
      complete: () => console.log('L\'histoire est terminée !')
     
   }
       
    );

  return movies;

  }


  public addMovie(movie: Movie): Movie
  {
  
  
  
    this.httpClient.post<Movie>(`${apiUrl}/add_film/`,movie).subscribe(
  
     { 
      
      next: (movies: Movie) => movie=movies,
      error: (err:any) => console.error('Quelque chose s\'est mal passé :', err),
      complete: () => console.log('L\'histoire est terminée !')
     
   }
       
    );
  
  return movie;
  
  
  }


}



