import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  User, Users } from '../type/types';
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



constructor(private userService: AuthService,private router: Router,private form: FormBuilder,) { 
 
}

ngOnInit(): void {

 
  this.registerForm = this.form.group({
    email : ['', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password : ['', [Validators.required]],
    role : ['', [Validators.required]],
    phone : ['', [Validators.required,Validators.min(10),Validators.max(10)]],
    firstname : ['', [Validators.required]],
    name : ['', [Validators.required]],
  });
    


  }
  





onSubmit(): void {
  console.log('submit');
   
    const userParams:User = {
      email: this.registerForm.value.email, 
      password: this.registerForm.value.password,
      userId: 0,
      firstname: this.registerForm.value.firstname,
      phone: this.registerForm.value.phone,
      name: this.registerForm.value.name,
      role: 'user'
    };

    const userParam:Users = {
      id:0,
      password: this.registerForm.value.password,
      firstname: this.registerForm.value.firstname,
      name: this.registerForm.value.name,
      email: this.registerForm.value.email

    };
    console.log(userParam);
    this.userService.register(userParam).subscribe(

      { 
       
       next: response => {
         
        sessionStorage.setItem('user', JSON.stringify(userParam));
        const token =response.token;
        if (token) 
          sessionStorage.setItem('token', token);
        
        const user=sessionStorage.getItem('user');
        console.log(user)
        Swal.fire('Enregistrement réussie', 'Vous êtes à présent connecté', 'success');
        this.router.navigateByUrl('/home');
       },
       error: err => {
        Swal.fire('echec Enregistrement ', 'Veuillez remplir tous les champs', 'error');
        console.error('Quelque chose s\'est mal passé :', err)
      },
       complete: () => console.log('L\'histoire est terminée !')
      
    }
        
     );
    

 }
  
  
  
 
  

  
 able(role:string){
 
 }
  
}





