import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginForm!:FormGroup;



  constructor(private userService: AuthService,private router: Router,private form: FormBuilder,) { 
   
  }

  ngOnInit(): void {

    this.loginForm = this.form.group({
      email : ['', [Validators.required]],
      password : ['', [Validators.required]],
    }
      
    )
}

  onSubmit(): void {
    console.log('submit');
   
    const loginParams = { email: this.loginForm.value.email, password: this.loginForm.value.password};
    console.log(loginParams);
    this.userService.login(loginParams).subscribe(

      { 
       
       next: response => {
         
        sessionStorage.setItem('user', JSON.stringify(loginParams));
        const token =response.token
        if (token) 
          sessionStorage.setItem('token', token);
        
          Swal.fire('Connexion réussie', 'Vous êtes à présent connecté', 'success');
          this.router.navigateByUrl('/home');
       },
       error: err => {
        Swal.fire('echec Connexion ', 'password ou password incorrect', 'error');
        console.error('Quelque chose s\'est mal passé :', err)
      },
       complete: () => console.log('L\'histoire est terminée !')
      
    }
        
     );

   
   
    
    
  }

  register(){
    this.router.navigateByUrl('/register');
  }

}
