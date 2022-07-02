import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Apartment } from '../models/apartment.model';

@Injectable({ providedIn: 'root' })
export class ApartmentService {
  constructor(private http: HttpClient) {}

  getApartment(): Observable<Apartment> {
    return this.http
      .get<{ apartment: Apartment }>(
        // 'https://app.smartapartmentdata.com/List/json/listItems.aspx?listID=5363950&token=5AE7DFB40500DDC03BC84BD3F0A8AC0F18784B1E&receipt=undefined'
        './assets/data.json'
      )
      .pipe(
        tap(apartment => console.log(apartment)),
        catchError(this.handleError('getApartment', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
