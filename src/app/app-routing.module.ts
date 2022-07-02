import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/apartment/apartment.module')
      .then(mod => mod.ApartmentModule)
  },
  {
    path: 'apartment',
    loadChildren: () => import('./modules/apartment/apartment.module')
      .then(mod => mod.ApartmentModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
