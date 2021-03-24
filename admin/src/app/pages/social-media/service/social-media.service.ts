import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResultPaginate, SocialMidia } from '../models/social-midias.model';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  constructor(private http: HttpClient) {}

  public getSocialMedia({
    name = '',
    active = '',
    socialmedia = '',
    psize = '10',
    pindex = '0',
  }): Observable<ResultPaginate> {
    const formParams = new HttpParams()
      .append('Name', name)
      .append('Active', active)
      .append('SocialMedia', socialmedia)
      .append('Psize', psize)
      .append('Pindex', pindex);

    return this.http
      .get<ResultPaginate>(`${environment.url_rec}/SocialMedia`, {
        params: formParams,
      })
      .pipe(retry(3));
  }

  public getSocialMediaById(id: string): Observable<SocialMidia> {
    return this.http
      .get<SocialMidia>(`${environment.url_rec}/SocialMedia/${id}`)
      .pipe(retry(3));
  }

  public postSocialMediaById(form: SocialMidia): Observable<SocialMidia> {
    return this.http
      .post<SocialMidia>(`${environment.url_rec}/SocialMedia`, form)
      .pipe(retry(3));
  }

  public putSocialMediaById(
    id: string,
    form: SocialMidia
  ): Observable<SocialMidia> {
    return this.http
      .put<SocialMidia>(`${environment.url_rec}/SocialMedia/${id}`, form)
      .pipe(retry(3));
  }

  public deleteMidia(id: string): Observable<any> {
    return this.http
      .delete<any>(`${environment.url_rec}/SocialMedia/${id}`)
      .pipe(retry(3));
  }
}
