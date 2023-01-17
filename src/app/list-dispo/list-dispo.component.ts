import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isThisSecond } from 'date-fns';
import Swal from 'sweetalert2';
import { DisponibilityComponent } from '../disponibility/disponibility.component';
import { PlaningService } from '../service/planing.service';
import { Disponibility, Matter, Room, Teacher,Event, Speciality, Exam, TimeslotToList } from '../type/types';

@Component({
  selector: 'app-list-dispo',
  templateUrl: './list-dispo.component.html',
  styleUrls: ['./list-dispo.component.css']
})
export class ListDispoComponent implements OnInit {

periodeD!:any;
periodeF!:any;
roomExclus!:any[];
matterExclus!:any[];
mattersToSend!:Map<number,Matter>;
dispoForm!:FormGroup;
teachers!:Teacher[];
dispo!:Disponibility[];
matters:Matter[]=[];
rooms:Room[]=[];
roomsToSend!:Map<number,Room>;
teacherId!:number;
matterMap!:Map<number,Matter>;
specMap!:Map<number,Matter>
map!:Map<number,string>
mapDispo!:Map<number,boolean>
mapDispoD!:Map<string,boolean>
mapDispoF!:Map<string,boolean>
matterName!:string;
nameRoom!:string;
role=sessionStorage.getItem("role");
specialities:Speciality[]=[];
nbrPlace:number=0;
event:Event[]=[];
disponibilities!:Disponibility[];
teachersList!:Teacher[];
matterss!:Matter[];
exam:Exam[]=[];
day!:string


  constructor(private planingService: PlaningService,private router: Router,private form: FormBuilder) { 
    this.matterMap = new Map<number,Matter>();
    this.specMap = new Map<number,Matter>();
    this.map = new Map<number,string>();
    this.mapDispo = new Map<number,boolean>();
    this.mapDispoD = new Map<string,boolean>();
    this.mapDispoF = new Map<string,boolean>();
    this.roomsToSend = new Map<number,Room>();
    this.mattersToSend = new Map<number,Matter>();
  }

