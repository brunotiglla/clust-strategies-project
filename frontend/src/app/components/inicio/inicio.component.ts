import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/servicios/api/api.service'


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  isAuthenticated:boolean = false;
  private userSub: Subscription;
  constructor(private authService: ApiService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user)=>{
      this.isAuthenticated =! user? false:true; 
    })
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }


  onLogout(){
    this.authService.logout();
  }
}
