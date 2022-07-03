import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import { selectApartment } from './state/apartment.selector';
import { retrievedApartment } from './state/apartment.action';
import { ApartmentService } from './services/apartment.service';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss']
})
export class ApartmentComponent implements OnInit {
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

    this.apartmentService
      .getApartment()
      .subscribe((apartment) => this.store.dispatch(retrievedApartment({ apartment })));

    this.router.routeReuseStrategy.shouldReuseRoute = () => true;
  }

  onSelect(recordId: number) {
    this.selectedRecordId = recordId;
  }
}
