import { Component } from '@angular/core';
import { StatCardComponent } from '../../../shared/components/stat-card.component';
import { ChartCardComponent } from '../../../shared/components/chart-card.component';

@Component({
  selector: 'app-user-dashboard-page',
  standalone: true,
  imports: [StatCardComponent, ChartCardComponent],
  template: `
  <div class="space-y-6">
    <div class="grid gap-4 xl:grid-cols-4">
      @for (item of stats; track item.label) {
        <app-stat-card [label]="item.label" [value]="item.value" [icon]="item.icon" [hint]="item.hint" />
      }
    </div>

    <div class="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
      <section class="glass rounded-3xl p-5">
        <h3 class="text-lg font-bold text-white">خلاصه هویت و مشارکت</h3>
        <div class="mt-5 grid gap-4 md:grid-cols-2">
          <div class="rounded-3xl bg-white/5 p-5">
            <p class="text-xs text-slate-400">هویت</p>
            <h4 class="mt-2 text-2xl font-bold text-white">حسین رضایی</h4>
            <p class="mt-2 text-sm text-slate-300">نخبه 2 / تایید هویت: کامل</p>
          </div>
          <div class="rounded-3xl bg-white/5 p-5">
            <p class="text-xs text-slate-400">مسیر رشد</p>
            <h4 class="mt-2 text-2xl font-bold text-white">ارتقا سطح</h4>
            <p class="mt-2 text-sm text-slate-300">مدارک جدید و نظرات تخصصی ثبت شده است.</p>
          </div>
        </div>
      </section>
      <app-chart-card title="تعامل هفتگی" eyebrow="کاربر" subtitle="۷ روز اخیر" [items]="activity"></app-chart-card>
    </div>
  </div>
  `
})
export class UserDashboardPageComponent {
  stats = [
    { label: 'ایده‌ها', value: '142', icon: '💡', hint: 'آخرین ویرایش: امروز' },
    { label: 'کامنت‌ها', value: '1,028', icon: '💬', hint: '۱۸ پاسخ در انتظار' },
    { label: 'دوستان', value: '86', icon: '👥', hint: '۳ گروه فعال' },
    { label: 'اعتماد سامانه', value: '92%', icon: '🛡️', hint: 'مدارک کامل و معتبر' }
  ];
  activity = [
    { label: 'ایده', value: 74 },
    { label: 'نقد', value: 63 },
    { label: 'پاسخ', value: 88 },
    { label: 'آپلود', value: 51 }
  ];
}