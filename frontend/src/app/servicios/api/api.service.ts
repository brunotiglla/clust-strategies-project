import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { singupModel, AuthResData, loginModel, User } from 'src/app/models/auth.models'
import { BehaviorSubject, throwError} from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { Router } from '@angular/router';

const httpOptions={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};



@Injectable(
  {providedIn: 'root'}
)
export class ApiService {
  user = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private router: Router) {   }
   
  singup(account: singupModel) {
    return this.http.post<AuthResData>('http://localhost:8000/api/accounts/register/', account)
    .pipe(catchError(this.handleError), tap((res)=>{
      console.log(res)
    }))
  }

  login(account: loginModel){
    return this.http.post<AuthResData>('http://localhost:8000/api/accounts/login/', account)
    .pipe(catchError(this.handleError), tap((res)=>{
      this.handleAuth(res)
    }))
  }

  autoLogin(){
    const userData:AuthResData = JSON.parse(localStorage.getItem('user'))
    if(!userData){
      return;
    }
    const loadedUser = new User(userData.user_id, userData.email, userData.username, userData.admin_name, userData.token)
    this.user.next(loadedUser)

  }



  private handleError(error: HttpErrorResponse) {
    console.log(error)
    let errormesages = 'Error Occured'
    return throwError(errormesages);
  }

  private handleAuth(res: AuthResData){
    const user = new User(res.user_id, res.email, res.username, res.admin_name, res.token);
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user)) 
  }



  logout(){
    this.user.next(null)
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }
  
}
