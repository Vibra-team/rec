import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';

import { QueueClipsRoutingModule } from './queue-clips-routing.module';
import { QueueClipsComponent } from './queue-clips.component';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { ButtonModule } from 'primeng/button';
import { ModalOfSharingComponent } from './components/modal-of-sharing/modal-of-sharing.component';


@NgModule({
  declarations: [
    QueueClipsComponent,
    ModalOfSharingComponent,
  ],
  imports: [
    CommonModule,
    QueueClipsRoutingModule,
    DialogModule,
    PaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    PrimengModule,
    ButtonModule,
  ],
  providers: [
    DatePipe,
  ]
})
export class QueueClipsModule { }