  ngOnInit(): void {
    if ( this.role==='manager')  {
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




this.planingService.getRooms().subscribe(room=>{
  this.rooms=room
},err=>console.log(err))

this.planingService.getSpecialities().subscribe(speciality=> {
  this.specialities=speciality
},err=>console.log(err))

this.planingService.getMatters().subscribe(matter => {
  this.matters = matter
}, err=>console.log(err))


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




  }else {this.router.navigate(['/']);
  Swal.fire('erreur', 'vous n\'avez pas les droits', 'error');
 }


 this.planingService.getTeacher().subscribe(teacher=>{
  this.teachersList=teacher;
    })


    this.planingService.getDisponibilities().subscribe(dispo=>{
      dispo.forEach(d=>{

        if (new Date().toJSON().slice(0,10)<=d.day) {
          this.disponibilities.push(d);
        }
      })

      
      
        })



}


exclusRoom(){
console.log(this.rooms,"les rooms")


}



public updateDispo(id:number,timeD:string,timeF:string,day:string) {
this.day=day;
  if (this.mapDispo.has(id)) {
    this.mapDispo.set(id,true)
    this.mapDispoD.set(timeD,true)
    this.mapDispoF.set(timeF,true)
  }else{
    this.mapDispo.set(id,false)
    this.mapDispoD.set(timeD,false)
    this.mapDispoF.set(timeF,false)
  }


}


getDisponibility(target:any){

  const day=target.value;


  if (day) {
    this.planingService.getDisponibilityByDay(day).subscribe(dispo=>{
      this.disponibilities=dispo
    },err=>{console.log(err)})
  }else{
    this.planingService.getDisponibilities().subscribe(dispo=>{
      this.disponibilities=dispo
    },err=>console.log(err))
    
  }

}


getCapacity(target:any){

let capacity;

if (Number(target)) {
 let i=0;
  this.rooms.forEach(r=>{
    if (r.capacity<target) {
      delete this.rooms[i];
      
    }
    i++;
  })
}else {


  capacity=target.value;


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

//console.log(capacity);



}
  


addEvent(){

  console.log("add event");

  let event:Event[]=[];
  let sortDispo: string[]=[];
  let sortDispoF: any[]=[];
  let time: any[]=[];
  const specialityId:any[]=this.dispoForm.value.speciality;
  


  
  for (let id of this.mapDispoD.keys()) {

    const stat=this.mapDispoD.get(id);

    if(!stat){
      sortDispo.push(id);
    }
  }

  for (let id of this.mapDispoF.keys()) {

    const stat=this.mapDispoF.get(id);

    if(!stat){
      sortDispoF.push(id);
    }
  }
  sortDispo.sort();
  sortDispoF.sort();
  let timeD=sortDispo[0];
  let timeF="";
  let cre=false;


  
  if (this.nameRoom) {

    this.matterName=this.matterName+""+this.nameRoom+".     ";


  for (let id of this.mapDispo.keys()) {

    const state=this.mapDispo.get(id);

    if (!state) {


      this.planingService.getOneDisponibility(id).subscribe(d=>{


        
  
          console.log(this.nameRoom);
        
        
          this.planingService.getRoomsByName(this.nameRoom).subscribe(room=>{


        d.state=false;
       this.planingService.updateDisponibility(d).subscribe(dispo=>{},err=>{
        console.log(err);
        this.router.navigate(['/listDisponibility']);
        Swal.fire('echec  ', 'erreur lors de l\'affectation de la disponibilité', 'error');
      })
           
        room.state=true;
       this.planingService.updateRoom(room).subscribe(room=>{},err=>{
        console.log(err);
        this.router.navigate(['/listDisponibility']);
          Swal.fire('echec  ', 'erreur lors de l\'occupation de la salle', 'error');
      })

        },err=>{
          console.log(err);
          this.router.navigate(['/listDisponibility']);
          Swal.fire('echec  ', 'salle n\'existe pas', 'error');
        })
        
        

      })
    

    }
 
  }



  for (let index = 0; index < sortDispo.length-1; index++) {
            
    if (sortDispo[index+1]===sortDispoF[index]) {
      timeF=sortDispoF[index+1];
      cre=false;
    }else{

      time.push({
        timeD,
        timeF
      })
      cre= true;
      timeD=sortDispo[index+1]
    }

  }

  if (!cre) {
    time.push({
      timeD,
      timeF
    })
  }

  console.log(time); 

  specialityId.forEach(specialityId=>{

  
         time.forEach(t=>{

          this.planingService.getEventsByDay(this.day).subscribe(event=>{
            event.forEach(e=>{
              if (t.timeD===e.timeD && e.speciality.specialityId===Number(specialityId)) {
                
          this.router.navigate(['/listDisponibility']);
      
          Swal.fire('echec  ', 'event déjà occupé', 'error');
         
        }
            })
          })


          this.event.push({
            eventId:0,
            timeD:t.timeD,
            timeF:t.timeF,
            day:this.day,
            title:this.matterName,
            speciality:{
              specialityId:Number(specialityId)
            },
            teacher:{
              teacherId:this.teacherId
            },
            nameRoom:this.nameRoom
          })
         })

  

  })

console.log(event);
  event.forEach(e=>{
    this.planingService.addEvent(e).subscribe(event=>{
      console.log(event);
      Swal.fire('ok  ', 'Enregistrement réussi', 'success');

      },err=>console.log(err))
  })


}else{
  Swal.fire('echec  ', 'selectionné la salle', 'error');
}
 


}



generate(){


  console.log(this.rooms,this.roomExclus,"les rooms")
  let i=0;


  if (this.roomExclus) {
    
    this.roomExclus.forEach((id)=>{
      i=0;
      this.rooms.forEach((r)=>{
        if (r.roomId===Number(id)) { 
          this.roomsToSend.set(i,r)      
        }
        i++;
      })
    })

    for (let index of this.roomsToSend.keys()) {
      delete this.rooms[index]
    }
}

if (this.matterExclus) {
    
  this.matterExclus.forEach((id)=>{
    i=0;
    this.matters.forEach((r)=>{
      if (r.matterId===Number(id)) { 
        this.mattersToSend.set(i,r)      
      }
      i++;
    })
  })

  for (let index of this.mattersToSend.keys()) {
    delete this.matters[index]
  }

}

  
  console.log(this.matters, " matter to send");

  console.log(this.rooms,"les rooms to send")


  let time : TimeslotToList[]=[];

if (this.periodeD && this.periodeF && this.periodeD<=this.periodeF) {

            time=this.createSchedule(this.periodeD,this.periodeF)
}

let id=0;
this.planingService.getMatters().subscribe(room=>{
  this.matters=room

              this.matters.forEach(matter=>{
                id++;
                      matter.speciality.forEach(spe=>{
                        id++;
                        this.exam.push({
                          id,
                          matter,
                          speciality:spe,
                          room:this.rooms[0],
                          timeslot:time[0],
                          teacher:this.teachersList[0]
                        })
                      })
                   
              })

              console.log(time,
                this.teachersList,
                this.rooms,
                this.exam);

             this.planingService.getTimeTable(
                {
                  disponibilities:time,
                  teachersList:this.teachersList,
                  roomList:this.rooms,
                  exam:this.exam
                }
              ).subscribe(timeTable=>{
                console.log(timeTable,"bien ca passe ")
                const event:Event[]=[];
                timeTable.exam.forEach(ex=>{


                  this.event.push({
                    eventId:0,
                    timeD:ex.timeslot.startTime,
                    timeF:ex.timeslot.endTime,
                    day:ex.timeslot.dayOfWeek,
                    title:"la salle est ."+ex.room.name,
                    speciality:{
                      specialityId:ex.speciality.specialityId,
                  },
                  teacher:{
                      teacherId:ex.teacher.teacherId
                  },
                  nameRoom:ex.room.name
                  })

                                 

                })
                this.addEventAuto(this.event)   
              },err=>console.log(err))

              console.log("generate");

            },err=>console.log(err))
            
}


getNameRoom(nameRoom:string){
  console.log(nameRoom);
this.nameRoom=nameRoom;
}

getRooms(capacity:number){
  this.getCapacity(capacity);
  }


addToEvent(dispo:Disponibility){
this.dispo=[dispo];
}




getMatters(capacity:number,specialityId:number){

  let verif=false;
  this.matters=[];
  this.nbrPlace=0;
  
  
  console.log(this.dispoForm.value.speciality)
  const specialityIds:any[]=this.dispoForm.value.speciality;

  if (specialityIds.length===1) {

    this.map.clear();
    this.matterMap.clear();
    
    this.planingService.getMatterSpecialities(specialityId).subscribe(matter=>{

      matter.forEach(m=>{
       
        this.matterMap.set(m.matterId,m);
        this.matters.push(m)
      
      })
 
     },err=>console.log(err))

  }else {

    specialityIds.forEach(specialityId=>{

    
      if (!this.map.has(Number(specialityId))) {

        this.planingService.getMatterSpecialities(Number(specialityId)).subscribe(matter=>{
  
          console.log("length m",matter.length)
          matter.forEach(m=>{


            if (this.matterMap.has(m.matterId)) {
              this.matters.push(m);
              verif=true;
            }
            
          
          })

         },err=>console.log(err))
      }
   
      this.nbrPlace+=capacity;
    })

  }
  
console.log(specialityIds.length,specialityIds.length===1)

  if (specialityIds.length===1) {
    verif=true;
  }



  
  
  this.getCapacity(this.nbrPlace)



this.map.set(specialityId,"");
 
}


teach(id:number){
  this.teacherId=id;
  this.planingService.getDisponibility(this.teacherId,true).subscribe(dispo=>{
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





 createSchedule(dateStart: string, dateEnd: string): TimeslotToList[] {
  let schedule = [];
  let start = new Date(dateStart.split('/').reverse().join('-'));
  let end = new Date(dateEnd.split('/').reverse().join('-'));
  while (start <= end) {
    let currentDate = start.toISOString().substring(0,10); // get the current date as string yyyy-mm-dd
    let timeSlots = [
      {start: "08:30", end: "10:00"},
      {start: "10:30", end: "12:00"},
      {start: "13:30", end: "15:00"},
      {start: "15:30", end: "17:00"}
    ];
    for(let i=0; i<timeSlots.length; i++){
        let startTime = `${timeSlots[i].start}:00`;
        let endTime = `${timeSlots[i].end}:00`;
        schedule.push({ dayOfWeek: start.toJSON().slice(0,10), startTime: startTime, endTime: endTime });
    }
    start.setDate(start.getDate() + 1);
  }
  return schedule;
}







/*
onSubmit(){

  console.log("Submit Event")

if (this.dispoForm.valid ) {

  const date=this.dispoForm.value.day;
  const dateNow=new Date().toJSON().slice(0,10);
  const hour=new Date().toJSON().slice(12,16);
  const timeD=this.dispoForm.value.heureD+":"+this.dispoForm.value.minuteD+":00";
  if (date>dateNow || (date===dateNow && hour<=timeD)) {
    if (Number(this.dispoForm.value.heureD)===Number(this.dispoForm.value.heureF) && Number(this.dispoForm.value.minuteD)<=Number(this.dispoForm.value.minuteF)) {
      this.addEvent();
      this.router.navigate(['/listDisponibility']);
   }else if(Number(this.dispoForm.value.heureD)<Number(this.dispoForm.value.heureF)){ 
     this.addEvent();
     this.router.navigate(['/listDisponibility']);
   }else Swal.fire('echec  ', 'Heure debut superieur à Heure de fin', 'error');

  }else{
    Swal.fire('echec  ', 'jour non correct', 'error');
  }
   

}else Swal.fire('echec  ', 'formulaire invalide', 'error');

}


*/







/*

addEvent(){

  console.log("add event");
  
    this.planingService.getRoomsByName(this.dispoForm.value.room).subscribe(room=>{
      
      if (!room.state && this.nameRoom) {
  
        const timeD=this.dispoForm.value.heureD+":"+this.dispoForm.value.minuteD+":00";
    const timeF=this.dispoForm.value.heureF+":"+this.dispoForm.value.minuteF+":00";
    const specialityId:any[]=this.dispoForm.value.speciality;
    this.matterName=this.matterName+""+this.nameRoom+".     ";
  
    if (this.dispo) {
      let add=false;
      this.dispo.forEach(d=>{
        
        if(d.day===this.dispoForm.value.day && d.timeD <= timeD && d.timeF >= timeF){
          add=true;
          console.log(add);
          this.planingService.getEventsByDay(this.dispoForm.value.day).subscribe(event=>{
            event.forEach(e=>{
  
           
            
            console.log(specialityId)
            
              specialityId.forEach(specialityId=>{
                
                if (timeD===e.timeD && e.speciality.specialityId===Number(specialityId)) {
                        add=false;
                  this.router.navigate(['/listDisponibility']);
        
                  Swal.fire('echec  ', 'event déjà occupé', 'error');
                 
                }
                 
             
              })
            
        })
  
  console.log(add);
  
    if (add) {
      d.state=false;
   // this.planingService.updateDisponibility(d).subscribe(dispo=>{},err=>console.log(err))
  
  specialityId.forEach(specialityId=>{
  
    this.specialities.forEach(spe=>{
      if (spe.specialityId===specialityId) {
        this.nbrPlace+=spe.groupSize;
      }
    })
  this.getCapacity(this.nbrPlace);
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
  
  Swal.fire('ok  ', 'Enregistrement réussi', 'success');
  
  
    }else{
      Swal.fire('echec  ', 'pas de disponibilité à cette date', 'error');
    }
  
  },err=>console.log(err))
  
  
        }
  
  
      })
      
      if (!add) {Swal.fire('echec  ', 'pas de disponibilité à cette date', 'error');}
  
    }else{
      Swal.fire('echec  ', 'pas de disponibilité', 'error');
  
    }
    
  
  
      }else{
        Swal.fire('echec  ', 'salle déjà occupé', 'error');
  
      }
  
   
  
    
   
  },err=>{console.log(err);Swal.fire('echec  ', 'salle n\'existe pas', 'error');})
  
  }
*/  



addEventAuto(event:Event[]){

  console.log("add event");


/*
       this.planingService.updateDisponibility(d).subscribe(dispo=>{},err=>{
        console.log(err);
        this.router.navigate(['/listDisponibility']);
        Swal.fire('echec  ', 'erreur lors de l\'affectation de la disponibilité', 'error');
      })*/
  
  
event.forEach(e=>{


  this.planingService.getRoomsByName(e.nameRoom).subscribe(room=>{

    this.planingService.updateRoom(room).subscribe(room=>{},err=>{
      console.log(err);
      this.router.navigate(['/listDisponibility']);
        Swal.fire('echec  ', 'erreur lors de l\'occupation de la salle', 'error');
    })
  })
  let min=Number(e.timeD.split(":")[1]);
  let hD=Number(e.timeD.split(":")[0]);
  let timeF="";
  let timeD=e.timeD;

  for (let index = 1; index <= 3; index++) {
    min=min+30;
    if(min%60==0){
      hD++;
      timeF=hD+":00:00";
    }else{
      if (Math.trunc(min/60)>0 && Math.trunc(min/60)%2!==0 && timeD.split(":")[1]==="30") {
        hD++;
      }
      timeF=hD+":"+(min/60 - Math.trunc(min/60))*60+":00";
    }
console.log(timeD,index,"les times")
/*
    this.planingService.getDisponibilityByDayTimeD(e.teacher.teacherId,e.day,timeD).subscribe(dispo=>{

      this.planingService.updateDisponibility(dispo).subscribe(d=>{},err=>{
        
        this.router.navigate(['/listDisponibility']);
        Swal.fire('echec  ', 'erreur lors de la disponibilié', 'error');
      })
  
    })*/

    timeD=timeF;
  }

  
  

  this.planingService.getEventsByDay(e.day).subscribe(event=>{
    event.forEach(ev=>{
      if (e.timeD===ev.timeD && ev.speciality.specialityId===Number(e.speciality.specialityId)) {
        
  this.router.navigate(['/listDisponibility']);

  Swal.fire('echec  ', 'event déjà occupé', 'error');
 
}
    })
  })

  this.planingService.addEvent(e).subscribe(event=>{
    console.log(event);
    Swal.fire('ok  ', 'Enregistrement réussi', 'success');

    },err=>console.log(err))

})
 

}


}
