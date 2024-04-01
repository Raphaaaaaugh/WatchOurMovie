import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Movie,apiUrl,httpOptions } from 'src/app/type/types';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

 
  

  constructor(private httpClient: HttpClient) { }
  

  public movieGenre(genre_id: number): any[]
  {

    let movieTitle:any[]=[]

    this.httpClient.get<any[]>(`${apiUrl}/movie_genre/${genre_id}`,httpOptions).subscribe(

     { 
      
      next: movies => {
        movies.forEach((title) => {
          movieTitle.push(title)
        })
       },
      error: err => console.error('Quelque chose s\'est mal passé :', err),
      complete: () => console.log('L\'histoire est terminée !')
     
   }
       
    );

  return movieTitle;



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

    this.httpClient.get<Movie>(`${apiUrl}/movie_id/${movie_id}`,httpOptions).subscribe(

     { 
      
      next: movies => movie=movies,
      error: err => console.error('Quelque chose s\'est mal passé :', err),
      complete: () => console.log('L\'histoire est terminée !')
     
   }
       
    );

  return movie;


  }


  
  public topRated(): Movie[]
  {


    let movies:Movie[]=[]

    this.httpClient.get<Movie[]>(`${apiUrl}/top_rated/`,httpOptions).subscribe(

     { 
      
      next: movies => {
        movies.forEach((movie) => {
          movies.push(movie)
        })
       },
      error: err => console.error('Quelque chose s\'est mal passé :', err),
      complete: () => console.log('L\'histoire est terminée !')
     
   }
       
    );

  return movies;

  }



  public AllMovies(): Movie[]
  {


    let movies:Movie[]=[]

    this.httpClient.get<Movie[]>(`${apiUrl}/movies/`,httpOptions).subscribe(

     { 
      
      next: movies => {
        movies.forEach((movie) => {
          movies.push(movie)
        })
       },
      error: err => console.error('Quelque chose s\'est mal passé :', err),
      complete: () => console.log('L\'histoire est terminée !')
     
   }
       
    );

  return movies;

  }
}
