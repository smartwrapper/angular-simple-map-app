import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { ContentComponent } from './content.component';
import { apartmentReducer } from '../../state/apartment.reducer';


@NgModule({
  declarations: [
    ContentComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forRoot({ apartment: apartmentReducer }),
  ],
  exports: [
    ContentComponent,
  ],
})
export class ContentModule { }
