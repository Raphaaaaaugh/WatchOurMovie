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
    phone: number,
    lastName:string, 
    password:string, 
    role:string,
    specialityId:number,
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