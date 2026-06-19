import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  template: `
    <div class="glass rounded-3xl p-8 text-center">
      <div class="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-white"></div>
      <h3 class="mt-5 text-xl font-bold text-white">{{ title }}</h3>
      <p class="mt-2 text-sm text-slate-300">{{ subtitle }}</p>
    </div>
  `
})
export class LoadingScreenComponent {
  @Input() title = 'در حال بارگذاری';
  @Input() subtitle = 'چند لحظه صبر کنید...';
}