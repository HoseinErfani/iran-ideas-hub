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
    { path: 'dashboard', label: 'داشبورد', badge: '01' },
    { path: 'profile', label: 'هویت و سطح', badge: '02' },
    { path: 'inbox', label: 'صندوق پیام', badge: '03' },
    { path: 'issues', label: 'نظام مسائل', badge: '04' },
    { path: 'review', label: 'نقد و بررسی', badge: '05' },
    { path: 'friends', label: 'دوستان و گروه', badge: '06' },
    { path: 'security', label: 'امنیت حساب', badge: '07' },
  ];
}
