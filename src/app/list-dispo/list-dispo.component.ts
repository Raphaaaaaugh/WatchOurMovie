import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PlaningService } from '../service/planing.service';
import { Disponibility, Matter, Room, Teacher,Event, Speciality } from '../type/types';

@Component({
  selector: 'app-list-dispo',
  templateUrl: './list-dispo.component.html',
  styleUrls: ['./list-dispo.component.css']
})
export class ListDispoComponent implements OnInit {


dispoForm!:FormGroup;
teachers!:Teacher[];
dispo!:Disponibility[];
matters:Matter[]=[];
rooms:Room[]=[];
teacherId!:number;
matterName!:string;
role=sessionStorage.getItem("role");
specialities:Speciality[]=[];
event!:Event[];

  constructor(private planingService: PlaningService,private router: Router,private form: FormBuilder) { }

  ngOnInit(): void {
  //  if ( this.role==='manager')  {
   this.dispoForm = this.form.group({
    heureD : ['', [Validators.required,Validators.min(0),Validators.max(18),Validators.pattern(/\-?\d*\.?\d{1,2}/)]],
    heureF : ['', [Validators.required,Validators.min(0),Validators.max(18),Validators.pattern(/\-?\d*\.?\d{1,2}/)]],
    minuteD : ['', [Validators.required,Validators.min(0),Validators.max(59),Validators.pattern(/\-?\d*\.?\d{1,2}/)]],
    minuteF : ['', [Validators.required,Validators.min(0),Validators.max(59),Validators.pattern(/\-?\d*\.?\d{1,2}/)]],
    day : ['', [Validators.required]],
    teacher : ['', [Validators.required]],
    matter : ['', [Validators.required]],
    room : ['', [Validators.required]],
    capacity : ['', [Validators.pattern(/\-?\d*\.?\d{1,2}/)]],
    speciality : ['',[Validators.required]],
  })

this.planingService.getMatters().subscribe(matter=>{
  this.matters=matter
},err=>console.log(err))

this.planingService.getRooms().subscribe(room=>{
  this.rooms=room
},err=>console.log(err))

this.planingService.getSpecialities().subscribe(speciality=> {
  this.specialities=speciality},err=>console.log(err))


//  }else {this.router.navigate(['/']);
 // Swal.fire('erreur', 'vous n\'avez pas les droits', 'error');
// }






this.planingService.getEventsByDay(new Date().toJSON().slice(0,10)).subscribe(event=>{
  
  event.forEach(e=>{
    if (e.timeF<new Date().toJSON().slice(12,16)) {
this.planingService.getRoomsByName(e.title.split('.')[1]).subscribe(room=>{
room.state=false;
  this.planingService.updateRoom(room).subscribe(r=>{},err=>console.log(err))
},err=>{
  console.log(err);
  Swal.fire('echec  ', 'erreur lors liberation salle', 'error');
})
      
      
    }
  })



})




}

onSubmit(){

  console.log("Submit Event")

if (this.dispoForm.valid ) {

  const date=this.dispoForm.value.day;
  const dateNow=new Date().toJSON().slice(0,10);
  if (date>=dateNow) {
    if (Number(this.dispoForm.value.heureD)===Number(this.dispoForm.value.heureF) && Number(this.dispoForm.value.minuteD)<=Number(this.dispoForm.value.minuteF)) {
      this.addEvent();
      this.router.navigate(['/listDisponibility']);
      Swal.fire('ok  ', 'Enregistrement réussi', 'success');
   }else if(Number(this.dispoForm.value.heureD)<Number(this.dispoForm.value.heureF)){ 
     this.addEvent();
     this.router.navigate(['/listDisponibility']);
     Swal.fire('ok  ', 'Enregistrement réussi', 'success');
   }else Swal.fire('echec  ', 'Heure debut superieur à Heure de fin', 'error');

  }else{
    Swal.fire('echec  ', 'jour non correct', 'error');
  }
   

}else Swal.fire('echec  ', 'formulaire invalide', 'error');

}

teach(id:number){
  this.teacherId=id;
  this.planingService.getDisponibility(this.teacherId).subscribe(dispo=>{
    this.dispo=dispo;
  })
}

matter(id:number,matterName:string){
  this.planingService.getMatter(id).subscribe(matter=>{
    console.log(matter)
    this.teachers=matter.teachers
  },err=>{
    console.log(err)
  })

  this.matterName=matterName+" salle .";
}


getCapacity(target:any){

const capacity=target.value;

console.log(capacity);

if (capacity) {
  this.planingService.getRoomsByCapacity(Number(capacity)).subscribe(rooms=>{
    this.rooms=rooms
  },err=>{console.log(err)})
}else{
  this.planingService.getRooms().subscribe(room=>{
    this.rooms=room
  },err=>console.log(err))
  
}

}
  

addEvent(){


  this.planingService.getRoomsByName(this.dispoForm.value.room).subscribe(room=>{

    if (!room.state) {

      const timeD=this.dispoForm.value.heureD+":"+this.dispoForm.value.minuteD+":00";
  const timeF=this.dispoForm.value.heureF+":"+this.dispoForm.value.minuteF+":00";
  const specialityId:any[]=this.dispoForm.value.speciality;
this.matterName=this.matterName+""+this.dispoForm.value.room;

console.log(specialityId)

  specialityId.forEach(specialityId=>{

 const event:Event={
  eventId:0,
  timeD:timeD,
  timeF:timeF,
  day:this.dispoForm.value.day,
  title:this.matterName,
  speciality:{
    specialityId:Number(specialityId)
  },
  teacher:{
    teacherId:this.teacherId
  }
}

this.planingService.addEvent(event).subscribe(event=>{
console.log(event)
},err=>console.log(err))
  })

  room.state=true;
  this.planingService.updateRoom(room).subscribe(room=>{},err=>console.log(err))



    }else{
      Swal.fire('echec  ', 'salle déjà occupé', 'error');

    }

 

  
 
},err=>{console.log(err);Swal.fire('echec  ', 'salle n\'existe pas', 'error');})

}


}
