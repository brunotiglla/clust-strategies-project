import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ApiService } from 'src/app/servicios/api/api.service'
import { AuthResData, singupModel } from 'src/app/models/auth.models';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private authservice: ApiService) { }
  isLoginMode: true;
  singupForm: FormGroup;

  ngOnInit(): void {
    this.singupForm = new FormGroup({
      'username' : new FormControl(null, Validators.required),
      'admin_name' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'passwords' : new FormGroup({
        'password' : new FormControl(null, Validators.required),
        'confirmpassword' : new FormControl(null, Validators.required) 
      }, this.passwordCheck)
    });
  }

  onSignup(){
    console.log(this.singupForm)
    this.authservice.singup({
      'email': this.singupForm.get('email').value,
      'username': this.singupForm.get('username').value,
      'admin_name': this.singupForm.get('admin_name').value,
      'password': this.singupForm.get('passwords.password').value,
    })
    .subscribe(
      (data: AuthResData) =>{
        console.log(data)
      }, (errorRes) =>{
        console.log(errorRes);
      }
    )
  }


  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }


  passwordCheck(control:FormGroup): {[s:string] : boolean} {
    if(control.get('password').value != control.get('confirmpassword').value){
      return {'notsame':true}
    }
    return null;
  }

}
