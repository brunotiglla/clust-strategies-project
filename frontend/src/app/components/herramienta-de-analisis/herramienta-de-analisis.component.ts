import { Component, OnInit } from '@angular/core';
import {DATASET} from 'src/app/mock/mock-dataset';
import {CLIENT} from 'src/app/mock/mock-client';
import { Router } from '@angular/router';
import {DatasetService} from 'src/app/servicios/dataset/dataset.service'
import {Dataset} from 'src/app/models/dataset-model';

@Component({
  selector: 'app-herramienta-de-analisis',
  templateUrl: './herramienta-de-analisis.component.html',
  styleUrls: ['./herramienta-de-analisis.component.css']
})
export class HerramientaDeAnalisisComponent implements OnInit {

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

  ngOnInit(): void {
    this.datasetService.getList()
    .subscribe(data=> this.dataset = data);

    console.log(this.dataset);
  }

}
