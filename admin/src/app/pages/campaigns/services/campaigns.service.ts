import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campaign } from 'src/app/shared/models/campaign';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  constructor(
    private http: HttpClient,
  ) { }

  getCampaignsList(): Observable<Array<Campaign>> {
    return this.http.get<Array<Campaign>>(`${environment.url_rec}/campaign/channel`);
  }

  getCampaignsListByChannel(idChannel: number): Observable<Array<Campaign>> {
    return this.http.get<Array<Campaign>>(`${environment.url_rec}/campaign/channel/${idChannel}`);
  }

  getCampaignById(id: number): Observable<Campaign> {
    return this.http.get<Campaign>(`${environment.url_rec}/campaign/${id}`);
  }

  updateCampaign(id: number, campaign: Campaign): Observable<Campaign> {
    return this.http.put<Campaign>(`${environment.url_rec}/campaign/${id}`, campaign);
  }

  createCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(`${environment.url_rec}/campaign`, campaign);
  }
}
