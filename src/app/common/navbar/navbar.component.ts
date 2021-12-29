import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  sitelanguage: any = 'English';

  siteLocale: any;

  isLoggedIn = false;
  firstName = '';
  isVendor = false;
  window = window;

  languagelist = [
    { code: 'en', label: 'English' },
    { code: 'ur', label: 'Urdu' },
  ];
  constructor(public router: Router) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    if (token && user) {
      this.isLoggedIn = true;
      this.firstName = JSON.parse(user).firstName;
      this.isVendor = JSON.parse(user).role == 'vendor' ? true : false;
    }
    this.siteLocale = window.location.pathname.split('/login')[1];
    this.sitelanguage = this.languagelist.find(
      (f) => f.code == this.siteLocale
    )?.label;
  }
  logOut() {
    localStorage.clear();
    window.location.reload();
    // this.router.navigateByUrl('login');
  }
}
