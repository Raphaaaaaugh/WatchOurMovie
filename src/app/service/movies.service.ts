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

    let movies:Movie[]=[]

    this.httpClient.get<any[]>(`${apiUrl}/movie_genre/${genre_id}`).subscribe(

     { 
      
      next: movie => {
        console.log(movie)
        movie.forEach((movie) => {
          movies.push(this.movieById(movie))
        })
       },
      error: err => console.error('Quelque chose s\'est mal passé :', err),
      complete: () => console.log('L\'histoire est terminée !')
     
   }
       
    );

  return movies;



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
      
      next: movies => {
        console.log(movies);
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
      error: err => console.error('Quelque chose s\'est mal passé :', err),
      complete: () => console.log('L\'histoire est terminée !')
     
   }
       
    );

  return movie;


  }


  
  public topRated(): Movie[]
  {


    let movies:Movie[]=[]

    this.httpClient.get<Movie[]>(`${apiUrl}/top_rated/`).subscribe(

     { 
      
      next: movie => {
        console.log(movie)
        movie.forEach((movie) => {
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

    this.httpClient.get<Movie[]>(`${apiUrl}/movies/`).subscribe(

     { 
      
      next: movie => {
        console.log(movie)
        movie.forEach((movie) => {
          movies.push(movie)
        })
       },
      error: err => console.error('Quelque chose s\'est mal passé :', err),
      complete: () => console.log('L\'histoire est terminée !')
     
   }
       
    );

  return movies;

  }


  public addMovie(movie: Movie): Movie
  {
  
  
  
    this.httpClient.post<Movie>(`${apiUrl}/add_film/`,movie).subscribe(
  
     { 
      
      next: movies => movie=movies,
      error: err => console.error('Quelque chose s\'est mal passé :', err),
      complete: () => console.log('L\'histoire est terminée !')
     
   }
       
    );
  
  return movie;
  
  
  }


}



