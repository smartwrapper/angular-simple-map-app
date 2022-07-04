import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import { selectApartment } from './state/apartment.selector';
import { retrievedApartment } from './state/apartment.action';
import { ApartmentService } from './services/apartment.service';
import { ContentComponent } from './components/content/content.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss']
})
export class ApartmentComponent implements OnInit, OnDestroy {
  @ViewChild(ContentComponent) child! : ContentComponent;

  subscription: Subscription = new Subscription();
  apartment$ = this.store.select(selectApartment);
  selectedRecordId = -1;

  constructor(
    private apartmentService: ApartmentService,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idParam = routeParams.get('id');
    if (idParam) {
      this.selectedRecordId = Number(idParam);
    }

    this.subscription = this.apartmentService.getApartment().subscribe((apartment) => {
      this.store.dispatch(retrievedApartment({ apartment }));

      const idGeocodes = this.apartmentService.getIdGeocodes(apartment);
      this.showMap(idGeocodes);
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSelect(recordId: number) {
    this.selectedRecordId = recordId;

    this.apartment$.subscribe((apartment) => {
      let idGeocodes = this.apartmentService.getIdGeocodes(apartment);
      if (recordId !== -1) {
        idGeocodes = idGeocodes.filter(record => record.id === recordId);
      }
      this.addNewMarkers(idGeocodes);
    });
  }

  showMap(geocodes: Array<any>) {
    this.child.showMap(geocodes);
  }

  addNewMarkers(geocodes: Array<any>) {
    this.child.addNewMarkers(geocodes);
  }
}
