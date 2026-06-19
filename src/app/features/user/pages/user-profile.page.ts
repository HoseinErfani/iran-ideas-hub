import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  template: `
  <div class="grid gap-6 xl:grid-cols-[.85fr_1.15fr]">
    <section class="glass rounded-3xl p-5">
      <div class="flex items-center gap-4">
        <div class="grid h-24 w-24 place-items-center rounded-[2rem] bg-gradient-to-br from-cyan-400 to-brand-500 text-4xl font-black">ح</div>
        <div>
          <h3 class="text-2xl font-bold text-white">حسین رضایی</h3>
          <p class="mt-1 text-sm text-slate-400">کد ملی 1234567890</p>
          <p class="mt-1 text-sm text-slate-400">سطح: نخبه 2</p>
        </div>
      </div>

      <div class="mt-5 space-y-3">
        @for (field of fields; track field.label) {
          <div class="rounded-2xl bg-white/5 p-4">
            <div class="text-xs text-slate-400">{{ field.label }}</div>
            <div class="mt-2 text-sm text-white">{{ field.value }}</div>
          </div>
        }
      </div>
    </section>

    <section class="glass rounded-3xl p-5">
      <h4 class="text-lg font-bold text-white">مدارک و درخواست ارتقا</h4>
      <div class="mt-5 grid gap-4 sm:grid-cols-2">
        <div class="rounded-3xl bg-white/5 p-5 text-sm text-slate-300">آپلود کارت ملی</div>
        <div class="rounded-3xl bg-white/5 p-5 text-sm text-slate-300">آپلود مدرک تحصیلی</div>
        <div class="rounded-3xl bg-white/5 p-5 text-sm text-slate-300">آپلود رزومه و مقالات</div>
        <div class="rounded-3xl bg-brand-500/15 p-5 text-sm text-brand-100">درخواست ارتقا سطح</div>
      </div>
    </section>
  </div>
  `
})
export class UserProfilePageComponent {
  fields = [
    { label: 'شماره همراه', value: '0912 000 0000' },
    { label: 'آدرس', value: 'تهران، منطقه 3، خیابان ...' },
    { label: 'وضعیت مدارک', value: '3 مدرک تایید شده / 1 مدرک در انتظار' },
    { label: 'آخرین ورود', value: 'امروز، 18:42' }
  ];
}