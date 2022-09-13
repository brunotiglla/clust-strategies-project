import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {ClientInfoService} from 'src/app/servicios/clientInfo/client-info.service';
import {Client_info} from 'src/app/models/client-info-model';
@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {

  constructor(
    private router:Router, 
    private route: ActivatedRoute,
    private clientInfoService: ClientInfoService
    ) { }

  clientInfo: Client_info[] = [];

  dataSetId: number;

  ngOnInit(): void {
    this.dataSetId = Number(this.route.snapshot.paramMap.get('id'));

    this.clientInfoService.getListFk(this.dataSetId)
    .subscribe(data=> this.clientInfo = data);

    
  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

  goToPage2(pageName:string,id:number):void{
    console.log(id);
    this.router.navigate([`${pageName}`,id]);
  }
  deleteFromArray(id:number):void{
    this.clientInfoService.deleteClientInfo(id).subscribe();
  }

}
