import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentComponent } from './apartment.component';
import { ApartmentRoutingModule } from './apartment-routing.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { ContentModule } from './components/content/content.module';

@NgModule({
  declarations: [
    ApartmentComponent
  ],
  imports: [
    CommonModule,
    ApartmentRoutingModule,
    SidebarModule,
    ContentModule
  ],
  exports: [
    ApartmentComponent
  ],
})
export class ApartmentModule { }
