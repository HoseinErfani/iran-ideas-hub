import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-communication-page',
  standalone: true,
  template: `
  <div class="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
    <section class="glass rounded-3xl p-5">
      <p class="text-xs text-slate-400">ارسال گروهی</p>
      <h3 class="mt-2 text-2xl font-bold text-white">ایمیل، پیامک و صندوق پیام</h3>
      <div class="mt-5 space-y-3">
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">انتخاب کاربران / گروه‌ها</div>
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">نوع پیام: ایمیل، پیامک، داخل پنل</div>
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300 h-40">متن پیام</div>
        <button class="rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white">ارسال</button>
      </div>
    </section>

    <section class="glass rounded-3xl p-5">
      <h4 class="text-lg font-bold text-white">صف نمونه دریافت‌کنندگان</h4>
      <div class="mt-5 space-y-3">
        @for (item of queue; track item.name) {
          <div class="rounded-2xl bg-white/5 p-4">
            <div class="flex items-center justify-between">
              <span class="text-white">{{ item.name }}</span>
              <span class="text-xs text-slate-400">{{ item.channel }}</span>
            </div>
            <p class="mt-2 text-sm text-slate-300">{{ item.message }}</p>
          </div>
        }
      </div>
    </section>
  </div>
  `
})
export class AdminCommunicationPageComponent {
  queue = [
    { name: 'گروه نخبگان آب', channel: 'پیامک + پنل', message: 'دعوت به نظر درباره بحران آب در اصفهان' },
    { name: 'کاربران معیشت', channel: 'ایمیل', message: 'خبرنامه جدید درباره سیاست‌های حمایتی' },
    { name: 'تیم بررسی ترافیک', channel: 'پنل', message: 'انتشار نسخه جدید درخت مسائل کلان‌شهرها' }
  ];
}