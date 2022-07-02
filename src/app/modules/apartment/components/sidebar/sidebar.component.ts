import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectApartment } from '../../state/apartment.selector';
import { retrievedApartment } from '../../state/apartment.action';
import { ApartmentService } from '../../services/apartment.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  apartment$ = this.store.select(selectApartment);

  constructor(private apartmentService: ApartmentService, private store: Store) {}

  ngOnInit(): void {
    this.apartmentService
      .getApartment()
      .subscribe((apartment) => this.store.dispatch(retrievedApartment({ apartment })));
  }
}
