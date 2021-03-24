import { NavComponent } from './../components/nav/nav.component';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './../components/header/header.component';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LayoutComponent,
    NavComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule,
  ],
  providers: [
    DatePipe,
  ]
})
export class LayoutModule { }
