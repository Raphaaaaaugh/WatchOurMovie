import { Time } from "@angular/common";

export interface Manager{
    managerId:number
    firstName: string,
    email: string, 
    phone: number,
    lastName:string, 
    password:string, 
    role:string,
			 
}


export interface Student{
    studentId:number
    firstName: string,
    email: string, 
    phone: number;
    lastName:string; 
    password:string; 
    role:string;
    speciality:{specialityId:number};
    schoolYear:number
			 
}


export interface Teacher{
    teacherId:number
    firstName: string,
    email: string, 
    phone: number,
    lastName:string, 
    password:string, 
    role:string,
			 
}

export interface Speciality{
    specialityId:number;
    name:string;
}

export interface Room{
    roomId:number;
    name:string;
    capacity:number;
    state:boolean;
}

export interface Matter{
    matterId:number;
    name:string;
    coef:number;
    teachers:Teacher[]
}

export interface Disponibility{
    dispoId:number;
    timeD:string;
    timeF:string;
    day:string;
    teacher:{
        teacherId:number;
    };
}

export interface Event{
    eventId:number;
    timeD:string;
    timeF:string;
    day:string;
    title:string;
    speciality:{
        specialityId:number;
    };
    teacher:{
        teacherId:number;
    };
}