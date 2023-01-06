import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PlaningService } from '../service/planing.service';
import { Disponibility } from '../type/types';

@Component({
  selector: 'app-disponibility',
  templateUrl: './disponibility.component.html',
  styleUrls: ['./disponibility.component.css']
})
export class DisponibilityComponent implements OnInit {

  dispoForm!:FormGroup;
  role=sessionStorage.getItem("role");
  userObject!:any;

  constructor(private planingService: PlaningService,private router: Router,private form: FormBuilder) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('user'))
    console.log(this.role)
   const  user=sessionStorage.getItem('user');
   if (user && (this.role==='teacher' || this.role==='manager') ) {
    this.userObject= JSON.parse(user)
   console.log(this.userObject);

   this.dispoForm = this.form.group({
    heureD : ['', [Validators.required,Validators.min(8),Validators.max(18),Validators.pattern(/\-?\d*\.?\d{1,2}/)]],
    heureF : ['', [Validators.required,Validators.min(8),Validators.max(18),Validators.pattern(/\-?\d*\.?\d{1,2}/)]],
    minuteD : ['', [Validators.required,Validators.min(0),Validators.max(59),Validators.pattern(/\-?\d*\.?\d{1,2}/)]],
    minuteF : ['', [Validators.required,Validators.min(0),Validators.max(59),Validators.pattern(/\-?\d*\.?\d{1,2}/)]],
    day : ['', [Validators.required]],
  })

   }else {this.router.navigate(['/']);
   Swal.fire('erreur', 'vous n\'avez pas les droits', 'error');
  }
  }

  onSubmit(){

console.log(this.dispoForm.valid);
console.log(this.dispoForm.value.heureD,this.dispoForm.value.heureF);


if (this.dispoForm.valid ) {

  const date=this.dispoForm.value.day;
  const dateNow=new Date().toJSON().slice(0,10);
  if (date>=dateNow) {
    if (Number(this.dispoForm.value.heureD)==Number(this.dispoForm.value.heureF) && Number(this.dispoForm.value.minuteD)<=Number(this.dispoForm.value.minuteF)) {
      this.addDispo();
      this.router.navigate(['/disponibility']);
      Swal.fire('ok  ', 'Enregistrement réussi', 'success');
   }else if(Number(this.dispoForm.value.heureD)<Number(this.dispoForm.value.heureF)){ 
     this.addDispo();
     this.router.navigate(['/disponibility']);
     Swal.fire('ok  ', 'Enregistrement réussi', 'success');
   }else Swal.fire('echec  ', 'Heure debut superieur à Heure de fin', 'error');

  }else{
    Swal.fire('echec  ', 'jour non correct', 'error');
  }
   

}else Swal.fire('echec  ', 'formulaire invalide', 'error');

  }

  addDispo(){


  const timeD=this.dispoForm.value.heureD+":"+this.dispoForm.value.minuteD+":00";
  const timeF=this.dispoForm.value.heureF+":"+this.dispoForm.value.minuteF+":00";
 const disponibility:Disponibility={
    dispoId:0,
    timeD:timeD,
    timeF:timeF,
    day:this.dispoForm.value.day,
    teacher:{
        teacherId:this.userObject.teacherId,
    }
}


const dispoD=this.planingService.addDisponibility(disponibility);
dispoD.subscribe(dispo=>{console.log(dispo)},err=>{
  console.log(err);Swal.fire('echec  ', 'erreur enregistrement Disponibilité', 'error');
})

    
  }
}
