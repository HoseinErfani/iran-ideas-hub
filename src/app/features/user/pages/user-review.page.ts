import { Component } from '@angular/core';

@Component({
  selector: 'app-user-review-page',
  standalone: true,
  template: `
  <div class="grid gap-6 xl:grid-cols-[.95fr_1.05fr]">
    <section class="glass rounded-3xl p-5">
      <h3 class="text-2xl font-bold text-white">نقد و بررسی ایده‌های دیگران</h3>
      <div class="mt-5 space-y-3">
        @for (idea of ideas; track idea.title) {
          <div class="rounded-3xl bg-white/5 p-4">
            <div class="flex items-center justify-between gap-3">
              <h4 class="font-semibold text-white">{{ idea.title }}</h4>
              <span class="rounded-full bg-brand-500/15 px-3 py-1 text-xs text-brand-200">{{ idea.score }} امتیاز</span>
            </div>
            <p class="mt-2 text-sm leading-7 text-slate-300">{{ idea.summary }}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <button class="rounded-2xl bg-white/5 px-4 py-2 text-xs text-white">کامنت</button>
              <button class="rounded-2xl bg-white/5 px-4 py-2 text-xs text-white">درخواست اصالت</button>
              <button class="rounded-2xl bg-white/5 px-4 py-2 text-xs text-white">ایده‌های مشابه</button>
            </div>
          </div>
        }
      </div>
    </section>

    <section class="glass rounded-3xl p-5">
      <h4 class="text-lg font-bold text-white">نتیجه بررسی اصالت</h4>
      <div class="mt-5 space-y-4">
        <div class="rounded-3xl bg-white/5 p-5">
          <p class="text-xs text-slate-400">شباهت مفهومی</p>
          <div class="mt-3 h-2 rounded-full bg-slate-800"><div class="h-2 w-[78%] rounded-full bg-gradient-to-r from-brand-500 to-cyan-400"></div></div>
        </div>
        <div class="rounded-3xl bg-white/5 p-5">
          <p class="text-xs text-slate-400">منابع بررسی‌شده</p>
          <ul class="mt-3 space-y-2 text-sm text-slate-300">
            <li>• موتور جستجو و خبرگزاری‌ها</li>
            <li>• مقالات و گزارش‌های تحلیلی</li>
            <li>• مدل‌های هوش مصنوعی و تطبیق معنایی</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
  `
})
export class UserReviewPageComponent {
  ideas = [
    { title: 'طرح کاهش مصرف آب در مدارس', score: 92, summary: 'راهکاری ترکیبی برای آموزش، ابزار کنترل و انگیزش مدارس.' },
    { title: 'سامانه پایش ترافیک لحظه‌ای', score: 87, summary: 'مدل داده‌محور برای مسیرهای پرتردد کلان‌شهرها.' },
    { title: 'بهینه‌سازی مصرف برق در صنایع', score: 95, summary: 'پیشنهادات مبتنی بر پیک بار، سنجش و زمان‌بندی هوشمند.' }
  ];
}