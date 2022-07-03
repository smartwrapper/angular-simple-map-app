import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar.component';
import { FullnameCompanyPipe } from 'src/app/modules/shared/pipes/fullname-company.pipe';
import { SidebarDetailModule } from '../sidebar-detail/sidebar-detail.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SidebarComponent,
    FullnameCompanyPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarDetailModule
  ],
  exports: [
    SidebarComponent,
  ],
})
export class SidebarModule { }
