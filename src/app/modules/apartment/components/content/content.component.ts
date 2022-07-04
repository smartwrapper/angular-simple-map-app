import { Component, OnInit, ViewChild, ElementRef, 
  AfterViewInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Map, NavigationControl, Marker, LngLatBoundsLike } from 'maplibre-gl';
import { MapService } from '../../services/map.service';
import { replaceLocation } from '../../state/apartment.action';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() select = new EventEmitter<number>();

  map: Map | undefined;
  markers: Marker[] = [];
  isOneMarkerOnly = false;
  isClickFromRoot = false;
  selectedIdGeocode: any;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(
    private router: Router,
    private mapService: MapService,
    private store: Store,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.map?.remove();
  }

  showMap(idGeocodes: Array<any>) {
    const initialState = this.mapService.calcMapInitial(idGeocodes);

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

    let controlOption = {
      showCompass: true,
      showZoom: true,
      visualizePitch: false,
    }
    this.map.addControl(new NavigationControl(controlOption), 'top-right');

    this.addNewMarkers(idGeocodes);

    this.map.on('click', (e) => {
      if (this.isClickFromRoot) {
        this.isClickFromRoot = false;
        return;
      }
      if (!this.isOneMarkerOnly) return;
      
      let idGeocode = {
        id: this.selectedIdGeocode.id,
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng
      };
      this.store.dispatch(replaceLocation(idGeocode));
    });
  }

  addNewMarkers(idGeocodes: Array<any>) {
    if (!this.map)
      return;

    // remove previous markers
    this.markers.forEach(marker => marker.remove());

    let srcImagePath: string;
    if (idGeocodes.length == 1) {
      srcImagePath = './assets/images/map-circle-blue.svg';
      this.isOneMarkerOnly = true;
      this.selectedIdGeocode = idGeocodes[0];
    } else {
      srcImagePath = './assets/images/map-circle-red.svg';
      this.isOneMarkerOnly = false;
    }

    const initialState = this.mapService.calcMapInitial(idGeocodes);
    let maxLngDistance = 0, maxLatDistance = 0;
    for (let idGeocode of idGeocodes) {
      this.addNewMarker(idGeocode, srcImagePath);

      let lngDistance = Math.abs(idGeocode.longitude - initialState.lng);
      maxLngDistance = Math.max(maxLngDistance, lngDistance);

      let latDistance = Math.abs(idGeocode.latitude - initialState.lat);
      maxLatDistance = Math.max(maxLatDistance, latDistance);
    }

    maxLngDistance += 0.005;
    maxLatDistance += 0.005;
    let bbox: LngLatBoundsLike = [
      initialState.lng - maxLngDistance,
      initialState.lat - maxLatDistance,
      initialState.lng + maxLngDistance,
      initialState.lat + maxLatDistance
    ];
    this.map.fitBounds(bbox);
  }

  addNewMarker(idGeocode: any, srcImagePath: string) {
    if (!this.map)
      return;

    let element = document.createElement("img");
    element.src = srcImagePath;
    if (!this.isOneMarkerOnly) {
      element.addEventListener('click', (event) => {
        this.isClickFromRoot = true;
        let url = '/apartment/' + idGeocode.id;
        this.router.navigate([url]);
        this.select.emit(idGeocode.id);
      });
    }

    let marker = new Marker({element: element});
    marker.setLngLat([idGeocode.longitude, idGeocode.latitude]).addTo(this.map);
    this.markers.push(marker);
  }

}
