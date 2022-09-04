import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {DatasetService} from 'src/app/servicios/dataset/dataset.service';
import {Dataset} from 'src/app/models/dataset-model';

@Component({
  selector: 'app-add-dataset',
  templateUrl: './add-dataset.component.html',
  styleUrls: ['./add-dataset.component.css']
})
export class AddDatasetComponent implements OnInit {

  constructor( private router:Router, private datasetService: DatasetService) { }

  fileName ='';
  addForm: FormGroup;
  dataset: Dataset = {
    id: 0,
    company_id: 0,
    file_name: '',
    created_timestamp: new Date(),
  }
  

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl(),
      date: new FormControl()
     });
  }
  
  goToPage(pageName:string):void{
    this.add()
    this.router.navigate([`${pageName}`]);
  }

  add():void{
    this.dataset.company_id = 1;
    this.dataset.file_name = this.addForm.get('name')?.value
    this.dataset.created_timestamp = this.addForm.get('date')?.value
    console.log(this.dataset);
    this.datasetService.createDataset(this.dataset).subscribe((data: any) =>{
      console.log(data);
    })
  }

}
