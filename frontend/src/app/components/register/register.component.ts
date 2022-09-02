import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ApiService } from 'src/app/servicios/api/api.service'


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
      })
    });
  }

  onSignup(){
    console.log(this.singupForm)
  }


  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

}
