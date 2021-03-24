import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';

import { PrimengModule } from './../../shared/primeng/primeng.module';
import { EdicaoRoutingModule } from './edicao-routing.module';
import { EdicaoComponent } from './edicao.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    EdicaoComponent,
    VideoPlayerComponent,
  ],
  imports: [
    CommonModule,
    EdicaoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    RouterModule,
    ButtonModule,
    TooltipModule,
    CalendarModule,
  ],
})
export class EdicaoModule { }
