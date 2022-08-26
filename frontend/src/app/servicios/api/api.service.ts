import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable(
  {providedIn: 'root'}
)
export class ApiService {
  api_url = 'http://localhost::8000/ ';
  
   constructor(private http: HttpClient) {   }
  
   // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
   getMessage(){
    return this.http.get(this.api_url);
   }
   
   public login() {
    console.log('casi bro')
   }
  

}
