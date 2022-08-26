import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ApiService } from 'src/app/servicios/api/api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup ;
  msg: any;
  constructor(private pService:ApiService,  private fb: FormBuilder) { }
 
  ngOnInit() : void {
   this.buildForm();
   this.showMesage();
  }
 
  showMesage(){
    this.pService.getMessage().subscribe(data=>{

      this.msg = data;
      console.log(this.msg);
    })
  }


  ///
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
