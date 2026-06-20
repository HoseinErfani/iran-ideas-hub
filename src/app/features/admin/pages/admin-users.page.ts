import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from '../../../shared/components/data-table.component';

interface User {
  id: number;
  name: string;
  nationalId: string;
  mobile: string;
  level: string;
  unread: boolean;
  stats: { label: string; value: string }[];
  notifications: { type: 'success' | 'warning' | 'info'; text: string }[];
}

@Component({
  selector: 'app-admin-users-page',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTableComponent],
  template: `
    <div class="space-y-6 text-white p-4 sm:p-6" dir="rtl">

      <div class="glass rounded-3xl p-4 sm:p-6 bg-white/5 border border-white/10 flex flex-col justify-between min-w-0 w-full">
        <div>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <p class="text-xs text-slate-400">مدیریت کاربران لایه مرکزی</p>
              <h3 class="text-xl sm:text-2xl font-black text-white mt-0.5">لیست نخبگان و جامعه نقد</h3>
            </div>
            <div class="flex items-center gap-2 w-full sm:w-auto">
              <select
                [(ngModel)]="selectedLevelFilter"
                class="flex-1 sm:flex-none rounded-2xl bg-slate-900 border border-white/10 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-500"
              >
                <option value="ALL">همه سطوح</option>
                <option value="نخبه 2">نخبه ۲</option>
                <option value="نخبه 1">نخبه ۱</option>
                <option value="کاربر ویژه">کاربر ویژه</option>
              </select>
              <button class="rounded-2xl bg-brand-500 hover:bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition whitespace-nowrap">
                خروجی CSV
              </button>
            </div>
          </div>

          <div class="mt-4">
            <input
              [(ngModel)]="searchQuery"
              placeholder="جستجو بر اساس نام، کد ملی یا شماره همراه..."
              class="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 placeholder:text-slate-500"
            />
          </div>

          <div class="mt-5 w-full overflow-hidden">
            <app-data-table
              [columns]="cols"
              [rows]="filteredUsers()"
              [selectedId]="selectedUserId()"
              (rowClick)="handleUserSelect($event)"
            />
          </div>
        </div>

        <div class="mt-4 text-xs text-slate-400 flex flex-wrap justify-between items-center gap-2">
          <span>نمایش {{ filteredUsers().length }} کاربر از کل {{ rawUsers.length }} مورد</span>
        </div>
      </div>

      <div
        *ngIf="isModalOpen()"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      >
        <div
          (click)="closeModal()"
          class="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        ></div>

        <div class="glass rounded-3xl p-6 bg-slate-900/90 border border-white/15 w-full max-w-lg z-10 relative shadow-2xl scale-up-animation">

          <button
            (click)="closeModal()"
            class="absolute top-4 left-4 text-slate-400 hover:text-white bg-white/5 p-2 rounded-xl transition text-xs"
          >
            ✕
          </button>

          <div class="pb-2 border-b border-white/5">
            <p class="text-xs text-slate-400 font-bold tracking-wide">جزئیات پرونده نخبگی</p>
          </div>

          <div class="mt-5 rounded-2xl bg-white/[0.02] border border-white/5 p-4 sm:p-5">
            <div class="flex items-center gap-4">
              <div class="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-400 text-2xl font-black text-slate-950 select-none">
                {{ activeUser().name.charAt(0) }}
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="text-lg font-bold text-white truncate">{{ activeUser().name }}</h4>
                <p class="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">کد ملی: {{ activeUser().nationalId }}</p>
                <p class="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">همراه: {{ activeUser().mobile }}</p>
              </div>
            </div>

            <div class="mt-5 grid gap-3 grid-cols-2">
              @for (item of activeUser().stats; track item.label) {
                <div class="rounded-2xl bg-slate-950/80 p-3.5 border border-white/5 min-w-0">
                  <div class="text-[11px] text-slate-400 truncate">{{ item.label }}</div>
                  <div class="mt-1 text-sm sm:text-base font-bold text-white truncate">{{ item.value }}</div>
                </div>
              }
            </div>
          </div>

          <div class="mt-5 space-y-2.5 max-h-[160px] overflow-y-auto custom-scrollbar pr-1">
            @for (notif of activeUser().notifications; track notif.text) {
              <div
                [ngClass]="{
              'bg-emerald-500/10 text-emerald-300 border-emerald-500/20': notif.type === 'success',
              'bg-amber-500/10 text-amber-300 border-amber-500/20': notif.type === 'warning',
              'bg-cyan-500/10 text-cyan-300 border-cyan-500/20': notif.type === 'info'
            }"
                class="rounded-2xl p-3.5 text-xs border transition-all duration-300"
              >
                {{ notif.text }}
              </div>
            } @empty {
              <div class="text-center py-4 text-xs text-slate-500 bg-white/[0.01] rounded-2xl border border-dashed border-white/5">
                هیچ اقدام معلقی برای این پرونده وجود ندارد.
              </div>
            }
          </div>

          <div class="mt-6 flex gap-2 justify-end border-t border-white/5 pt-4">
            <button (click)="closeModal()" class="rounded-xl bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-semibold text-white transition">
              بستن پنجره
            </button>
            <button class="rounded-xl bg-brand-500 hover:bg-brand-600 px-4 py-2 text-xs font-semibold text-white transition">
              بررسی نهایی پرونده
            </button>
          </div>

        </div>
      </div>

    </div>
  `
})
export class AdminUsersPageComponent {
  cols = ['نام و نام خانوادگی', 'کد ملی', 'شماره همراه', 'سطح کاربر', 'پیام'];

