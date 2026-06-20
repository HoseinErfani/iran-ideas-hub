import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainMenuComponent } from './main-menu.component';

@Component({
  selector: 'app-user-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainMenuComponent],
  template: `
    <app-main-menu [menu]="menu">
      <router-outlet />
    </app-main-menu>
  `,
})
export class UserShellComponent {
  menu = [
    { path: '/user/dashboard', label: 'داشبورد', badge: '01' },
    { path: '/user/profile', label: 'هویت و سطح', badge: '02' },
    { path: '/user/inbox', label: 'صندوق پیام', badge: '03' },
    { path: '/user/issues', label: 'نظام مسائل', badge: '04' },
    { path: '/user/review', label: 'نقد و بررسی', badge: '05' },
    { path: '/user/friends', label: 'دوستان و گروه', badge: '06' },
    { path: '/user/security', label: 'امنیت حساب', badge: '07' },
  ];
}
