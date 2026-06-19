import { Component } from '@angular/core';

@Component({
  selector: 'app-user-security-page',
  standalone: true,
  template: `
  <div class="grid gap-6 xl:grid-cols-[.95fr_1.05fr]">
    <section class="glass rounded-3xl p-5">
      <h3 class="text-2xl font-bold text-white">امنیت حساب</h3>
      <div class="mt-5 space-y-4">
        @for (item of settings; track item.title) {
          <div class="rounded-3xl bg-white/5 p-4">
            <div class="flex items-center justify-between gap-3">
              <div>
                <h4 class="font-semibold text-white">{{ item.title }}</h4>
                <p class="mt-1 text-sm text-slate-400">{{ item.text }}</p>
              </div>
              <span class="rounded-full px-3 py-1 text-xs" [class.bg-emerald-500/15]="item.on" [class.text-emerald-200]="item.on" [class.bg-white/5]="!item.on" [class.text-slate-300]="!item.on">{{ item.on ? 'فعال' : 'غیرفعال' }}</span>
            </div>
          </div>
        }
      </div>
    </section>

    <section class="glass rounded-3xl p-5">
      <h4 class="text-lg font-bold text-white">تنظیمات مهم</h4>
      <div class="mt-5 grid gap-3 sm:grid-cols-2">
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">ورود دو مرحله‌ای</div>
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">اعلان دستگاه جدید</div>
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">سیاست حریم خصوصی</div>
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">دستگاه‌های فعال</div>
      </div>
    </section>
  </div>
  `
})
export class UserSecurityPageComponent {
  settings = [
    { title: 'ورود دو مرحله‌ای', text: 'کد پیامکی برای ورودهای جدید', on: true },
    { title: 'اعلان ایمیل', text: 'اعلان فعالیت‌های مهم حساب', on: true },
    { title: 'جلسات فعال', text: 'نمایش و قطع نشست‌های مشکوک', on: false }
  ];
}