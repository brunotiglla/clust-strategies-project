import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ApiService } from 'src/app/servicios/api/api.service'
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private authservice: ApiService, private router:Router) { }
  isLoginMode: true;
  loginForm: FormGroup;

  ngOnInit() {
    
    this.loginForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, Validators.required)
    });
   }

  onLogin(){
    console.log(this.loginForm)
  }

 


  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

}
