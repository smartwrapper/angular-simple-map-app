import { Component, OnInit, ViewChild, ElementRef, 
  AfterViewInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Map, NavigationControl, Marker, LngLatBoundsLike } from 'maplibre-gl';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() select = new EventEmitter<number>();

  map: Map | undefined;
  markers: Marker[] = [];

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(private mapService: MapService) { }

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
  }

  addNewMarkers(idGeocodes: Array<any>) {
    if (!this.map)
      return;

    // remove previous markers
    this.markers.forEach(marker => marker.remove());

    const initialState = this.mapService.calcMapInitial(idGeocodes);

    let srcImagePath = './assets/images/map-circle-red.svg';
    let draggable = false;
    if (idGeocodes.length == 1) {
      srcImagePath = './assets/images/map-circle-blue.svg';
      draggable = true;
    }
    let maxLngDistance = 0, maxLatDistance = 0;
    for (let idGeocode of idGeocodes) {
      let element = document.createElement("img");
      element.src = srcImagePath;
      element.addEventListener('click', (event) => {
        this.select.emit(idGeocode.id);
      });

      let marker = new Marker({element: element, draggable: draggable});
      marker.setLngLat([idGeocode.longitude, idGeocode.latitude]).addTo(this.map);
      this.markers.push(marker);

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

}
