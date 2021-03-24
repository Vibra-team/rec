import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EdicaoComponent } from './edicao.component';

const routes: Routes = [
  {
    path: '',
    component: EdicaoComponent,
  },{
    path: ':channelType/:id',
    component: EdicaoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdicaoRoutingModule {}
