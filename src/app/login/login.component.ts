import { Component, Input, OnInit } from '@angular/core';
import { PlaningService } from '../service/planing.service';
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



  constructor(private planingService: PlaningService,private router: Router,private form: FormBuilder,) { 
   
  }

  ngOnInit(): void {

    this.loginForm = this.form.group({
      email : ['', [Validators.required]],
      password : ['', [Validators.required]],
      roleUser : ['', [Validators.required]],
    }
      
    )
}

  onSubmit(): void {
    console.log('submit');
   
    const loginParams = { email: this.loginForm.value.email, password: this.loginForm.value.password,roleUser: this.loginForm.value.roleUser };
    console.log(loginParams);
    const user=this.planingService.login(loginParams);

      user.subscribe(user => {
        
        if (user) {
          sessionStorage.setItem('user', JSON.stringify(user));
       sessionStorage.setItem('role', user.role);
       console.log(sessionStorage.getItem('user'))
        this.router.navigate(['/home']).then(()=>{
          window.location.reload();
        });
        Swal.fire('Connexion réussie', 'Vous êtes à présent connecté', 'success');
      
        }else Swal.fire('echec Connexion ', 'password ou password incorrect', 'error');
       
      }, (err: any) => {
          console.error(err);
          this.router.navigate(['/login']);
        Swal.fire('echec Connexion ', 'erreur lors de l\' execution de la requete', 'error');
      });
    
    
  }

  register(){
    this.router.navigate(['/register']);
  }

}
