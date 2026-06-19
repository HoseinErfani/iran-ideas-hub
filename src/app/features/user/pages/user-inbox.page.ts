import { Component } from '@angular/core';

@Component({
  selector: 'app-user-inbox-page',
  standalone: true,
  template: `
  <div class="grid gap-6 xl:grid-cols-[.8fr_1.2fr]">
    <section class="glass rounded-3xl p-5">
      <h3 class="text-2xl font-bold text-white">صندوق پیام</h3>
      <div class="mt-5 space-y-3">
        @for (msg of messages; track msg.subject) {
          <div class="rounded-2xl bg-white/5 p-4">
            <div class="flex items-center justify-between gap-2">
              <h4 class="font-semibold text-white">{{ msg.subject }}</h4>
              <span class="rounded-full px-3 py-1 text-xs" [class.bg-emerald-500/15]="msg.unread" [class.text-emerald-200]="msg.unread" [class.bg-white/5]="!msg.unread" [class.text-slate-300]="!msg.unread">{{ msg.type }}</span>
            </div>
            <p class="mt-2 text-sm text-slate-300">{{ msg.body }}</p>
          </div>
        }
      </div>
    </section>

    <section class="glass rounded-3xl p-5">
      <h4 class="text-lg font-bold text-white">ارسال پیام به راهبر</h4>
      <div class="mt-5 space-y-3">
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">نوع: پشتیبانی / انتقاد / فنی / سایر</div>
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300 h-44">متن پیام</div>
        <button class="rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white">ارسال</button>
      </div>
    </section>
  </div>
  `
})
export class UserInboxPageComponent {
  messages = [
    { subject: 'درخواست شما برای ارتقا سطح دریافت شد', type: 'سیستمی', unread: true, body: 'مدارک جدید ثبت شد و در صف بررسی قرار گرفت.' },
    { subject: 'دعوت به نقد ایده در مسئله آب', type: 'راهبری', unread: false, body: 'لطفاً درباره ایده ثبت‌شده خود نظر تخصصی ارائه دهید.' },
    { subject: 'پیام از گروه انرژی', type: 'گروهی', unread: true, body: 'جلسه آنلاین با نخبگان انرژی در روز چهارشنبه برگزار می‌شود.' }
  ];
}