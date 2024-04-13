import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  User, apiUrl,httpOptions } from 'src/app/type/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {



 


  constructor(private httpClient: HttpClient) { }
  

  public getUser():  Observable<User[]>
  {

   return this.httpClient.get<User[]>(`${apiUrl}/get_users/`);

  }



  
  public getUserByID(id:number): User
  {
    
    let user:User={
      userId: 0,
      firstname: '',
      email: '',
      phone: 0,
      name: '',
      password: '',
      role: ''
    };

    this.httpClient.get<User>(`${apiUrl}/user/${id}`).subscribe(

     { 
      
      next: users => user=users,
      error: err => console.error('Quelque chose s\'est mal passé :', err),
      complete: () => console.log('L\'histoire est terminée !')
     
   }
       
    );

  return user;
  }
  

}
