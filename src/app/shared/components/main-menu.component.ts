import { Component, input, signal } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
export interface MenuItem{
  path: string;
  label: string;
  badge: string;
}
@Component({
  selector: 'app-main-menu',
  imports: [NgIf, RouterLink, RouterLinkActive, RouterOutlet, NgClass],
  template: `
    <div class="min-h-screen flex bg-slate-950 text-white relative">
      <div
        *ngIf="isMenuOpen()"
        (click)="isMenuOpen.set(false)"
        class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
      ></div>

      <aside
        [ngClass]="isMenuOpen() ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'"
        class="glass border-l lg:border-l-0 lg:border-r border-white/10 p-5 fixed lg:sticky top-0 right-0 h-screen w-[300px] z-50 lg:z-30 transition-transform duration-300 ease-in-out flex flex-col overflow-y-auto max-h-screen"
      >
        <button
          (click)="isMenuOpen.set(false)"
          class="lg:hidden self-end p-2 text-slate-400 hover:text-white mb-2"
        >
          ✕
        </button>

        <div class="rounded-3xl bg-white/5 p-5 gradient-border shrink-0">
          <p class="text-xs text-slate-300">پنل کاربری نخبه</p>
          <h1 class="mt-2 text-xl font-black text-white">از ایده تا نقد و اجرا</h1>
          <p class="mt-3 text-xs text-slate-400 leading-6">
            هویت‌سنجی، نمایش مسائل، ثبت ایده و نقد تخصصی.
          </p>
        </div>

        <nav class="mt-6 space-y-2 flex-1">
          @for (item of menu(); track item.path) {
            <a
              [routerLink]="[ item.path]"
              routerLinkActive="bg-cyan-500/20 text-white border-cyan-400/40"
              (click)="isMenuOpen.set(false)"
              class="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5"
            >
              <span>{{ item.label }}</span>
              <span class="text-xs text-slate-400">{{ item.badge }}</span>
            </a>
          }
        </nav>

        <div class="mt-6 rounded-3xl bg-slate-900/70 p-4 text-sm text-slate-300 shrink-0">
          <div class="flex items-center justify-between">
            <span>سطح فعلی</span>
            <span class="rounded-full bg-cyan-500/15 px-3 py-1 text-cyan-300 text-xs">نخبه 2</span>
          </div>
          <div class="mt-4 space-y-2 text-xs text-slate-400">
            <div class="flex justify-between">
              <span>ایده‌های من</span><b class="text-white">142</b>
            </div>
            <div class="flex justify-between">
              <span>نقدهای دریافتی</span><b class="text-white">1,028</b>
            </div>
            <div class="flex justify-between">
              <span>مشارکت در گروه</span><b class="text-white">86%</b>
            </div>
          </div>
        </div>
      </aside>

      <div class="w-full min-h-screen flex flex-col">
        <header class="glass sticky top-0 z-20 border-b border-white/10 px-4 py-4 sm:px-6">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <button
                (click)="isMenuOpen.set(!isMenuOpen())"
                class="lg:hidden p-2 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:text-white transition"
              >
                ☰
              </button>
              <div>
                <p class="text-xs text-slate-400">مسیر شخصی</p>
                <h2 class="text-lg font-bold text-white sm:text-xl">پنل کاربری</h2>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div class="hidden rounded-2xl bg-white/5 px-4 py-2 text-sm text-slate-300 sm:block">
                ورود دو مرحله‌ای فعال
              </div>
              <a
                routerLink="/auth"
                class="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950"
                >خروج</a
              >
            </div>
          </div>
        </header>

        <main class="flex-1 w-full  sm:p-6 min-w-0 space-y-6 max-w-[1400px] mx-auto p-4">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class MainMenuComponent {
  menu = input.required<MenuItem[]>();
  isMenuOpen = signal<boolean>(false);
}
