import { UtilService } from './util.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { ToastService } from './toast.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {
  constructor(private zone: NgZone, private injector: Injector) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const router = this.injector.get(Router);
      const toast = this.injector.get(ToastService);
      const utilService = this.injector.get(UtilService);

      this.zone.run(() => {
        switch (errorResponse.status) {
          case 401:
            localStorage.removeItem('userpub');
            localStorage.removeItem('tokenpub');
            toast.message('error', 'Erro', 'Seu token expirou');
            utilService.setBtnDisabled(false);
            router.navigate(['/login']);
            break;
          default:
            toast.message('error', 'Erro', 'Ocorreu um erro');
            utilService.setBtnDisabled(false);
            break;
        }
      });
    }
    super.handleError(errorResponse);
  }
}
