import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
})
export class SocialMediaComponent implements OnInit {
  public navigationComponent = 'create';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigation() {
    if (this.navigationComponent === 'create') {
      this.router.navigate(['/midia-social/new']);
    }

    if (this.navigationComponent === 'list') {
      this.router.navigate(['/midia-social']);
    }
  }

  onActivate($event) {
    if ($event instanceof ListComponent) {
      this.navigationComponent = 'create';
    }

    if ($event instanceof FormComponent) {
      this.navigationComponent = 'list';
    }
  }
}
