import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Apartment } from '../../models/apartment.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() apartment: Apartment | null = new Apartment();
  @Input() selectedId = -1;
  @Output() select = new EventEmitter<number>();

  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  constructor() {}

  ngOnInit(): void {
    // setTimeout(() => {
    //   console.log('xxx - ', this.apartment);
    // }, 1000);
  }

  onSelect(recordId: number) {
    if (!this.collapsed) {
      this.toggleCollapsed();
    }
    
    this.select.emit(recordId);
  }
}
