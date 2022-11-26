import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from 'src/app/type/types';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  
  private urlApi='';

  constructor(private httpClient: HttpClient) { }
  
  public getTeacher(): Observable<Teacher[]>
  {
    return this.httpClient.get<Teacher[]>(`${this.urlApi}/teacher/all`);
  }
  
  public addTeacher(teacher: Teacher): Observable<Teacher>
  {
    return this.httpClient.post<Teacher>(`${this.urlApi}/teacher/all`,teacher);
  }
  
  public updateTeacher(teacher: Teacher): Observable<Teacher>
  {
    return this.httpClient.put<Teacher>(`${this.urlApi}/teacher/update`,teacher);
  }
  
  public deleteTeacher(teacherId: number): Observable<void>
  {
    return  this.httpClient.delete<void>(`${this.urlApi}/teacher/delete/${teacherId}`);
  }
}
