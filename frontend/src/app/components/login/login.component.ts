import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ApiService } from 'src/app/servicios/api/api.service'
import { first } from 'rxjs';
import { AuthResData } from 'src/app/models/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private authservice: ApiService, private router:Router) { }
  isLoginMode: true;
  loginForm: FormGroup;
  token: string;

  ngOnInit() {
    
    this.loginForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, Validators.required)
    });
   }

  onLogin(){
    this.authservice.login(this.loginForm.value)
    .subscribe(
      (data:AuthResData) =>{
        this.token = data.token
        console.log(data)
        this.goToPage("Inicio");
        //this.router.navigate(['/mi-perfil.component.html'])
        //JSON.stringify(localStorage.setItem('current',data.user_id));
        localStorage.setItem('current',JSON.stringify(data.user_id));

        //let temp:number = Object.assign(new Number,JSON.parse(localStorage.getItem('current')));

        let temp2:number = JSON.parse(localStorage.getItem('current'));

        //console.log(temp);
        console.log(temp2);

      }
    )

  }

 


  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

}
