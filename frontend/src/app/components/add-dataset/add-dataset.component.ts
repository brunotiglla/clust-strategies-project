import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-dataset',
  templateUrl: './add-dataset.component.html',
  styleUrls: ['./add-dataset.component.css']
})
export class AddDatasetComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit(): void {
  }
  
  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

}
