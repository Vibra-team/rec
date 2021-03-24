import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { QueueClipPaginate } from '../models/queue-clip';
import { QueueFilter } from '../../../shared/models/queueFilter';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QueueClipService {

  constructor(
    private http: HttpClient,
  ) { }

  public getQueueClipList(pagination: { page: number, total: number, quantity: number }, filter?: QueueFilter): Observable<QueueClipPaginate> {
    let params = new HttpParams();
    if (filter && filter.status) {
      params = params.append('status', String(filter.status));
    }
    if (filter && filter.channel) {
      params = params.append('idchannel', String(filter.channel));
    }
    if (filter && filter.searchDate) {
      params = params.append('CreateAt', String(filter.searchDate));
    }
    return this.http.get<QueueClipPaginate>(`${environment.url_rec}/clip/${pagination.page}/${pagination.quantity}`, { params: params })
      .pipe(
        map(value => {
          value.result.map(data => {

            data.length = data.length.toString();
            data.length = data.length.replace('.', ':');
            const temp = data.length.split(':');

            if (!!temp[1] && temp[1].length < 2) {
              data.length = `${temp[0]}:${temp[1]}0`;
            }
          });
          return value;
        })
      );
  }

  public downloadClip(idClip: number): Observable<any> {
    console.log('idClip', idClip);
    return this.http.get<any>(
      `${environment.url_rec}/clip/download/${idClip}`
    );
  }
}
