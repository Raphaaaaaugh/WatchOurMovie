import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../service/movies.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Movie } from 'src/app/type/types';
@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  addForm!:FormGroup;
  disabStud!:boolean;
  disabTeach!:boolean;
  
  role=sessionStorage.getItem("role");
  
  
  
  constructor(private movieService: MoviesService,private router: Router,private form: FormBuilder) { 
   const token =  sessionStorage.getItem('token');
if (!token) {
  this.router.navigateByUrl('/home');
  Swal.fire('echec Connexion ', 'veuillez vous connecter', 'error');
}
  }
  
  ngOnInit(): void {
  
   
    this.addForm = this.form.group({
      title : ['', [Validators.required]],
      release_date : ['', [Validators.required]],
      original_title : ['', [Validators.required]],
      original_language : ['', [Validators.required,Validators.min(10),Validators.max(10)]],
      backdrop_path : ['', [Validators.required]],

    });
      
  
    }
    
  
  
  
  
  
  onSubmit(): void {
    console.log('submit');
     
      const movieParams:Movie = {
        title: this.addForm.value.title,
        backdrop_path: this.addForm.value.backdrop_path,
        original_language: this.addForm.value.original_language,
        original_title: this.addForm.value.original_title,
        release_date: this.addForm.value.release_date,
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
