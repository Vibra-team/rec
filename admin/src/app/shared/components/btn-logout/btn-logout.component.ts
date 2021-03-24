import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-logout',
  templateUrl: './btn-logout.component.html',
  styleUrls: ['./btn-logout.component.scss'],
})
export class BtnLogoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
