import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import {Router} from '@angular/router'


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor( private router:Router) { }

  opened = false;

  ngOnInit(): void {
  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

}
