import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../../shared/components/data-table.component';

@Component({
  selector: 'app-admin-users-page',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  template: `
  <div class="space-y-6">
    <section class="grid gap-4 lg:grid-cols-[1fr_.7fr]">
      <div class="glass rounded-3xl p-5">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-xs text-slate-400">مدیریت کاربران</p>
            <h3 class="text-2xl font-bold text-white">لیست نخبگان و کاربران</h3>
          </div>
          <div class="flex gap-2">
            <button class="rounded-2xl bg-white/5 px-4 py-2 text-sm text-white">فیلتر پیشرفته</button>
            <button class="rounded-2xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white">خروجی</button>
          </div>
        </div>

        <div class="mt-5">
          <app-data-table [columns]="cols" [rows]="users" />
        </div>
      </div>

      <div class="glass rounded-3xl p-5">
        <p class="text-xs text-slate-400">پروفایل انتخاب‌شده</p>
        <div class="mt-4 rounded-3xl bg-white/5 p-5">
          <div class="flex items-center gap-4">
            <div class="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-brand-500 to-cyan-400 text-3xl">ح</div>
            <div>
              <h4 class="text-xl font-bold text-white">حسین رضایی</h4>
              <p class="text-sm text-slate-400">کد ملی 1234567890</p>
              <p class="text-sm text-slate-400">شماره همراه 0912 000 0000</p>
            </div>
          </div>

          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            @for (item of detailStats; track item.label) {
              <div class="rounded-2xl bg-slate-950/60 p-4">
                <div class="text-xs text-slate-400">{{ item.label }}</div>
                <div class="mt-2 text-lg font-bold text-white">{{ item.value }}</div>
              </div>
            }
          </div>
        </div>

        <div class="mt-5 space-y-3">
          <div class="rounded-3xl bg-emerald-500/10 p-4 text-sm text-emerald-200">۲ مدرک جدید آماده تأیید</div>
          <div class="rounded-3xl bg-amber-500/10 p-4 text-sm text-amber-200">۱ درخواست ارتقا سطح در صف بررسی</div>
          <div class="rounded-3xl bg-cyan-500/10 p-4 text-sm text-cyan-200">۴ پیام خوانده‌نشده از نخبگان</div>
        </div>
      </div>
    </section>
  </div>
  `
})
export class AdminUsersPageComponent {
  cols = ['نام و نام خانوادگی', 'کد ملی', 'شماره همراه', 'سطح کاربر', 'پیام'];
  users = [
    { id: 1, name: 'حسین رضایی', nationalId: '1234567890', mobile: '0912 000 0000', level: 'نخبه 2', unread: true },
    { id: 2, name: 'مریم احمدی', nationalId: '0087456123', mobile: '0912 111 1111', level: 'نخبه 1', unread: false },
    { id: 3, name: 'علی محمدی', nationalId: '9988776655', mobile: '0912 222 2222', level: 'کاربر ویژه', unread: true }
  ];
  detailStats = [
    { label: 'نرخ پاسخگویی', value: '93%' },
    { label: 'ایده‌های فعال', value: '27' },
    { label: 'نقدهای موفق', value: '146' },
    { label: 'وضعیت مدارک', value: '3 تایید نشده' }
  ];
}