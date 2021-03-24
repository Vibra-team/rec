import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { SocialMediaComponent } from './social-media.component';

const routes: Routes = [
  {
    path: '',
    component: SocialMediaComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'new',
        component: FormComponent,
      },
      {
        path: 'edit/:id',
        component: FormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialMediaRoutingModule {}
