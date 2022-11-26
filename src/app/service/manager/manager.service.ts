import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manager } from 'src/app/type/types';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  
private urlApi='';

constructor(private httpClient: HttpClient) { }

public getManager(): Observable<Manager[]>
{
  return this.httpClient.get<Manager[]>(`${this.urlApi}/manager/all`);
}

public addManager(manager: Manager): Observable<Manager>
{
  return this.httpClient.post<Manager>(`${this.urlApi}/manager/all`,manager);
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
