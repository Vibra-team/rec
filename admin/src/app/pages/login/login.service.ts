import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) { }

  geraToken({ username, password }): Observable<any> {
    let credencial =
    {
      "username": username,
      "password": password
    }
    return this.http.post<any>(`${environment.url_auth}`, credencial);
  }
}
