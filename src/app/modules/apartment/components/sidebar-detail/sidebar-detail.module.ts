import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarDetailComponent } from './sidebar-detail.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SidebarDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarDetailComponent
  ]
})
export class SidebarDetailModule { }
