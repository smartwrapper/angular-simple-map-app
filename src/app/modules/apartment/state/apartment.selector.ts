import { createFeatureSelector } from '@ngrx/store';
import { Apartment } from '../models/apartment.model';

export const selectApartment = createFeatureSelector<Apartment>('apartment');
