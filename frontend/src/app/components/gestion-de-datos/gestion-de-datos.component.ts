import { Component, OnInit } from '@angular/core';
import {DATASET} from 'src/app/mock/mock-dataset';
import {CLIENT} from 'src/app/mock/mock-client';
import { Router } from '@angular/router';
import {DatasetService} from 'src/app/servicios/dataset/dataset.service'
import {Dataset} from 'src/app/models/dataset-model';

@Component({
  selector: 'app-gestion-de-datos',
  templateUrl: './gestion-de-datos.component.html',
  styleUrls: ['./gestion-de-datos.component.css']
})
export class GestionDeDatosComponent implements OnInit {

  constructor(private router:Router, private datasetService: DatasetService) { }

  datasets = DATASET;

  dataset: Dataset[] = [];

  deleteFromArray(id:number):void{
    this.datasetService.deleteDataset(id).subscribe();
  }

  

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

  goToPage2(pageName:string,id:number):void{
    console.log(id);
    this.router.navigate([`${pageName}`,id]);
  }

  checkedID: number[] = [];


  checked(id: number): void{
    const index = this.checkedID.indexOf(id);
    if (index > -1){
      this.checkedID.splice(index,1);
    }else{
      this.checkedID.push(id);
    }
    
    console.log(this.checkedID);

  }

  sendDataset(): void{
    console.log("Información enviada");
  }

  ngOnInit(): void {
    let c_id:number = JSON.parse(localStorage.getItem('current'));
    console.log(c_id);

    this.datasetService.getListFk(c_id)
    .subscribe(data=> this.dataset = data);

    console.log(this.dataset);
  }

}
