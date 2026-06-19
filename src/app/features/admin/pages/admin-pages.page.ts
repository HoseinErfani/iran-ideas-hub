import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-pages-page',
  standalone: true,
  template: `
  <div class="grid gap-6 xl:grid-cols-[.8fr_1.2fr]">
    <section class="glass rounded-3xl p-5">
      <p class="text-xs text-slate-400">مدیریت صفحات ثابت</p>
      <h3 class="mt-2 text-2xl font-bold text-white">افزودن صفحه جدید</h3>
      <div class="mt-5 space-y-3">
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">مسیر صفحه</div>
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">تیتر و ساب‌تیتر</div>
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300 h-48">ادیتور محتوا و استایل</div>
        <button class="rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white">ذخیره</button>
      </div>
    </section>

    <section class="glass rounded-3xl p-5">
      <h4 class="text-lg font-bold text-white">پیش‌نمایش صفحه «تماس با ما»</h4>
      <div class="mt-5 rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p class="text-sm text-slate-400">راه‌های ارتباطی</p>
        <h3 class="mt-2 text-3xl font-black text-white">تماس با ما</h3>
        <p class="mt-4 max-w-2xl text-sm leading-8 text-slate-300">
          این صفحه می‌تواند با هویت بصری اختصاصی برای کاربران عمومی ساخته شود؛ با فرم، نقشه، ساعات پاسخ‌گویی و لینک شبکه‌ها.
        </p>
      </div>
    </section>
  </div>
  `
})
export class AdminPagesPageComponent {}