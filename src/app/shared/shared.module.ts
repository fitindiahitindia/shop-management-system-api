import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components/components.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoaderComponent } from './widgets/loader/loader.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SnackbarComponent } from './widgets/snackbar/snackbar.component';
import { BillComponent } from './widgets/bill/bill.component';

@NgModule({
  declarations: [
    ComponentsComponent,
    WidgetsComponent,
    FooterComponent,
    NotfoundComponent,
    HeaderComponent,
    SnackbarComponent,
    // BillComponent
  ],
  imports: [
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule
  ],
  exports:[
    FooterComponent
  ]
})
export class SharedModule { }
