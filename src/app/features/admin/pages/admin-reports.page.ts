import { Component } from '@angular/core';
import { ChartCardComponent } from '../../../shared/components/chart-card.component';

@Component({
  selector: 'app-admin-reports-page',
  standalone: true,
  imports: [ChartCardComponent],
  template: `
  <div class="grid gap-6 xl:grid-cols-2">
    <app-chart-card title="کاربران آنلاین / آفلاین" eyebrow="گزارش 1" subtitle="نفر" [items]="onlineOffline"></app-chart-card>
    <app-chart-card title="ایده‌ها به تفکیک مسئله" eyebrow="گزارش 2" subtitle="شاخص" [items]="ideasByIssue"></app-chart-card>
    <app-chart-card title="نظرات مثبت به تفکیک ایده" eyebrow="گزارش 3" subtitle="امتیاز" [items]="positiveVotes"></app-chart-card>
    <section class="glass rounded-3xl p-5">
      <p class="text-xs text-slate-400">فیلترهای پیشنهادی</p>
      <div class="mt-4 grid gap-3 sm:grid-cols-2">
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">بازه تاریخ</div>
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">سطح مسئله</div>
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">نوع کاربر</div>
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">استان / شهر</div>
      </div>
    </section>
  </div>
  `
})
export class AdminReportsPageComponent {
  onlineOffline = [{ label: 'آنلاین', value: 74 }, { label: 'آفلاین', value: 26 }];
  ideasByIssue = [{ label: 'آب', value: 81 }, { label: 'ترافیک', value: 64 }, { label: 'معیشت', value: 92 }, { label: 'انرژی', value: 88 }];
  positiveVotes = [{ label: 'ایده 1', value: 78 }, { label: 'ایده 2', value: 64 }, { label: 'ایده 3', value: 89 }, { label: 'ایده 4', value: 55 }];
}