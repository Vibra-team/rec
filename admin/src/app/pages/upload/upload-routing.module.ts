import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewUploadComponent } from './components/new-upload/new-upload.component';
import { UploadComponent } from './upload.component';

const routes: Routes = [{
  path: '',
  component: UploadComponent,
  children: [{
    path: '',
    redirectTo: 'new',
  }, {
    path: 'new',
    component: NewUploadComponent
  }, {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'new',
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
