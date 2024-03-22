import { Component, OnInit } from '@angular/core';
import { PlaningService } from '../service/planing.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Manager, User } from '../type/types';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 
registerForm!:FormGroup;
disabStud!:boolean;
disabTeach!:boolean;

role=sessionStorage.getItem("role");



constructor(private planingService: PlaningService,private router: Router,private form: FormBuilder,) { 
 
}

ngOnInit(): void {

  if(this.role==='manager'){

  this.registerForm = this.form.group({
    email : ['', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password : ['', [Validators.required]],
    role : ['', [Validators.required]],
    phone : ['', [Validators.required,Validators.min(10),Validators.max(10)]],
    firstname : ['', [Validators.required]],
    lastname : ['', [Validators.required]],
  });
    


  }else{
    this.router.navigate(['/login']);
      Swal.fire('enregistrement pas possible', 'Veuillez contactez le responsable', 'error');
  }

  
}




onSubmit(): void {
  console.log('submit');

 }
  
  
  
 
  

  
 able(role:string){
 
 }
  
}





