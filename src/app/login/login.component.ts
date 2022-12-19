import { Component, OnInit } from '@angular/core';
import { PlaningService } from '../service/planing.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginForm!:FormGroup;
  private username!: string;
  private password!: string;
  private roleUser!: string;


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

      user.subscribe((user: any) => {
       sessionStorage.setItem('user', JSON.stringify(user));
       console.log(sessionStorage.getItem('user'))
        this.router.navigate(['/home']);
        Swal.fire('Connexion réussie', 'Vous êtes à présent connecté', 'success');
      }, (err: any) => {
          console.error(err);
          this.router.navigate(['/login']);
        Swal.fire('echec Connexion ', 'password ou password incorrect', 'error');
      });
    
    
  }

  

}
