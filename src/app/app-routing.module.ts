import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
import { MoviesComponent } from './movie/movies/movies.component';
import { GenreMovieComponent } from './movie/genre-movie/genre-movie.component';
import { MovieComponent } from './movie/movie/movie.component';
import { TopRatedComponent } from './movie/top-rated/top-rated.component';
import { AddMovieComponent } from './movie/add-movie/add-movie.component';


const routes: Routes = [
 
  {
    path:'login', component :LoginComponent
  },
  {
    path:'register', component :RegisterComponent
  },
  {
    path:'home', component :HomeComponent
  },
  {
    path:'movie', component :MoviesComponent
  },
  {
    path:'movies/movie_genre/:genre_id', component :GenreMovieComponent
  },
  {
    path:'movie/:movie_id', component :MovieComponent
  },
  {
    path:'movies/topRated', component :TopRatedComponent
  },
  {
    path:'movies/add', component :AddMovieComponent
  },
  {
    path:'', component :HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
