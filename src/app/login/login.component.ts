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
   
    const loginParams = { name: this.loginForm.value.email, password: this.loginForm.value.password};
    console.log(loginParams);
    const user=this.userService.login(loginParams);

   
        
        if (user) {
          sessionStorage.setItem('user', JSON.stringify(user));
       sessionStorage.setItem('role', user.role);
       console.log(sessionStorage.getItem('user'))
        this.router.navigateByUrl('/home');
        Swal.fire('Connexion réussie', 'Vous êtes à présent connecté', 'success');
      
        }else Swal.fire('echec Connexion ', 'password ou password incorrect', 'error');
       
    
    
    
  }

  register(){
    this.router.navigateByUrl('/register');
  }

}
