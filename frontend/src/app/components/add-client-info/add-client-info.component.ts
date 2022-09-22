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
    this.addForm = new FormGroup({
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

  goToPage(pageName:string):void{
    this.add();
    this.router.navigate([`${pageName}`]);
  }

  add():void{
    let c_id:number = JSON.parse(localStorage.getItem('current'));
    this.clientInfo.company_id = c_id;
    this.clientInfo.dataset_id = Number(this.route.snapshot.paramMap.get('id'));
    this.clientInfo.Gender = this.addForm.get('Gender')?.value;
    this.clientInfo.Ever_Married = this.addForm.get('Ever_Married')?.value;
    this.clientInfo.Age = this.addForm.get('Age')?.value;
    this.clientInfo.Graduated = this.addForm.get('Graduated')?.value;
    this.clientInfo.Profession = this.addForm.get('Profession')?.value;
    this.clientInfo.Work_Experience = this.addForm.get('Work_Experience')?.value;
    this.clientInfo.Spending_Score = this.addForm.get('Spending_Score')?.value;
    this.clientInfo.Family_Size = this.addForm.get('Family_Size')?.value;
    this.clientInfo.Var_1 = this.addForm.get('Var_1')?.value;
    console.log(this.clientInfo);
    this.clientInfoService.createClientInfo(this.clientInfo).subscribe((data: any) =>{
      console.log(data);
    })
  }

}
