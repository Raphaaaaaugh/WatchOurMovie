import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Manager } from 'src/app/type/types';

@Injectable({
  providedIn: 'root'
})
export class PlaningService {
 
  private urlApi="http://localhost:8081";
  private urlApi2="http://192.168.243.143:8003";
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


  return this.httpClient.post<Manager>(`${this.urlApi}/student/login`,login,this.httpOptions);

  }


  public getManager(): Observable<Manager[]>
  {
    return this.httpClient.get<Manager[]>(`${this.urlApi}/manager/all`);
  }

  public train(path:string): Observable<string>
  {
    return this.httpClient.get<string>(`${this.urlApi2}/${path}`);
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

}
