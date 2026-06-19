import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../../shared/components/stat-card.component';
import { ChartCardComponent } from '../../../shared/components/chart-card.component';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen.component';

@Component({
  selector: 'app-admin-dashboard-page',
  standalone: true,
  imports: [CommonModule, StatCardComponent, ChartCardComponent, LoadingScreenComponent],
  template: `
  <div class="space-y-6">
    <div class="grid gap-4 xl:grid-cols-4">
      @for (item of stats; track item.label) {
        <app-stat-card [label]="item.label" [value]="item.value" [icon]="item.icon" [hint]="item.hint" />
      }
    </div>

    <div class="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
      <app-chart-card title="نسبت کاربران و فعالیت" eyebrow="گزارش تجمعی" subtitle="30 روز اخیر" [items]="chartData" />
      <section class="glass rounded-3xl p-5">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-xs text-slate-400">مرکز فرمان</p>
            <h3 class="text-lg font-bold text-white">وظایف فوری امروز</h3>
          </div>
          <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">12 مورد</span>
        </div>
        <div class="mt-5 space-y-3">
          @for (todo of todos; track todo.title) {
            <div class="rounded-2xl bg-white/5 p-4">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <h4 class="font-semibold text-white">{{ todo.title }}</h4>
                  <p class="mt-1 text-sm text-slate-400">{{ todo.meta }}</p>
                </div>
                <!--<span class="rounded-full px-3 py-1 text-xs"
                  [class.bg-emerald-500/15]="todo.state==='فعال'"
                  [class.text-emerald-300]="todo.state==='فعال'"
                  [class.bg-amber-500/15]="todo.state!=='فعال'"
                  [class.text-amber-200]="todo.state!=='فعال'">{{ todo.state }}</span>-->
              </div>
            </div>
          }
        </div>
      </section>
    </div>

    <div class="grid gap-6 xl:grid-cols-[1fr_1fr]">
      <section class="glass rounded-3xl p-5">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-white">نظام مسائل شاخص</h3>
          <span class="text-xs text-slate-400">نمایش درختی</span>
        </div>
        <div class="mt-5">
<!--          <app-issue-tree [nodes]="issues" />-->
        </div>
      </section>

      <section class="glass rounded-3xl p-5">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-white">پایش زنده سامانه</h3>
          <span class="text-xs text-slate-400">بارگذاری سنگین</span>
        </div>
        <div class="mt-5">
          <app-loading-screen title="در حال جمع‌آوری رخدادها" subtitle="لیست ورودها، پیام‌ها و نوتیف‌ها در حال همگام‌سازی است." />
        </div>
      </section>
    </div>
  </div>
  `
})
export class AdminDashboardPageComponent {
  stats = [
    { label: 'کاربران کل', value: '18,420', icon: '👥', hint: 'رشد 12 درصدی نسبت به ماه قبل' },
    { label: 'ایده‌های ثبت‌شده', value: '3,981', icon: '💡', hint: '107 ایده در 24 ساعت گذشته' },
    { label: 'نظرات', value: '92,114', icon: '💬', hint: 'نقدهای تخصصی و عمومی' },
    { label: 'مسائل فعال', value: '214', icon: '🧩', hint: 'در سطح ملی، استانی و شهری' }
  ];
  chartData = [
    { label: 'آنلاین', value: 78 },
    { label: 'آفلاین', value: 42 },
    { label: 'ورودی جدید', value: 61 },
    { label: 'تعامل مثبت', value: 87 }
  ];
  todos = [
    { title: 'بررسی 24 کاربر دارای درخواست ارتقا سطح', meta: 'پیش‌نیاز: تطبیق مدارک و سابقه مشارکت', state: 'فعال' },
    { title: 'ارسال پیامک گروهی به نخبگان مسئله انرژی', meta: 'بخش انرژی و ناترازی برق', state: 'در انتظار' },
    { title: 'تأیید صفحه تماس با ما برای بخش عمومی', meta: 'محتوا + استایل صفحه ثابت', state: 'در انتظار' },
    { title: 'بازبینی گراف مسئله «آب» در خراسان', meta: 'به‌روزرسانی سطح اهمیت', state: 'فعال' }
  ];
  issues = [
    { title: 'بحران آب و الگوی مصرف', level: 'ملی' as const, weight: 10, children: [
      { title: 'مدیریت مخازن', level: 'استانی' as const, weight: 8 },
      { title: 'فرهنگ مصرف شهری', level: 'شهری' as const, weight: 7 }
    ]},
    { title: 'ناترازی برق و انرژی', level: 'ملی' as const, weight: 9, children: [
      { title: 'فرسودگی شبکه', level: 'استانی' as const, weight: 7 },
      { title: 'مصرف خانگی پیک', level: 'شهری' as const, weight: 6 }
    ]}
  ];
}
