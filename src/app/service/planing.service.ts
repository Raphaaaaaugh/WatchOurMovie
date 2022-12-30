import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manager, Speciality, Student, Teacher } from 'src/app/type/types';

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
  
  public addTeacher(teacher: Teacher): Observable<Teacher>
  {
    return this.httpClient.post<Teacher>(`${this.urlApi}/teacher/add`,teacher);
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
}
