import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="min-h-screen p-4 sm:p-6 lg:p-10">
    <div class="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.15fr_.85fr]">
      <section class="glass noise relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,.18),transparent_30%)]"></div>
        <div class="relative">
          <span class="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200">نسخه دمو / داده ماک سنگین</span>
          <h1 class="mt-6 max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl">
            سامانه ساخت‌یافتهٔ تعریف، نقد و اجرای مسائل و ایده‌های ایران
          </h1>
          <p class="mt-5 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
            پنل راهبری برای مدیریت کاربران، نظام مسائل، گزارشات و تولید اجماع؛ پنل کاربری برای هویت، ایده، نقد، گروه، پیام و امنیت.
          </p>

          <div class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            @for (item of highlights; track item.title) {
              <div class="rounded-3xl border border-white/10 bg-slate-950/60 p-4">
                <div class="text-2xl">{{ item.icon }}</div>
                <h3 class="mt-3 text-sm font-semibold text-white">{{ item.title }}</h3>
                <p class="mt-2 text-xs leading-6 text-slate-400">{{ item.text }}</p>
              </div>
            }
          </div>

          <div class="mt-8 flex flex-wrap gap-3">
            <a routerLink="/admin" class="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-950">ورود راهبر</a>
            <a routerLink="/user" class="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white">ورود کاربر</a>
          </div>
        </div>
      </section>

      <section class="space-y-6">
        <div class="glass rounded-[2rem] p-6">
          <p class="text-xs text-slate-400">ورود سریع</p>
          <h2 class="mt-2 text-2xl font-bold text-white">پنل‌ها آماده دمو هستند</h2>
          <div class="mt-5 grid gap-4">
            <div class="rounded-3xl bg-white/5 p-4">
              <div class="flex items-center justify-between">
                <span class="text-slate-200">راهبری</span>
                <span class="rounded-full bg-brand-500/15 px-3 py-1 text-xs text-brand-200">admin / demo</span>
              </div>
              <p class="mt-3 text-sm leading-7 text-slate-300">مدیریت کاربران، محتوا، گزارشات و درخت مسائل کشور.</p>
            </div>
            <div class="rounded-3xl bg-white/5 p-4">
              <div class="flex items-center justify-between">
                <span class="text-slate-200">کاربر نخبه</span>
                <span class="rounded-full bg-cyan-500/15 px-3 py-1 text-xs text-cyan-200">user / demo</span>
              </div>
              <p class="mt-3 text-sm leading-7 text-slate-300">مشاهده و ویرایش هویت، ثبت ایده، نقد، دوستان، گروه و امنیت.</p>
            </div>
          </div>
        </div>

        <div class="glass rounded-[2rem] p-6">
          <p class="text-xs text-slate-400">وضعیت بارگذاری</p>
          <div class="mt-4 grid gap-3">
            @for (line of loadBars; track line.label) {
              <div>
                <div class="flex items-center justify-between text-sm text-slate-300">
                  <span>{{ line.label }}</span>
                  <b>{{ line.value }}%</b>
                </div>
                <div class="mt-2 h-2 rounded-full bg-slate-800">
                  <div class="h-2 rounded-full bg-gradient-to-r from-brand-500 via-cyan-400 to-emerald-400" [style.width.%]="line.value"></div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>
    </div>
  </div>
  `
})
export class AuthPageComponent {
  highlights = [
    { icon: '🏛️', title: 'راهبری', text: 'گزارش، پیام، محتوا و مدیریت نظام مسائل.' },
    { icon: '🧠', title: 'نخبگان', text: 'نظردهی، نقد، آپلود مستندات و امتیازدهی.' },
    { icon: '🌐', title: 'عمومی/اختصاصی', text: 'تنظیم سطح دسترسی برای هر ایده و موضوع.' },
    { icon: '📊', title: 'داده سنگین', text: 'ماک‌دیتای پرحجم، برای حس یک سامانه واقعی.' }
  ];
  loadBars = [
    { label: 'کاربران آنلاین', value: 64 },
    { label: 'نظرات در انتظار بررسی', value: 42 },
    { label: 'ایده‌های دارای اجماع', value: 81 }
  ];
}