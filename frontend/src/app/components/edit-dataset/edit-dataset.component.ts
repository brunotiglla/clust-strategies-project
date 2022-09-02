import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {DATASET} from 'src/app/mock/mock-dataset';
import { Dataset } from 'src/app/models/dataset-model';



@Component({
  selector: 'app-edit-dataset',
  templateUrl: './edit-dataset.component.html',
  styleUrls: ['./edit-dataset.component.css']
})
export class EditDatasetComponent implements OnInit {

  constructor( 
    private router:Router,
    private route: ActivatedRoute
    ) { }

  datasetsTemp = DATASET;
  currentDataset: Dataset | undefined;

  ngOnInit(): void {
    this.getDataset();
  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

  getDataset(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.currentDataset = this.datasetsTemp.find(h =>h.id ===id)!;
  }

}
