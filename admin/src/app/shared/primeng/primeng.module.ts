import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    TabViewModule,
    MultiSelectModule,
    ToastModule,
    SliderModule,
    CheckboxModule,
    DropdownModule,
    CalendarModule,
    InputSwitchModule,
    TableModule,
    PaginatorModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class PrimengModule {}
