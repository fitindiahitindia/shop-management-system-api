import { Component, NgZone } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { ProductService } from './services/product.service';
import { Chart } from 'chart.js/auto';
import { DialogService } from './services/dialog.service';
import { Router } from '@angular/router';
declare var window: any
export interface Tile{
  color:string;
  text:string;
  cols:number;
  rows:number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SMS';
  constructor(private _product:ProductService, public _dialog:DialogService,private ngZone: NgZone,private router:Router){
  }
  reloadUser(){
    this._product.reloadUser();
  }
  
  ngOnInit(){
    
  }
 
}
