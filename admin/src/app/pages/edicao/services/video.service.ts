import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { VideoPaginate } from '../../../shared/models/video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private http: HttpClient,
  ) { }

  getVideoUrl(idChannel: number, date?: string): Observable<VideoPaginate> {
    const dateParam: string = date ? `/${date}` : '';
    return this.http.get<VideoPaginate>(`${environment.url_rec}/video/${idChannel}${dateParam}`);
  }

  getVideoUrlById(idChannel: number, id?: number): Observable<VideoPaginate> {
    return this.http.get<VideoPaginate>(`${environment.url_rec}/video/${idChannel}/detail/${id}`);
  }
}
