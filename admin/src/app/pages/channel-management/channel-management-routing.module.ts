import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChannelListComponent } from './components/channel-list/channel-list.component';
import { ChannelFormComponent } from './components/channel-form/channel-form.component';

const routes: Routes = [
  {
    path: '',
    component: ChannelListComponent,
  },
  {
    path: 'edit/:id',
    component: ChannelFormComponent,
  },
  {
    path: 'new',
    component: ChannelFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChannelManagementRoutingModule {}
