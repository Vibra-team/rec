import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignsComponent } from './campaigns.component';
import { CampaignEditorComponent } from './components/campaign-editor/campaign-editor.component';

const routes: Routes = [
  {
    path: '',
    component: CampaignsComponent,
  },{
    path: ':id',
    component: CampaignEditorComponent,
  },{
    path: 'new',
    component: CampaignEditorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
