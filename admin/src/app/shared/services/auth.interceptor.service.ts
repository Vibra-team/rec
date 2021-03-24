import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { UtilService } from './util.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const utilService = this.injector.get(UtilService);

    if (utilService.token) {
      const authRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${utilService.token}` },
      });
      return next.handle(authRequest);
    } else {
      return next.handle(request);
    }
  }
}
