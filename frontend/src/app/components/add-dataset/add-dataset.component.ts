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
    this.auxFunction();
    //this.add()
    //this.router.navigate([`${pageName}`]);
  }

  fd = new FormData();

  auxFunction(): void{
    this.add();
    this.addFile();
  }

  add():void{
    this.dataset.company_id = 1;
    this.dataset.file_name = this.addForm.get('name')?.value
    this.dataset.created_timestamp = this.addForm.get('date')?.value
    console.log(this.dataset);
    this.datasetService.createDataset(this.dataset).subscribe((data: any) =>{
      console.log(data.id);
      this.dataset.id = data.id;
      const aux = String(this.dataset.id);
      this.fd.append("c_id", "1");
      this.fd.append("d_id", aux);
      this.fd.append("file",this.fileTmp.file);
      this.datasetService.postFile2(this.fd).subscribe();
      console.log("owo");
    })

    

    //this.datasetService.postFile(this.fileTmp,1,1).subscribe();
    //var body = {"c_id":1,"d_id":2,"file": this.fileTmp}
    //const aux = String(this.dataset.id);
    //console.log(aux);
//
    //console.log("next");
    //this.addFile();

    
    //this.fd.append("c_id", "1");
    //this.fd.append("d_id", aux);
    //this.fd.append("file",this.fileTmp.file);
//
    ////this.datasetService.postFile2(this.fileTmp.data).subscribe();
    //this.datasetService.postFile2(this.fd).subscribe();
  }

  addFile(){
    console.log(this.dataset.id);
  }

  private fileTmp:any;

  uploadFile(event: any): void {
    console.log('file selected');


    const [ file ] = event.target.files;

    this.fileTmp = {
      file:file,
      //fileName:file.name
      data: {c_id: 1, d_id: 2, file: file}
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
