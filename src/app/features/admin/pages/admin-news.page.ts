import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-news-page',
  standalone: true,
  template: `
  <div class="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
    <section class="glass rounded-3xl p-5">
      <p class="text-xs text-slate-400">مدیریت اخبار</p>
      <h3 class="mt-2 text-2xl font-bold text-white">ایجاد خبر جدید</h3>
      <div class="mt-5 space-y-3">
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">عنوان خبر</div>
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300 h-40">محتوای خبر و ادیتور</div>
        <div class="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">آپلود تصاویر و ویدئو</div>
        <button class="mt-2 rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white">انتشار</button>
      </div>
    </section>

    <section class="grid gap-4">
      @for (post of posts; track post.title) {
        <article class="glass rounded-3xl p-5">
          <div class="flex items-center justify-between gap-3">
            <h4 class="text-lg font-bold text-white">{{ post.title }}</h4>
            <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{{ post.tag }}</span>
          </div>
          <p class="mt-3 text-sm leading-7 text-slate-300">{{ post.summary }}</p>
        </article>
      }
    </section>
  </div>
  `
})
export class AdminNewsPageComponent {
  posts = [
    { title: 'بسته خبری مدیریت آب در استان‌های کم‌بارش', tag: 'آب', summary: 'گزارش تحلیلی درباره ذخایر، مصرف و راهکارهای کوتاه‌مدت.' },
    { title: 'نقشه راه کاهش ترافیک در تهران و کرج', tag: 'ترافیک', summary: 'برنامه سه‌مرحله‌ای برای حمل‌ونقل عمومی، پارکینگ و هوشمندسازی.' },
    { title: 'نشست تخصصی انرژی و ناترازی برق', tag: 'انرژی', summary: 'ارائه داده‌های میدانی، دعوت از نخبگان و ثبت جمع‌بندی.' }
  ];
}