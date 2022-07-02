import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SidebarComponent } from './sidebar.component';

import { StoreModule } from '@ngrx/store';
import { apartmentReducer } from '../../state/apartment.reducer';


@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forRoot({ apartment: apartmentReducer }),
    HttpClientModule
  ],
  exports: [
    SidebarComponent,
  ],
})
export class SidebarModule { }
