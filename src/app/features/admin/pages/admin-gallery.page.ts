import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-gallery-page',
  standalone: true,
  template: `
  <div class="space-y-6">
    <section class="glass rounded-3xl p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="text-xs text-slate-400">مدیریت گالری</p>
          <h3 class="text-2xl font-bold text-white">آلبوم‌ها و رسانه‌ها</h3>
        </div>
        <button class="rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white">آلبوم جدید</button>
      </div>
    </section>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      @for (album of albums; track album.title) {
        <article class="glass overflow-hidden rounded-3xl">
          <div class="h-44 bg-gradient-to-br"
               [class.from-brand-500]="album.gradient === 1" [class.to-cyan-400]="album.gradient === 1"
               [class.from-cyan-500]="album.gradient === 2" [class.to-emerald-400]="album.gradient === 2"
               [class.from-fuchsia-500]="album.gradient === 3" [class.to-amber-400]="album.gradient === 3"></div>
          <div class="p-5">
            <h4 class="text-lg font-bold text-white">{{ album.title }}</h4>
            <p class="mt-2 text-sm text-slate-300">{{ album.count }} فایل رسانه‌ای</p>
          </div>
        </article>
      }
    </div>
  </div>
  `
})
export class AdminGalleryPageComponent {
  albums = [
    { title: 'نشست آب و محیط‌زیست', count: 124, gradient: 1 },
    { title: 'گردهمایی نخبگان انرژی', count: 88, gradient: 2 },
    { title: 'پروژه‌های شهری و ترافیک', count: 203, gradient: 3 }
  ];
}