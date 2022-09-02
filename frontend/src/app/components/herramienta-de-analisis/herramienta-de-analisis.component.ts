import { Component, OnInit } from '@angular/core';
import {DATASET} from 'src/app/mock/mock-dataset';
import {CLIENT} from 'src/app/mock/mock-client';
import { Router } from '@angular/router';


@Component({
  selector: 'app-herramienta-de-analisis',
  templateUrl: './herramienta-de-analisis.component.html',
  styleUrls: ['./herramienta-de-analisis.component.css']
})
export class HerramientaDeAnalisisComponent implements OnInit {

  constructor(private router:Router) { }

  datasets = DATASET;

  deleteFromArray(id:number):void{
    delete this.datasets[id-1];

  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

  goToPage2(pageName:string,id:number):void{
    console.log(id);
    this.router.navigate([`${pageName}`,id]);
  }

  ngOnInit(): void {
  }

}
