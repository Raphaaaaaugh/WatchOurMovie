import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Disponibility, Manager, Matter, Room, Speciality, Student, Teacher,Event, TimeTable } from 'src/app/type/types';

@Injectable({
  providedIn: 'root'
})
export class PlaningService {
 
  private urlApi="http://localhost:8085";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type'",
    })
  };
  constructor(private httpClient: HttpClient) { }
  

  public login(login:{ email: string; password: string;roleUser: string }): Observable<any>
  {

if (login.roleUser==="student") {
  return this.httpClient.post<Student>(`${this.urlApi}/student/login`,login,this.httpOptions);
}else if(login.roleUser==="teacher"){
  return this.httpClient.post<Teacher>(`${this.urlApi}/teacher/login`,login);
}else return this.httpClient.post<Manager>(`${this.urlApi}/manager/login`,login);

    
  }


  public getManager(): Observable<Manager[]>
  {
    return this.httpClient.get<Manager[]>(`${this.urlApi}/manager/all`);
  }
  
  public addManager(manager: Manager): Observable<Manager>
  {
    return this.httpClient.post<Manager>(`${this.urlApi}/manager/add`,manager);
  }
  
  public updateManager(manager: Manager): Observable<Manager>
  {
    return this.httpClient.put<Manager>(`${this.urlApi}/manager/update`,manager);
  }
  
  public deleteManager(managerId: number): Observable<void>
  {
    return  this.httpClient.delete<void>(`${this.urlApi}/manager/delete/${managerId}`);
  }

  public getStudent(): Observable<Student[]>
  {
    return this.httpClient.get<Student[]>(`${this.urlApi}/student/all`,this.httpOptions);
  }

  public addStudent(student: Student): Observable<Student>
  {
    return this.httpClient.post<Student>(`${this.urlApi}/student/add`,student);
  }

  public updateStudent(student: Student): Observable<Student>
  {
    return this.httpClient.put<Student>(`${this.urlApi}/student/update`,student);
  }

  public deleteStudent(studentID: number): Observable<void>
  {
    return  this.httpClient.delete<void>(`${this.urlApi}/student/delete/${studentID}`);
  }

  public getTeacher(): Observable<Teacher[]>
  {
    return this.httpClient.get<Teacher[]>(`${this.urlApi}/teacher/all`);
  }
  
  public addTeacher(teacher: Teacher,matterId:number): Observable<Teacher>
  {
    return this.httpClient.post<Teacher>(`${this.urlApi}/teacher/add/${matterId}`,teacher);
  }
  
  public updateTeacher(teacher: Teacher): Observable<Teacher>
  {
    return this.httpClient.put<Teacher>(`${this.urlApi}/teacher/update`,teacher);
  }
  
  public deleteTeacher(teacherId: number): Observable<void>
  {
    return  this.httpClient.delete<void>(`${this.urlApi}/teacher/delete/${teacherId}`);
  }

  public getSpecialities(): Observable<Speciality[]>
  {
    return  this.httpClient.get<Speciality[]>(`${this.urlApi}/speciality/all`);
  }

  public addDisponibility(disponibility:Disponibility): Observable<Disponibility>
  {
    return  this.httpClient.post<Disponibility>(`${this.urlApi}/disponibility/add`,disponibility);
  }

  public updateDisponibility(disponibility:Disponibility): Observable<Disponibility>
  {
    return  this.httpClient.put<Disponibility>(`${this.urlApi}/disponibility/update`,disponibility);
  }

  public getDisponibility(teacherId:number,state:boolean): Observable<Disponibility[]>
  {
    return  this.httpClient.get<Disponibility[]>(`${this.urlApi}/disponibility/all/${teacherId}/${state}`);
  }
  public getDisponibilityByDay(day:string): Observable<Disponibility[]>
  {
    return  this.httpClient.get<Disponibility[]>(`${this.urlApi}/disponibility/day/${day}`);
  }

  public getDisponibilityByDayTime(teacherId:number,day:string,timeD:string,timeF:string): Observable<Disponibility>
  {
    return  this.httpClient.get<Disponibility>(`${this.urlApi}/disponibility/DayTime/${teacherId}/${day}/${timeD}/${timeF}`);
  }

  public getDisponibilityByDayTimeD(teacherId:number,day:string,timeD:string): Observable<Disponibility>
  {
    return  this.httpClient.get<Disponibility>(`${this.urlApi}/disponibility/DayTime/${teacherId}/${day}/${timeD}`);
  }

  public getDisponibilities(): Observable<Disponibility[]>
  {
    return  this.httpClient.get<Disponibility[]>(`${this.urlApi}/disponibility/all`);
  }

  public getOneDisponibility(dispoId:number): Observable<Disponibility>
  {
    return  this.httpClient.get<Disponibility>(`${this.urlApi}/disponibility/one/${dispoId}`);
  }

  public getMatters(): Observable<Matter[]>
  {
    return  this.httpClient.get<Matter[]>(`${this.urlApi}/matter/all`);
  }

  public getMatter(matterId:number): Observable<Matter>
  {
    return  this.httpClient.get<Matter>(`${this.urlApi}/matter/one/${matterId}`);
  }

  public getMatterSpecialities(specialityId:number): Observable<Matter[]>
  {
    return  this.httpClient.get<Matter[]>(`${this.urlApi}/matter/speciality/${specialityId}`);
  }

  public addMatter(matter:Matter): Observable<Matter>
  {
    return  this.httpClient.post<Matter>(`${this.urlApi}/matter/add`,matter);
  }

  public getRooms(): Observable<Room[]>
  {
    return  this.httpClient.get<Room[]>(`${this.urlApi}/room/all`);
  }

  public getRoomsByCapacity(capacity:number): Observable<Room[]>
  {
    return  this.httpClient.get<Room[]>(`${this.urlApi}/room/capacity/${capacity}`);
  }

  public getRoomsByName(name:string): Observable<Room>
  {
    return  this.httpClient.get<Room>(`${this.urlApi}/room/name/${name}`);
  }

  public addRoom(room:Room): Observable<Room>
  {
    return  this.httpClient.post<Room>(`${this.urlApi}/room/add`,room);
  }

  public updateRoom(room:Room): Observable<Room>
  {
    return  this.httpClient.put<Room>(`${this.urlApi}/room/update`,room);
  }

  public getEvents(): Observable<Event[]>
  {
    return  this.httpClient.get<Event[]>(`${this.urlApi}/event/all`);
  }

  public getEventsByDay(day:string): Observable<Event[]>
  {
    return  this.httpClient.get<Event[]>(`${this.urlApi}/event/day/${day}`);
  }

  public addEvent(event:Event): Observable<Event>
  {
    return  this.httpClient.post<Event>(`${this.urlApi}/event/add`,event);
  }

  public getEventBySpeciality(specialityId:number): Observable<Event[]>
  {
    return  this.httpClient.get<Event[]>(`${this.urlApi}/event/speciality/${specialityId}`);
  }
  public getEventByTeacher(teacherId:number): Observable<Event[]>
  {
    return  this.httpClient.get<Event[]>(`${this.urlApi}/event/teacher/${teacherId}`);
  }

  public getTimeTable(timeTable:TimeTable ): Observable<TimeTable>
  {
    return  this.httpClient.post<TimeTable>(`${this.urlApi}/timeTable/solve`,timeTable);
  }
}
