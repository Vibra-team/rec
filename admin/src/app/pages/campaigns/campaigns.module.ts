import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsComponent } from './campaigns.component';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CampaignEditorComponent } from './components/campaign-editor/campaign-editor.component';


@NgModule({
  declarations: [CampaignsComponent, CampaignEditorComponent],
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    PrimengModule,
    ReactiveFormsModule,
  ]
})
export class CampaignsModule { }
