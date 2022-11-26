import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../type/types';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

private urlApi='';

  constructor(private httpClient: HttpClient) { }

  public getStudent(): Observable<Student[]>
  {
    return this.httpClient.get<Student[]>(`${this.urlApi}/student/all`);
  }

  public addStudent(student: Student): Observable<Student>
  {
    return this.httpClient.post<Student>(`${this.urlApi}/student/all`,student);
  }

  public updateStudent(student: Student): Observable<Student>
  {
    return this.httpClient.put<Student>(`${this.urlApi}/student/update`,student);
  }

  public deleteStudent(studentID: number): Observable<void>
  {
    return  this.httpClient.delete<void>(`${this.urlApi}/student/delete/${studentID}`);
  }

}
