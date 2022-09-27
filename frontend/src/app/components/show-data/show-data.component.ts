import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {ClientInfoService} from 'src/app/servicios/clientInfo/client-info.service';
import {Client_info,Client_Info_K_Means} from 'src/app/models/client-info-model';
@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent implements OnInit {

  constructor(
    private router:Router, 
    private route: ActivatedRoute,
    private clientInfoService: ClientInfoService
  ) { }
  clientInfo: Client_Info_K_Means[] = [];

  dataSetId: number;

  ngOnInit(): void {
    this.dataSetId = Number(this.route.snapshot.paramMap.get('id'));

    this.clientInfoService.useModel(this.dataSetId)
    .subscribe(data=> {this.clientInfo = data;
    console.log(this.clientInfo);
      }
      
      );
  }
  objectKeys (objeto: any) {
    const keys = Object.keys(objeto);
    console.log(keys); // echa un vistazo por consola para que veas lo que hace "Object.keys"
    return keys;
 }
  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

  goToPage2(pageName:string,id:number):void{
    console.log(id);
    this.router.navigate([`${pageName}`,id]);
  }

}
