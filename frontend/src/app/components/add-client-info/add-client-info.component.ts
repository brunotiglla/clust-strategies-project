import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {Client_info} from 'src/app/models/client-info-model';
import {ClientInfoService} from 'src/app/servicios/clientInfo/client-info.service';
@Component({
  selector: 'app-add-client-info',
  templateUrl: './add-client-info.component.html',
  styleUrls: ['./add-client-info.component.css']
})
export class AddClientInfoComponent implements OnInit {

  constructor(
    private router:Router, 
    private route: ActivatedRoute,
    private clientInfoService: ClientInfoService
    ) { }

  addForm: FormGroup;
  clientInfo : Client_info = {
    id: 0,
    company_id: 0,
    dataset_id: 0,
    client_name: '',
    client_gender: '',
    client_expenses: '',
    client_income: '',
  }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      client_name: new FormControl(),
      client_gender: new FormControl(),
      client_expenses: new FormControl(),
      client_income: new FormControl()
     });
  }

  goToPage(pageName:string):void{
    this.add();
    this.router.navigate([`${pageName}`]);
  }

  add():void{
    this.clientInfo.company_id = 1;
    this.clientInfo.dataset_id = Number(this.route.snapshot.paramMap.get('id'));
    this.clientInfo.client_name = this.addForm.get('client_name')?.value;
    this.clientInfo.client_gender = this.addForm.get('client_gender')?.value;
    this.clientInfo.client_expenses = this.addForm.get('client_expenses')?.value;
    this.clientInfo.client_income = this.addForm.get('client_income')?.value;
    console.log(this.clientInfo);
    this.clientInfoService.createClientInfo(this.clientInfo).subscribe((data: any) =>{
      console.log(data);
    })
  }

}
