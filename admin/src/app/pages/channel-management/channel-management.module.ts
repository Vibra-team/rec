import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelManagementRoutingModule } from './channel-management-routing.module';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';

import { ChannelListComponent } from './components/channel-list/channel-list.component';
import { ChannelFormComponent } from './components/channel-form/channel-form.component';
import { TableListComponent } from './components/table-list/table-list.component';


@NgModule({
  declarations: [ChannelListComponent, ChannelFormComponent, TableListComponent],
  imports: [
    CommonModule,
    ChannelManagementRoutingModule,
    PrimengModule,
    ReactiveFormsModule,
    TabViewModule,
    CardModule,
    DataViewModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    ToggleButtonModule,
    PaginatorModule,
    ProgressBarModule,
  ]
})
export class ChannelManagementModule { }
