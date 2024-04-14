import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  User, Users, apiUrl,httpOptions } from 'src/app/type/types';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {




  constructor(private httpClient: HttpClient) { }
  

  public login(login:{ email: string; password: string; }): Observable<any>
  {


   return  this.httpClient.post<any>(`${apiUrl}/login/`,login);

  

  }



  
  public register(users: Users): Observable<any>
  {
    console.log("aa");
    console.log(users);
    return this.httpClient.post<any>(`${apiUrl}/register/`,users)
  }
  

}
