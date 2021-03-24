import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';

import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { SocialMediaRoutingModule } from './social-media-routing.module';
import { SocialMediaComponent } from './social-media.component';

@NgModule({
  declarations: [SocialMediaComponent, ListComponent, FormComponent],
  imports: [
    CommonModule,
    SocialMediaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
  ],
})
export class SocialMediaModule {}
