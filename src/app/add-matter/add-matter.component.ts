import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PlaningService } from '../service/planing.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Matter } from '../type/types';

@Component({
  selector: 'app-add-matter',
  templateUrl: './add-matter.component.html',
  styleUrls: ['./add-matter.component.css']
})
export class AddMatterComponent implements OnInit {

    matterForm!:FormGroup;
    role=sessionStorage.getItem("role");
    userObject!:any;
  
    constructor(private planingService: PlaningService,private router: Router,private form: FormBuilder) { }
  
    ngOnInit(): void {
     // this.router.navigate([''])
      console.log(sessionStorage.getItem('user'))
      console.log(this.role)
     const  user=sessionStorage.getItem('user');
     if (user && (this.role==='teacher' || this.role==='manager') ) {
      this.userObject= JSON.parse(user)
     console.log(this.userObject);
  
     this.matterForm = this.form.group({
      name : ['', [Validators.required,Validators.min(8),Validators.max(18)]],
      coef : ['', [Validators.required,Validators.min(0),Validators.max(59)]],
    })
  
     }else {this.router.navigate(['/']);
     Swal.fire('erreur', 'vous n\'avez pas les droits', 'error');
    }
    }

    onSubmit(){
      if(this.matterForm.valid){


        const matter:Matter={
          matterId:0,
          name: this.matterForm.value.name,
          coef:this.matterForm.value.coef,
          teachers:[],
          speciality:[]
      }

      const dispoD=this.planingService.addMatter(matter);
  dispoD.subscribe(dispo=>{},err=>{
    console.log(err);Swal.fire('echec  ', 'erreur enregistrement Matter', 'error');
  })
  this.router.navigate(['/matter']);
      }else Swal.fire('echec  ', 'formulaire invalide', 'error');
    }

 

}
