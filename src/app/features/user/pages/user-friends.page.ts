import { Component } from '@angular/core';

@Component({
  selector: 'app-user-friends-page',
  standalone: true,
  template: `
  <div class="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
    <section class="glass rounded-3xl p-5">
      <h3 class="text-2xl font-bold text-white">دوستان و گروه‌ها</h3>
      <div class="mt-5 space-y-3">
        @for (friend of friends; track friend.name) {
          <div class="flex items-center justify-between rounded-2xl bg-white/5 p-4">
            <div>
              <h4 class="font-semibold text-white">{{ friend.name }}</h4>
              <p class="text-sm text-slate-400">{{ friend.field }}</p>
            </div>
            <button class="rounded-2xl bg-white/5 px-4 py-2 text-xs text-white">چت خصوصی</button>
          </div>
        }
      </div>
    </section>

    <section class="glass rounded-3xl p-5">
      <div class="flex items-center justify-between">
        <h4 class="text-lg font-bold text-white">ساخت گروه جدید</h4>
        <button class="rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white">ایجاد</button>
      </div>
      <div class="mt-5 space-y-3">
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">نام گروه</div>
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300 h-32">توضیحات و قوانین گروه</div>
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">افزودن اعضا</div>
      </div>
    </section>
  </div>
  `
})
export class UserFriendsPageComponent {
  friends = [
    { name: 'مریم احمدی', field: 'معیشت و رفاه اجتماعی' },
    { name: 'علی محمدی', field: 'ترافیک و حمل‌ونقل' },
    { name: 'زهرا حسینی', field: 'انرژی و محیط‌زیست' }
  ];
}