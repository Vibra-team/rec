import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { retry } from 'rxjs/operators';
import {Channel, ChannelPaginate} from '../../../shared/models/channel';

@Injectable({
  providedIn: 'root'
})
export class ChannelManagementService {

  constructor(private http: HttpClient) { }

  getChannelList({pageIndex, pageSize}: {pageIndex: number, pageSize: number}, ChannelType?: any): Observable<ChannelPaginate> {
    return this.http.get<ChannelPaginate>(`${environment.url_rec}/Channel/${pageIndex}/${pageSize}?ChannelType=${ChannelType}`)
      .pipe(
        retry(3)
      );
  }

  getChannelById(id: string): Observable<Channel> {
    return this.http.get<Channel>(
      `${environment.url_rec}/Channel/${id}`
    ).pipe(
      retry(3)
    );
  }

  submitChannel(channel: Channel): Observable<Channel> {
    return this.http.post<Channel>(
      `${environment.url_rec}/Channel/`,
      channel
    ).pipe(
      retry(3)
    );
  }

  updateChannel(id: any, channel: Channel): Observable<Channel> {
    return this.http.put<Channel>(
      `${environment.url_rec}/Channel/${id}`,
      channel
    ).pipe(
      retry(3)
    );
  }
}
