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
    aux_id: '',
    Gender: '',
    Ever_Married: '',
    Age: '',
    Graduated: '',
    Profession: '',
    Work_Experience: '',
    Spending_Score: '',
    Family_Size: '',
    Var_1: '',
  }

  ngOnInit(): void {
    this.getClientInfo()
    this.editForm = new FormGroup({
      Gender: new FormControl(),
      Ever_Married: new FormControl(),
      Age: new FormControl(),
      Graduated: new FormControl(),
      Profession: new FormControl(),
      Work_Experience: new FormControl(),
      Spending_Score: new FormControl(),
      Family_Size: new FormControl(),
      Var_1: new FormControl()
     });
  }

  getClientInfo(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clientInforService.getElementById(id)
    .subscribe(data=> this.clientInfo = data);
  }

  editClientInfo(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    let c_id:number = JSON.parse(localStorage.getItem('current'));

    this.clientInfo.company_id = c_id;
    this.clientInfo.dataset_id = id;
    this.clientInfo.Gender = this.editForm.get('Gender')?.value;
    this.clientInfo.Ever_Married = this.editForm.get('Ever_Married')?.value;
    this.clientInfo.Age = this.editForm.get('Age')?.value;
    this.clientInfo.Graduated = this.editForm.get('Graduated')?.value;
    this.clientInfo.Profession = this.editForm.get('Profession')?.value;
    this.clientInfo.Work_Experience = this.editForm.get('Work_Experience')?.value;
    this.clientInfo.Spending_Score = this.editForm.get('Spending_Score')?.value;
    this.clientInfo.Family_Size = this.editForm.get('Family_Size')?.value;
    this.clientInfo.Var_1 = this.editForm.get('Var_1')?.value;

    this.clientInforService.editClientInfo(id,this.clientInfo).subscribe((data: any) =>{
      console.log(data);
    })
  }
}

