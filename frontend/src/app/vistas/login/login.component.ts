import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'

import { ApiService } from 'src/app/servicios/api/api.service'
import { first } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myform: FormGroup;

  constructor(private authservice: ApiService) { }
 
  ngOnInit() : void {
   this.myform = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
   });


  }
 
  get f(){
    return this.myform.controls;
  }

  ///
  onSubmit() {
    this.authservice.login(this.f['username'].value, this.f['password'].value)
    .pipe(first()).subscribe(
      (data: any) =>{
        console.log(data);
      }
    )
  }

} 
