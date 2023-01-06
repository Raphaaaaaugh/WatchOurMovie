import { Component, OnInit } from '@angular/core';
import { PlaningService } from '../service/planing.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Manager, Matter, Speciality, Student, Teacher } from '../type/types';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 
registerForm!:FormGroup;
disabStud!:boolean;
disabTeach!:boolean;
specialities:Speciality[]=[];
matters:Matter[]=[];
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
    matterId : ['', [Validators.required]],
    speciality : [''],
  });
    
  this.planingService.getSpecialities().subscribe(speciality=> {
    this.specialities=speciality},err=>console.log(err))
    
    this.planingService.getMatters().subscribe(matter=>{
      this.matters=matter
    },err=>console.log(err))

  }else{
    this.router.navigate(['/login']);
      Swal.fire('enregistrement pas possible', 'Veuillez contactez le responsable', 'error');
  }

  
}




onSubmit(): void {
  console.log('submit');

 if (this.registerForm.value.role==='student') {

  const student:Student = { email: this.registerForm.value.email, 
    password: this.registerForm.value.password,
    role: this.registerForm.value.role,
    phone: Number(this.registerForm.value.phone),
    lastName:this.registerForm.value.lastname,
    firstName:this.registerForm.value.firstname,
   speciality:{ specialityId:Number(this.registerForm.value.speciality)},
   schoolYear:new Date().getFullYear(),
   studentId:0
   };

   console.log(student);
   if (this.registerForm.valid) {
    console.log(this.registerForm.valid)
    const user=this.planingService.addStudent(student);
    user.subscribe(user=>{console.log(user)},err=>{console.log(err)})
    this.router.navigate(['/login']);
      Swal.fire('enregistrement reussi', 'Vous êtes à présent enregistré', 'success');

  } else Swal.fire('echec enregistrement ', 'remplir tous les champs incorrect', 'error');
   
 }else if(this.registerForm.value.role==='teacher'){
  const teacher:Teacher = { email: this.registerForm.value.email, 
    password: this.registerForm.value.password,
    role: this.registerForm.value.role,
    phone: Number(this.registerForm.value.phone),
    lastName:this.registerForm.value.lastname,
    firstName:this.registerForm.value.firstname,
   teacherId:0
   };

   console.log(teacher);
   if (this.registerForm.valid) {
    console.log(this.registerForm.valid)
    const user=this.planingService.addTeacher(teacher,Number(this.registerForm.value.matterId));
   
    user.subscribe(user=>{console.log(user)},err=>{console.log(err)})
    this.router.navigate(['/login']);
      Swal.fire('enregistrement reussi', 'Vous êtes à présent enregistré', 'success');

  } else Swal.fire('echec enregistrement ', 'remplir tous les champs incorrect', 'error');
 }else if(this.registerForm.value.role==='manager'){
  const manager:Manager = { email: this.registerForm.value.email, 
    password: this.registerForm.value.password,
    role: this.registerForm.value.role,
    phone: Number(this.registerForm.value.phone),
    lastName:this.registerForm.value.lastname,
    firstName:this.registerForm.value.firstname,
   managerId:0
   };

   console.log(manager);
   if (this.registerForm.valid) {
    console.log(this.registerForm.valid)
    const user=this.planingService.addManager(manager);
    console.log(user);
    user.subscribe(user=>{},err=>{console.log(err)})
    this.router.navigate(['/login']);
      Swal.fire('enregistrement reussi', 'Vous êtes à présent enregistré', 'success');

  } else Swal.fire('echec enregistrement ', 'remplir tous les champs incorrect', 'error');
 }
  
  
  
 
  

  
  
  
}


able(role:string){
  if (role==="student") {
    this.disabStud=true;
  }else if(role==="teacher"){
    this.disabTeach=true;
  }else{
    this.disabStud=false;
    this.disabTeach=false;
  }
  
  console.log("able")
}

}
