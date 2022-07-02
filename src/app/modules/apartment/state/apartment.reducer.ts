import { createReducer, on } from '@ngrx/store';

import { retrievedApartment } from './apartment.action';
import { Apartment } from '../models/apartment.model';

export const initialState: Apartment = new Apartment();

export const apartmentReducer = createReducer(
  initialState,
  on(retrievedApartment, (state, { apartment }) => apartment)
);
