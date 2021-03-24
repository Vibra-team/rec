import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  public showNav: boolean = true;

  constructor(
    private utilService: UtilService,
  ) {}

  ngOnInit(): void {
    this.observerHideNav();
  }

  public observerHideNav(): void {
    this.utilService.showNavSubscription
      .subscribe((data) => {
        this.showNav = data;
      });
  }

  openClosedMenu(section: any) {
    return (section.open = !section.open);
  }
}
