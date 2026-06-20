import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-admin-reports-page',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="p-8 bg-slate-950 min-h-screen text-slate-200" style="direction: rtl;">
      <h1 class="text-3xl font-black text-white mb-2 border-r-4 border-cyan-500 pr-4">
        گزارش‌های تحلیلی سامانه
      </h1>
      <p class="text-slate-500 mb-8 pr-6">مجموعه داشبوردهای مدیریتی جهت پایش عملکرد سامانه</p>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div class="p-6 rounded-3xl border border-white/5 bg-slate-900/20 backdrop-blur-xl">
          <h2 class="text-xl font-bold text-cyan-400 mb-2">۱. ثبت‌نام کاربران</h2>
          <p class="text-sm text-slate-400 mb-6">روند رشد کاربران در بازه‌های زمانی مختلف.</p>
          <div class="h-64">
            <canvas baseChart [data]="lineData" [options]="commonOptions" [type]="'line'"></canvas>
          </div>
        </div>

        <div class="p-6 rounded-3xl border border-white/5 bg-slate-900/20 backdrop-blur-xl">
          <h2 class="text-xl font-bold text-cyan-400 mb-2">۲. دسته‌بندی مسائل و راهکارها</h2>
          <p class="text-sm text-slate-400 mb-6">مقایسه فعالیت حوزه‌های مختلف سیستم.</p>
          <div class="h-64">
            <canvas baseChart [data]="barData" [options]="commonOptions" [type]="'bar'"></canvas>
          </div>
        </div>

        <div class="p-6 rounded-3xl border border-white/5 bg-slate-900/20 backdrop-blur-xl">
          <h2 class="text-xl font-bold text-cyan-400 mb-2">۳. نرخ پاسخگویی پشتیبانی</h2>
          <p class="text-sm text-slate-400 mb-6">عملکرد تیم پشتیبانی به تفکیک گروه کاربری.</p>
          <div class="h-64">
            <canvas
              baseChart
              [data]="supportData"
              [options]="commonOptions"
              [type]="'bar'"
            ></canvas>
          </div>
        </div>

        <div class="p-6 rounded-3xl border border-white/5 bg-slate-900/20 backdrop-blur-xl">
          <h2 class="text-xl font-bold text-cyan-400 mb-2">۴. مشارکت و امتیازدهی</h2>
          <p class="text-sm text-slate-400 mb-6">میزان فعالیت کاربران و الگوی امتیازدهی.</p>
          <div class="h-64">
            <canvas
              baseChart
              [data]="engagementData"
              [options]="commonOptions"
              [type]="'bar'"
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdminReportsPageComponent {
  // تنظیمات فونت و ظاهر نمودارها
  commonOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: { family: 'IRANSans', size: 13, weight: 'normal' },
          color: '#f1f5f9', // سفیدِ استخوانی ملایم (Slate-100)
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.06)' },
        ticks: {
          color: '#f1f5f9', // همان سفید استخوانی
          font: { family: 'IRANSans', size: 11 },
        },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.06)' },
        ticks: {
          color: '#f1f5f9',
          font: { family: 'IRANSans', size: 11 },
        },
      },
    },
  };

  // این بخش را در کامپوننت خود جایگزین کنید
  // رنگ‌بندی‌های اختصاصی بر اساس متریال دیزاین مدرن
  private readonly materialColors = {
    primary: '#4dd0e1', // Cyan (سایان متریال)
    secondary: '#9575cd', // Deep Purple
    tertiary: '#81c784', // Light Green
    quaternary: '#ff8a65', // Orange
    accent: '#f06292', // Pink
  };

  // ... در متد تعریف دیتای نمودارها به این شکل استفاده کنید:

  // گزارش ۱ (رشد)
  lineData: ChartConfiguration<'line'>['data'] = {
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1} خرداد`),
    datasets: [
      {
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 20),
        label: 'ثبت‌نام',
        borderColor: this.materialColors.primary,
        backgroundColor: 'rgba(77, 208, 225, 0.15)', // متریال سایان شفاف
        tension: 0.4,
        fill: true,
      },
    ],
  };
  // گزارش ۲: راهکارها (حوزه‌های واقعی)
  categories = [
    'هوشمندسازی حقابه',
    'پایش سدها',
    'توزیع انرژی',
    'شبکه فیبر',
    'بلاکچین شهروندی',
    'پایش آلاینده‌ها',
    'بهینه‌سازی مصرف',
    'مدیریت ترافیک',
    'دیتاسنتر ملی',
    'امنیت سایبری',
    'پشتیبانی سخت‌افزار',
    'آموزش پرسنل',
    'توسعه میکرو',
    'یکپارچه‌سازی ابری',
    'پدافند غیرعامل',
    'اتوماسیون اداری',
    'پایش سلامت شبکه',
    'تجهیزات لوراوان',
    'تحلیل کلان‌داده',
    'ارتباطات ماهواره‌ای',
  ];

  barData: ChartConfiguration<'bar'>['data'] = {
    labels: this.categories,
    datasets: [
      {
        data: [
          340, 280, 210, 195, 180, 165, 150, 140, 135, 120, 110, 105, 95, 90, 85, 80, 75, 70, 65,
          60,
        ],
        label: 'تعداد راهکارها',
        backgroundColor: [this.materialColors.primary, this.materialColors.secondary],
      },
    ],
  };

  // گزارش ۳: پشتیبانی (نام کارشناسان)
  experts = [
    'دکتر حکیمی',
    'مهندس فرخی',
    'دکتر شمس',
    'مهندس سپهری',
    'مهندس راد',
    'علی رضایی',
    'مریم احمدی',
    'حسین کریمی',
    'سارا امینی',
    'رضا نیکنام',
    'نرگس فراهانی',
    'امید شایان',
    'الهام باقری',
    'نیما جلیلی',
    'پارسا وحدت',
    'مینا کیانی',
    'سعید راد',
    'فاطمه رفیعی',
    'بهرام دانا',
    'هدی حسینی',
  ];

  supportData: ChartConfiguration<'bar'>['data'] = {
    labels: this.experts,
    datasets: [
      {
        data: [
          295, 280, 270, 250, 240, 230, 210, 200, 190, 180, 170, 160, 150, 140, 130, 120, 110, 100,
          90, 80,
        ],
        label: 'تیکت پاسخ‌داده‌شده',
        backgroundColor: this.materialColors.tertiary,
      },
    ],
  };

  // گزارش ۴: مشارکت کاربران (کاربران فعال سامانه)
  topUsers = [
    'مدیریت آب منطقه‌ای',
    'شرکت زیرساخت',
    'دانشگاه شریف',
    'سازمان فاوا',
    'شهرداری مرکز',
    'تیم فنی توانیر',
    'گروه پایش محیط',
    'استارتاپ نوین',
    'کاربران آزاد',
    'سازمان بورس',
    'بانک مرکزی',
    'پژوهشگاه نیرو',
    'وزارت نیرو',
    'اپراتور همراه',
    'تیم مخابرات',
    'گروه کشاورزی مدرن',
    'سازمان تنظیم مقررات',
    'تیم هوش مصنوعی',
    'واحد پدافند',
    'پشتیبانی فنی',
  ];

  engagementData: ChartConfiguration<'bar'>['data'] = {
    labels: this.topUsers,
    datasets: [
      {
        data: [45, 42, 39, 38, 36, 35, 33, 31, 29, 28, 27, 26, 25, 23, 22, 20, 18, 17, 16, 15],
        label: 'تعداد کامنت و تعامل',
        backgroundColor: this.materialColors.accent,
      },
    ],
  };
}
