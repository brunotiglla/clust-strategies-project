import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs';

const httpOptions={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};



@Injectable(
  {providedIn: 'root'}
)
export class ApiService {
  api_url = 'http://localhost:8000/';
  constructor(private http: HttpClient) {   }
   
  login(username: string, password: string) {
    return this.http.post<any>(this.api_url + 'accounts/api/auth/', 
    {username, password}, httpOptions).pipe(
      map( user=>{
        if(user && user.token){
          localStorage.setItem("currentUser", JSON.stringify(user));
        }
        return user;
      })
    );
  }

  logout(){
    localStorage.removeItem('currentUser');
  }
  
}