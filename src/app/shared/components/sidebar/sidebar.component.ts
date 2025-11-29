import { Component } from '@angular/core';
import { DrawerService } from 'src/app/services/drawer.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private drawerService: DrawerService) {}
 closeSideBar() {
  if(window.innerWidth >= 768){
    this.drawerService.open();
  }else{
    this.drawerService.close();
  }
}
}
