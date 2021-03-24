import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Channel } from '../../../../shared/models/channel';



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit, OnChanges {

  @Input()
  public list: Channel[];

  public newList: Channel[] = [];

  public layout = 'list';

  constructor(
    private router: Router,
  ) {  }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.newList = changes.list.currentValue;
  }

  changeHandlerLayout(dv): void {
    this.layout = dv.layout;
  }

  routeToEdit(id: string): void {
    this.router.navigate([`/gerenciamento-canais/edit/${id}`]);
  }

}
