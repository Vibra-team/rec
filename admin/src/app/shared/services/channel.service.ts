import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Channel } from '../../shared/models/channel';
import { SocialMedia, SocialMediaEnum } from '../../shared/models/socialMedia';
import { Clip } from '../../shared/models/clip';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private http: HttpClient) { }

  public getChannelList(): Observable<Array<Channel>> {
    return this.http.get<Array<Channel>>(`${environment.url_rec}/channel`)
      .pipe(
        map((value, i) => {
          if (!value[i].image) {
            value[i].image = 'https://imagem.band.com.br/novahome/0a6735ad-3f65-47f7-8dce-02151b51682f.png'
          }
          return value;
        })
       );
  }


  public getSocialMediaChannels(socialMediaId: number): Observable<Array<SocialMedia>> {
    return this.http.get<Array<SocialMedia>>(`${environment.url_rec}/SocialMediaChannel/${socialMediaId}`);
  }

  public saveVideoEdition(payload: Clip): Observable<any> {
    return this.http.post<any>(`${environment.url_rec}/clip`, payload);
  }

  public uploadVideo(clipId: number, videoFile: File) : Observable<any> {
    const video = new FormData();
    video.append('file', videoFile, videoFile.name);
    return this.http.post<any>(`${environment.url_rec}/clip/upload/${clipId}`, video);
  }

  public getAllSelects(): Observable<Array<any>> {
    return forkJoin([
      this.getChannelList(),
      this.getSocialMediaChannels(SocialMediaEnum.Facebook),
      this.getSocialMediaChannels(SocialMediaEnum.Twitter),
      this.getSocialMediaChannels(SocialMediaEnum.Uol),
      this.getSocialMediaChannels(SocialMediaEnum.Youtube),
    ]);
  }

  public update(id: number, clip: Clip): Observable<any> {
    console.log('clip', clip);
    return this.http.put(`${environment.url_rec}/ClipSocialMedia/${id}`, clip.socialMedias);
  }
}
