import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

   // http options used for making API calls
   private httpOptions: any;
  
  
   // error messages received from the login attempt
   public errors: any = [];
  
   constructor(private http: HttpClient) {
     this.httpOptions = {
       headers: new HttpHeaders({'Content-Type': 'application/json'})
     };
   }
  
   // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
   public login() {
    console.log('casi bro')
   }
  

}
