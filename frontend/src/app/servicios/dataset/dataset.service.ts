import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {Dataset, DatasetResponse} from 'src/app/models/dataset-model';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  constructor(private http: HttpClient) { }

  getList(): Observable<Dataset[]>{
    return this.http.get<Dataset[]>(`${environment.apiUrl}/dataset/`)
    .pipe(catchError((e) => throwError(e)));
  }

  createDataset(dataset: Dataset){
    return this.http.post<any>(`${environment.apiUrl}/dataset/`,dataset)
    .pipe(catchError((e) => throwError(e)));
  }

  editDataset(id: number, dataset: Dataset){
    return this.http.put<any>(`${environment.apiUrl}/dataset/${id}/`,dataset)
    .pipe(catchError((e) => throwError(e)));
  }

  deleteDataset(id: number){
    return this.http.delete<any>(`${environment.apiUrl}/dataset/${id}`)
    .pipe(catchError((e) => throwError(e)));
  }

  getElementById(id: number){
    return this.http.get<any>(`${environment.apiUrl}/dataset/${id}/`)
    .pipe(catchError((e) => throwError(e)));
  }

  postFile(file: FormData,c_id :number,d_id :number){
    return this.http.post<any>(`${environment.apiUrl}/info/upload_data/`,[file,c_id,d_id])
    .pipe(catchError((e) => throwError(e)));
  }
  //postFile(file: FormData,c_id :number,d_id :number){
  //  return this.http.post<any>(`${environment.apiUrl}/info/upload_data/`,file)
  //  .pipe(catchError((e) => throwError(e)));
  //}
}
