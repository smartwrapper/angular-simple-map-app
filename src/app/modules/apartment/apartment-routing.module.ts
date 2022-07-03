import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentComponent } from './apartment.component';

const routes: Routes = [
  {
    path: '',
    component: ApartmentComponent
  },
  {
    path: ':id',
    component: ApartmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentRoutingModule { }
