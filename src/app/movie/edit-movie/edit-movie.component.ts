import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../service/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Movie } from 'src/app/type/types';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  editForm!:FormGroup;
  disabStud!:boolean;
  disabTeach!:boolean;
  movie!:Movie;
  id!: string | null;
  
  role=sessionStorage.getItem("role");
  
  
  
  constructor(private movieService: MoviesService,private router: Router,private form: FormBuilder,private route: ActivatedRoute) { 
    const token =  sessionStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('/home');
      Swal.fire('echec Connexion ', 'veuillez vous connecter', 'error');
    }else{
      this.id = this.route.snapshot.paramMap.get('movie_id');
      console.log(this.id)
     
      this.movie=this.movieService.movieById(Number(this.id))
    }
   
  }
  
  ngOnInit(): void {
  
   
    this.editForm = this.form.group({
      title : ['', [Validators.required]],
      release_date : ['', [Validators.required]],
      original_title : ['', [Validators.required]],
      original_language : ['', [Validators.required,Validators.min(10),Validators.max(10)]],
      backdrop_path : ['', [Validators.required]],

    });
      
  this.editForm.setValue({
    title : this.movie.title,
    release_date : this.movie.release_date,
    original_title : this.movie.original_title,
    original_language : this.movie.original_language,
    backdrop_path : this.movie.backdrop_path,

  })

    
  
  }
    
  
  
  
  
  
  onSubmit(): void {
    console.log('submit');
     
      const movieParams:Movie = {
        title: this.editForm.value.title,
        backdrop_path: this.editForm.value.backdrop_path,
        original_language: this.editForm.value.original_language,
        original_title: this.editForm.value.original_title,
        release_date: this.editForm.value.release_date,
        id: 0
      };
      console.log(movieParams);
      const movie=this.movieService.addMovie(movieParams);
  
      
          
          if (movie) {


          this.router.navigateByUrl('/movie').then(()=>{
            
          });
          Swal.fire('Enregistrement réussie', 'Vous êtes à présent enregistré', 'success');
        
          }else Swal.fire('echec Enregistrement ', 'veuillez verifier les champs renseignés', 'error');
         
       
      
  
   }
    
    
    
}
