import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { FooterRoutingModule } from './footer-routing.module';



@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    FooterRoutingModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
