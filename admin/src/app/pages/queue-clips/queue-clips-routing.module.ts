import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueueClipsComponent } from './queue-clips.component';

const routes: Routes = [
  {
    path: '',
    component: QueueClipsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueueClipsRoutingModule { }
