import { Injectable } from '@angular/core';
import { MapInitial } from '../models/map-initial.model';

@Injectable({ providedIn: 'root' })
export class MapService {
  constructor() {}

  getLatLonCenterFromGeom(coords: Array<any>) {
    const arrAvg = (arr: Array<number>) => arr.reduce((a: number, b: number) => a + b, 0) / arr.length;

    const centerLat = arrAvg(coords.map(c=>c.latitude));
    const centerLon = arrAvg(coords.map(c=>c.longitude));

    if (isNaN(centerLat)|| isNaN(centerLon))
      return null;
    else return {latitude: centerLat, longitude: centerLon};
  }

  calcMapInitial(geocodes: Array<any>) {
    const center = this.getLatLonCenterFromGeom(geocodes);
    let result = new MapInitial();
    if (center) {
      result.lat = center.latitude;
      result.lng = center.longitude;
    }
    return result;
  }

}
