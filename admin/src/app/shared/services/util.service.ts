import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { QueueFilter } from '../models/queueFilter';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private btnDisabled = new BehaviorSubject<boolean>(false);
  private btnDisabledObserve = this.btnDisabled.asObservable();

  private searchCalendarDate = new BehaviorSubject<string>('');
  private searchCalendarDateObserver = this.searchCalendarDate.asObservable();

  private showNav = new BehaviorSubject<boolean>(true);
  private showNavObserver = this.showNav.asObservable();

  private queueFilter = new BehaviorSubject<QueueFilter>(null);
  private queueFilterObserver = this.queueFilter.asObservable();

  constructor(
    private http: HttpClient,
    private ngxSpinnerService: NgxSpinnerService
  ) {}

  setBtnDisabled(param: boolean) {
    this.btnDisabled.next(param);
  }

  get btnDisableSubscrible() {
    return this.btnDisabledObserve;
  }

  setSearchCalendarDate(param: string) {
    this.searchCalendarDate.next(param);
  }

  get searchCalendarDateSubscription() {
    return this.searchCalendarDateObserver;
  }

  setShowNav(param: boolean) {
    this.showNav.next(param);
  }

  get showNavSubscription() {
    return this.showNavObserver;
  }

  setQueueFilter(param: QueueFilter) {
    this.queueFilter.next(param);
  }

  get queueFilterSubscription() {
    return this.queueFilterObserver;
  }

  get token() {
    const token = localStorage.getItem('tokenpub');

    return token;
  }

  get user() {
    const user = localStorage.getItem('userpub');

    return user;
  }

  public transFormBase64(file): any {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  public transFormFile(dataurl, filename) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  public uploadImage(file: File): Observable<string[]> {
    const image = new FormData();
    image.append('image', file, file.name);
    return this.http.post<string[]>(`${environment.url_upload}/one`, image);
  }

  showSpinner() {
    this.ngxSpinnerService.show();
  }

  hideSpinner() {
    setTimeout(() => {
      /** spinner ends after 1 seconds */
      this.ngxSpinnerService.hide();
    }, 1000);
  }
}
