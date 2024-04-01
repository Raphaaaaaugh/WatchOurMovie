import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  User, apiUrl,httpOptions } from 'src/app/type/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {



 


  constructor(private httpClient: HttpClient) { }
  

  public getUser(): User[]
  {


  
    let user:User[]=[]
    

    this.httpClient.get<User>(`${apiUrl}/user/`,httpOptions).subscribe(

     { 
      
      next: users => user.push(users),
      error: err => console.error('Quelque chose s\'est mal passé :', err),
      complete: () => console.log('L\'histoire est terminée !')
     
   }
       
    );

  return user;

  }



  
  public getUserByID(id:number): User
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

    this.httpClient.get<User>(`${apiUrl}/user/${id}`,httpOptions).subscribe(

     { 
      
      next: users => user=users,
      error: err => console.error('Quelque chose s\'est mal passé :', err),
      complete: () => console.log('L\'histoire est terminée !')
     
   }
       
    );

  return user;
  }
  

}
