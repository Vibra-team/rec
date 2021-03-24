import { Component, OnInit } from '@angular/core';
import { ChannelManagementService } from '../../services/channel-management.service';
import { Router } from '@angular/router';

import {Channel, ChannelPaginate} from '../../../../shared/models/channel';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss']
})
export class ChannelListComponent implements OnInit {

  public isLoading = false;

  public channelsList: Channel[] = [];

  public paginate: { pageIndex: number, pageSize: number, total: number } = {
    pageIndex: 0,
    pageSize: 10,
    total: 0,
  };

  public ChannelType = '';

  constructor(
    private channelManagementService: ChannelManagementService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getChannelList();
  }

  createNewChannel(): void {
    this.router.navigate(['/gerenciamento-canais/new']);
  }

  getChannelList(): void {
    this.isLoading = true;

    this.channelManagementService
      .getChannelList(this.paginate, this.ChannelType)
      .subscribe((response: ChannelPaginate) => {
        const {
          result,
          pageIndex,
          pageSize,
          total,
        } = response;

        this.paginate = {
          pageIndex,
          pageSize,
          total,
        };

        this.channelsList = result;
        this.isLoading = false;
      });
  }

  handleChange(event): void {

    this.ChannelType = event.index !== 0 ? event.index : '';
    this.paginate = {
      pageIndex: 0,
      pageSize: 10,
      total: 0,
    };
    this.getChannelList();
  }

  handleChangePaginate(event: { first: number, rows: number, page: number, pageCount: number }): void {

    this.paginate.pageIndex = event.page;
    this.paginate.pageSize = event.rows;
    this.channelManagementService
      .getChannelList(this.paginate, this.ChannelType)
      .subscribe((response: ChannelPaginate) => {
        const {
          result,
          pageIndex,
          pageSize,
          total,
        } = response;

        this.paginate = {
          pageIndex,
          pageSize,
          total,
        };

        this.channelsList = result;
        this.isLoading = false;
      });
  }

}
