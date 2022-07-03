import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-detail',
  templateUrl: './sidebar-detail.component.html',
  styleUrls: ['./sidebar-detail.component.scss']
})
export class SidebarDetailComponent implements OnInit {
  @Input() record: any = null;
  @Input() selectedId = -1;
  @Output() select = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

}