  searchQuery = signal<string>('');
  selectedLevelFilter = signal<string>('ALL');
  selectedUserId = signal<number | null>(null); // در ابتدا هیچ کاربری انتخاب نشده تا سایدبار فضای بیهوده نگیرد
  isModalOpen = signal<boolean>(false); // 🔑 مدیریت وضعیت نمایش مودال

  // موتور فیلتر و کامپیوت دیتای جدول (بدون تغییر)
  filteredUsers = computed(() => {
    let query = this.searchQuery().trim().toLowerCase();
    let filter = this.selectedLevelFilter();

    return this.rawUsers.filter(user => {
      const matchesSearch = !query ||
        user.name.toLowerCase().includes(query) ||
        user.nationalId.includes(query) ||
        user.mobile.replace(/\s+/g, '').includes(query.replace(/\s+/g, ''));
      const matchesFilter = filter === 'ALL' || user.level === filter;
      return matchesSearch && matchesFilter;
    });
  });

  // مپینگ واکنشی آبجکت کاربر فعال به مودال
  activeUser = computed(() => {
    const found = this.rawUsers.find(u => u.id === this.selectedUserId());
    return found || this.rawUsers[0];
  });

  handleUserSelect(user: any) {
    this.selectedUserId.set(user.id);
    user.unread = false;
    this.isModalOpen.set(true); // 🔓 باز کردن مودال با کلیک روی هر سطر جدول
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  rawUsers: User[] = [
    {
      id: 1, name: 'حسین رضایی', nationalId: '1234567890', mobile: '0912 000 0000', level: 'نخبه 2', unread: true,
      stats: [{ label: 'نرخ پاسخگویی', value: '93%' }, { label: 'ایده‌های فعال', value: '27' }, { label: 'نقدهای موفق', value: '146' }, { label: 'وضعیت مدارک', value: '۳ تایید نشده' }],
      notifications: [{ type: 'success', text: '۲ مدرک جدید آماده تأیید ملّی' }, { type: 'warning', text: '۱ درخواست ارتقا سطح در صف بررسی بنیاد' }, { type: 'info', text: '۴ پیام خوانده‌نشده از کارگروه نخبگان' }]
    },
    {
      id: 2, name: 'مریم احمدی', nationalId: '0087456123', mobile: '0912 111 1111', level: 'نخبه 1', unread: false,
      stats: [{ label: 'نرخ پاسخگویی', value: '88%' }, { label: 'ایده‌های فعال', value: '12' }, { label: 'نقدهای موفق', value: '94' }, { label: 'وضعیت مدارک', value: 'کامل' }],
      notifications: [{ type: 'info', text: 'درخواست بازبینی پروپوزال صنعتی' }]
    },
    {
      id: 3, name: 'علیرضا محمدی', nationalId: '9988776655', mobile: '0912 222 2222', level: 'کاربر ویژه', unread: true,
      stats: [{ label: 'نرخ پاسخگویی', value: '42%' }, { label: 'ایده‌های فعال', value: '3' }, { label: 'نقدهای موفق', value: '11' }, { label: 'وضعیت مدارک', value: 'بدون تاییدیه' }],
      notifications: [{ type: 'warning', text: 'نقص سوابق پژوهشی در بخش رزومه' }]
    },
    // تولید خودکار سایر ردیف‌ها برای تکمیل سقف ۵۰ داده واقعی
    ...Array.from({ length: 49 }, (_, index) => {
      const id = index + 4;
      const isEven = id % 2 === 0;
      const isTriple = id % 3 === 0;

      const firstNames = ['امیر', 'سارا', 'رضا', 'زهرا', 'مهدی', 'الناز', 'نیما', 'فاطمه', 'امید', 'کیان'];
      const lastNames = ['حسینی', 'کریمی', 'صادقی', 'موسوی', 'ابراهیمی', 'زارعی', 'انصاری', 'غفاری', 'رحیمی', 'طهماسبی'];

      const level = isEven ? 'نخبه 1' : (isTriple ? 'نخبه 2' : 'کاربر ویژه');
      const name = `${firstNames[id % 10]} ${lastNames[(id + 3) % 10]}`;

      return {
        id,
        name,
        nationalId: `001234${1000 + id}`,
        mobile: `0935 ${200 + id} ${1000 + id}`,
        level,
        unread: id % 4 === 0,
        stats: [
          { label: 'نرخ پاسخگویی', value: `${70 + (id % 25)}%` },
          { label: 'ایده‌های فعال', value: `${id % 15}` },
          { label: 'نقدهای موفق', value: `${id * 2}` },
          { label: 'وضعیت مدارک', value: isTriple ? '۱ نقص مدرک' : 'بررسی شده' }
        ],
        notifications: id % 5 === 0 ? [
          { type: 'warning' as const, text: 'گزارش سالانه دوره تحقیق و توسعه ارسال نشده' }
        ] : []
      };
    })
  ];
}
