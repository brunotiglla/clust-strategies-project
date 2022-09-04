import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {Client_info} from 'src/app/models/client-info-model'

@Injectable({
  providedIn: 'root'
})
export class ClientInfoService {

  constructor( private http: HttpClient) { }

  getList(): Observable<Client_info[]>{
    return this.http.get<Client_info[]>(`${environment.apiUrl}/info/`)
    .pipe(catchError((e) => throwError(e)));
  }

  getElementById(id: number){
    return this.http.get<any>(`${environment.apiUrl}/info/${id}/`)
    .pipe(catchError((e) => throwError(e)));
  }

  deleteClientInfo(id: number){
    return this.http.delete<any>(`${environment.apiUrl}/info/${id}`)
    .pipe(catchError((e) => throwError(e)));
  }

  editClientInfo(id: number, clientInfo: Client_info){
    return this.http.put<any>(`${environment.apiUrl}/info/${id}/`,clientInfo)
    .pipe(catchError((e) => throwError(e)));
  }
  createClientInfo(clientInfo: Client_info){
    return this.http.post<any>(`${environment.apiUrl}/info/`,clientInfo)
    .pipe(catchError((e) => throwError(e)));
  }
}
