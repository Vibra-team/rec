import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../../pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'edicao',
        loadChildren: () =>
          import('../../pages/edicao/edicao.module').then(
            (m) => m.EdicaoModule
          ),
      },
      {
        path: 'queue-clips',
        loadChildren: () =>
          import('../../pages/queue-clips/queue-clips.module').then(
            (m) => m.QueueClipsModule
          ),
      },
      {
        path: 'campaigns',
        loadChildren: () =>
          import('../../pages/campaigns/campaigns.module').then(
            (m) => m.CampaignsModule
          ),
      },
      {
        path: 'gerenciamento-canais',
        loadChildren: () =>
          import(
            '../../pages/channel-management/channel-management.module'
          ).then((m) => m.ChannelManagementModule),
      },
      {
        path: 'upload',
        loadChildren: () =>
          import('../../pages/upload/upload.module').then(
            (m) => m.UploadModule
          ),
      },
      {
        path: 'midia-social',
        loadChildren: () =>
          import('../../pages/social-media/social-media.module').then(
            (m) => m.SocialMediaModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
