import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'

@Component({
  selector: 'app-add-dataset',
  templateUrl: './add-dataset.component.html',
  styleUrls: ['./add-dataset.component.css']
})
export class AddDatasetComponent implements OnInit {

  constructor( private router:Router) { }

  fileName ='';
  addForm: FormGroup;
  

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl(),
      date: new FormControl()
     });
  }
  
  goToPage(pageName:string):void{
    this.add()
    //this.router.navigate([`${pageName}`]);
  }

  add():void{
    console.log(this.addForm);
  }

}
