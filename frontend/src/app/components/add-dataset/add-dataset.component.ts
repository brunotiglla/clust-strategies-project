import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {DatasetService} from 'src/app/servicios/dataset/dataset.service';
import {Dataset} from 'src/app/models/dataset-model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-dataset',
  templateUrl: './add-dataset.component.html',
  styleUrls: ['./add-dataset.component.css']
})
export class AddDatasetComponent implements OnInit {

  constructor( 
    private router:Router,
    private formBuilder: FormBuilder,
    private datasetService: DatasetService) { }

  fileName ='';
  addForm: FormGroup;
  dataset: Dataset = {
    id: 0,
    company_id: 0,
    file_name: '',
    created_timestamp: new Date(),
  }

  MyForm: FormGroup
  

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl(),
      date: new FormControl()
     });

     this.MyForm = this.formBuilder.group({
      file: [null, Validators.required],
      c_id: 0,
      d_id: 0
     })
  }
  
  goToPage(pageName:string):void{
    this.add()
    //this.router.navigate([`${pageName}`]);
  }

  add():void{
    //this.dataset.company_id = 1;
    //this.dataset.file_name = this.addForm.get('name')?.value
    //this.dataset.created_timestamp = this.addForm.get('date')?.value
    //console.log(this.dataset);
    //this.datasetService.createDataset(this.dataset).subscribe((data: any) =>{
    //  console.log(data);
    //})

    this.datasetService.postFile(this.fileTmp,1,1).subscribe();
  }

  private fileTmp:any;

  uploadFile(event: any): void {
    console.log('file selected');


    const [ file ] = event.target.files;

    this.fileTmp = {
      file:file,
      //fileName:file.name
    }

    console.log(file);
    

    //const files = (event.target as HTMLInputElement).files[0];
    //this.MyForm.patchValue({
    //  file: files
    //});
//
    //this.MyForm.get('file')?.updateValueAndValidity();

    
    

  }
  
}
