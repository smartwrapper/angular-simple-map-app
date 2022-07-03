import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',   redirectTo: '/apartment', pathMatch: 'full'
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
