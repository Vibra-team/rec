import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BtnLogoutComponent } from './components/btn-logout/btn-logout.component';

@NgModule({
  declarations: [BtnLogoutComponent],
  imports: [CommonModule],
  exports: [BtnLogoutComponent],
  providers: [],
})
export class SharedModule {}
