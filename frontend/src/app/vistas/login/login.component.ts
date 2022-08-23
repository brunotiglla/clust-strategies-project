import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup ;

  constructor(private fb: FormBuilder) { }
 
  ngOnInit() {
   this.buildForm();
  }
 
  onSubmit() {
   if (this.loginForm.invalid){
     console.log("sub form", this.loginForm.value);

   }
   else{
     console.error('form is bad')
   }
  }
 
  private buildForm() {
   this.loginForm = this.fb.group({
     login: ["", Validators.required],
     password: ["", Validators.required]
   });
 }

} 
