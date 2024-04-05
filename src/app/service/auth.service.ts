import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  User, Users, apiUrl,httpOptions } from 'src/app/type/types';


@Injectable({
  providedIn: 'root'
})
export class AuthService {




  constructor(private httpClient: HttpClient) { }
  

  public login(login:{ email: string; password: string; }): User
  {

    let user:User={
      userId: 0,
      firstName: '',
      email: '',
      phone: 0,
      name: '',
      password: '',
      role: ''
    };

    this.httpClient.get<User>(`${apiUrl}/infos_user/${login.email}`).subscribe(

     { 
      
      next: users => user=users,
      error: err => console.error('Quelque chose s\'est mal passé :', err),
      complete: () => console.log('L\'histoire est terminée !')
     
   }
       
    );

  return user;

  }



  
  public register(users: Users): User
  {

    let user:User={
      userId: 0,
      firstName: '',
      email: '',
      phone: 0,
      name: '',
      password: '',
      role: ''
    };
console.log(users)
    this.httpClient.post<User>(`${apiUrl}/create_user/`,users).subscribe(

     { 
      
      next: users => {
        console.log(users)
        user=users},
      error: err => console.error('Quelque chose s\'est mal passé :', err),
      complete: () => console.log('L\'histoire est terminée !')
     
   }
       
    );

  return user;
  }
  

}
