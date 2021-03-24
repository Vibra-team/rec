import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

export interface Toast {
  message(severity: string, summary: string, detail: string);
}

@Injectable({
  providedIn: 'root',
})
export class ToastService implements Toast {
  constructor(private messageService: MessageService) {}

  message(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }
}
