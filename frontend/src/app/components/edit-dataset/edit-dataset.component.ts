import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {DATASET} from 'src/app/mock/mock-dataset';
import { Dataset } from 'src/app/models/dataset-model';
import {DatasetService} from 'src/app/servicios/dataset/dataset.service'



@Component({
  selector: 'app-edit-dataset',
  templateUrl: './edit-dataset.component.html',
  styleUrls: ['./edit-dataset.component.css']
})
export class EditDatasetComponent implements OnInit {

  constructor( 
    private router:Router,
    private route: ActivatedRoute,
    private datasetService: DatasetService
    ) { }

  datasetsTemp = DATASET;
  dataset: Dataset = {
    id: 0,
    company_id: 0,
    file_name: '',
    created_timestamp: new Date(),
  }

  editForm: FormGroup;

  ngOnInit(): void {
    this.getDataset();
    this.editForm = new FormGroup({
      name: new FormControl(),
      date: new FormControl()
     });
  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
    //console.log("a");
  }

  getDataset(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    //this.currentDataset = this.datasetsTemp.find(h =>h.id ===id)!;
    this.datasetService.getElementById(id)
    .subscribe(data=> this.dataset = data);
  }

  editDataset(): void{
    this.dataset.file_name = this.editForm.get('name')?.value;
    //console.log(this.dataset)
    this.dataset.created_timestamp = this.editForm.get('date')?.value;
    //const id = Number(this.route.snapshot.paramMap.get('id'));

    console.log(this.dataset)

    this.datasetService.editDataset(this.dataset.id,this.dataset).subscribe();
    
    this.goToPage('Analisis');
  }

}
