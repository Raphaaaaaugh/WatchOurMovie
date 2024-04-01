import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  User } from '../type/types';
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
      firstName: this.registerForm.value.firstname,
      phone: this.registerForm.value.phone,
      name: this.registerForm.value.name,
      role: 'user'
    };
    console.log(userParams);
    const user=this.userService.register(userParams);

    
        
        if (user) {
          sessionStorage.setItem('user', JSON.stringify(user));
       sessionStorage.setItem('role', user.role);
       console.log(sessionStorage.getItem('user'))
        this.router.navigate(['/home']).then(()=>{
          window.location.reload();
        });
        Swal.fire('Enregistrement réussie', 'Vous êtes à présent enregistré', 'success');
      
        }else Swal.fire('echec Enregistrement ', 'veuillez verifier les champs renseignés', 'error');
       
     
    

 }
  
  
  
 
  

  
 able(role:string){
 
 }
  
}





