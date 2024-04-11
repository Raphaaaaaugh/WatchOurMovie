import { Time } from "@angular/common";
import { HttpHeaders } from "@angular/common/http";



export interface User{
    userId:number
    firstname: string,
    email: string, 
    phone: number;
    name:string; 
    password:string; 
    role:string;
		 
}

export interface Users{
  id:number,
  firstname: string,
  name:string; 
  password:string; 

   
}



export const  apiUrl="http://0.0.0.0:8000" 

export interface Movie{
    title: string
    release_date: string
    original_title: string
    original_language: string
    backdrop_path: string
    id: number
    adult? : boolean 
    homepage?: string
    popularity?: number
    revenue?: number
    runtime?: number
}


export const  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type'",
    })
  };

  export function logout(){
    sessionStorage.clear();
    window.location.reload();
    }



