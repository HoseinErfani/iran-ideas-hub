import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainMenuComponent } from './main-menu.component';

@Component({
  selector: 'app-admin-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainMenuComponent],
  template: `
    <app-main-menu [menu]="menu">
      <router-outlet />
    </app-main-menu>
  `,
})
export class AdminShellComponent {
  menu = [
    { path: 'dashboard', label: 'داشبورد', badge: '01' },
    { path: 'users', label: 'مدیریت کاربران', badge: '02' },
    { path: 'issues', label: 'نظام مسائل', badge: '03' },
    { path: 'reports', label: 'گزارشات', badge: '04' },
    { path: 'communication', label: 'ایمیل و پیامک', badge: '05' },
    { path: 'pages', label: 'صفحات ثابت', badge: '06' },
    { path: 'news', label: 'اخبار', badge: '07' },
    { path: 'gallery', label: 'گالری', badge: '08' },
  ];
}
