import { createAction, props } from '@ngrx/store';
import { Apartment } from '../models/apartment.model';

export const retrievedApartment = createAction(
  '[Sidebar/API] Retrieve Apartment Success',
  props<{ apartment: Apartment }>()
);

export const replaceLocation = createAction(
  '[Content] Replace location',
  props<{ id: number, latitude: number, longitude: number }>()
);
