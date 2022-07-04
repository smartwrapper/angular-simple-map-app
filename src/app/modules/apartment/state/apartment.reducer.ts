import { createReducer, on } from '@ngrx/store';

import { retrievedApartment, replaceLocation } from './apartment.action';
import { Apartment } from '../models/apartment.model';

export const initialState: Apartment = new Apartment();

export const apartmentReducer = createReducer(
  initialState,
  on(retrievedApartment, (state, { apartment }) => apartment),
  on(replaceLocation, (state, { id, latitude, longitude }) => {
    let nIndex = state.records.findIndex(record => record.propertyID === id);
    return {
      ...state,
      records: [
        ...state.records.slice(0, nIndex),
        {
          ...state.records[nIndex],
          geocode: {
            ...state.records[nIndex].geocode,
            Latitude: latitude,
            Longitude: longitude
          }
        },
        ...state.records.slice(nIndex + 1, state.records.length),
      ]
    };
  })
);
