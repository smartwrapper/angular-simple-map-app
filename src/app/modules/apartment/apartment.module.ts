import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ApartmentComponent } from './apartment.component';
import { ApartmentRoutingModule } from './apartment-routing.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { ContentModule } from './components/content/content.module';

import { StoreModule } from '@ngrx/store';
import { apartmentReducer } from './state/apartment.reducer';


@NgModule({
  declarations: [
    ApartmentComponent
  ],
  imports: [
    CommonModule,
    ApartmentRoutingModule,
    SidebarModule,
    ContentModule,
    StoreModule.forRoot({ apartment: apartmentReducer }),
    HttpClientModule
  ],
  exports: [
    ApartmentComponent
  ],
})
export class ApartmentModule { }
