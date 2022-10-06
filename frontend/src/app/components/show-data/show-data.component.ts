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
  newFormat: Client_Info_K_Means[] = [];
  auxFormat: Client_Info_K_Means;

  dataSetId: number;

  ngOnInit(): void {
    this.dataSetId = Number(this.route.snapshot.paramMap.get('id'));

    this.clientInfoService.useModel(this.dataSetId)
    .subscribe(data=> {this.clientInfo = data;
      console.log(this.clientInfo);
      console.log(this.clientInfo['Age'][1]);
      this.newFormat = Object.keys(data)
      .map(function(key){
        return data[key];
      });
      console.log("a")
      console.log(this.newFormat)
      //for(let i = 0; i < 4; i++){
      //  this.auxFormat.Age=data['Age'][i]
      //  this.auxFormat.id=data['id'][i]
      //  console.log(this.auxFormat)
      //}
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
