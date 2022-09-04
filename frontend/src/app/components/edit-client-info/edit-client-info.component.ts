import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Client_info} from 'src/app/models/client-info-model';
import {ClientInfoService} from 'src/app/servicios/clientInfo/client-info.service'

@Component({
  selector: 'app-edit-client-info',
  templateUrl: './edit-client-info.component.html',
  styleUrls: ['./edit-client-info.component.css']
})
export class EditClientInfoComponent implements OnInit {

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private clientInforService: ClientInfoService
  ) { }

  editForm: FormGroup;
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
    this.getClientInfo()
    this.editForm = new FormGroup({
      client_name: new FormControl(),
      client_gender: new FormControl(),
      client_expenses: new FormControl(),
      client_income: new FormControl()
     });
  }

  getClientInfo(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clientInforService.getElementById(id)
    .subscribe(data=> this.clientInfo = data);
  }

  editClientInfo(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.clientInfo.company_id = 1;
    this.clientInfo.dataset_id = id;
    this.clientInfo.client_name = this.editForm.get('client_name')?.value;
    this.clientInfo.client_gender = this.editForm.get('client_gender')?.value;
    this.clientInfo.client_expenses = this.editForm.get('client_expenses')?.value;
    this.clientInfo.client_income = this.editForm.get('client_income')?.value;

    this.clientInforService.editClientInfo(id,this.clientInfo).subscribe((data: any) =>{
      console.log(data);
    })
  }
}

