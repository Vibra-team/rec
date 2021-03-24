import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';
import { NewUploadComponent } from './components/new-upload/new-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';


@NgModule({
  declarations: [
    UploadComponent,
    NewUploadComponent,
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
  ]
})
export class UploadModule { }
