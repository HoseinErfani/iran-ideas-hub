import { Component, input, signal, computed, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

export interface Attachment {
  name: string;
  type: 'pdf' | 'zip' | 'doc' | 'image';
  size: string;
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  likes: number;
  date: string;
  replies?: Comment[];
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  fullHtmlContent: string;
  likes: number;
  author: Author;
  attachments?: Attachment[];
  comments: Comment[];
}const MOCK_HTML_DOCUMENT = `
  <div>
    <h2>۱. طرح مسئله و ضرورت اجرا</h2>
    <p>
      در دنیای امروز و با توجه به محدودیت‌های شدید منابع، مدیریت هوشمند و مبتنی بر داده دیگر یک انتخاب نیست، بلکه یک ضرورت است. این طرح توجیهی با بررسی دقیق گلوگاه‌های فعلی سیستم، راهکاری جامع بر پایه فناوری‌های نوین ارائه می‌دهد که هدف آن کاهش اتلاف منابع و افزایش بهره‌وری تا مرز استانداردهای جهانی است.
    </p>
    <blockquote>
      <strong>💡 نکته کلیدی استراتژیک:</strong><br>
      برآوردهای اولیه نشان می‌دهد پیاده‌سازی این سیستم قابلیت کاهش ۳۰ درصدی هزینه‌های عملیاتی (OPEX) را در همان ۱۲ ماه نخست داراست.
    </blockquote>

    <h2>۲. معماری فنی و ساختار سیستم</h2>
    <p>معماری پیشنهادی بر پایه میکروسرویس‌ها (Microservices) و استفاده از دیتابیس‌های توزیع‌شده طراحی شده است. لایه‌های اصلی این معماری به شرح زیر است:</p>
    <ul>
      <li><strong>لایه جمع‌آوری داده (Edge Tier):</strong> شامل شبکه‌ای از سنسورها و کنترلرهای محلی با مصرف انرژی پایین (Low-Power) و ارتباط از طریق پروتکل MQTT.</li>
      <li><strong>لایه پردازش (Fog/Cloud Tier):</strong> کلاسترهای پردازشی توزیع‌شده با قابلیت تصمیم‌گیری در لحظه (Real-time Analytics).</li>
      <li><strong>لایه هوش مصنوعی (AI Tier):</strong> پیاده‌سازی مدل‌های یادگیری عمیق (Deep Learning) جهت تشخیص الگوهای ناهنجار و پیش‌بینی بحران.</li>
    </ul>

    <h2>۳. تحلیل ریسک و راهکارهای پدافندی</h2>
    <p>هر پروژه کلان در سطح ملی با چالش‌ها و زیرساخت‌های متعددی روبروست. در این بخش عمده‌ترین ریسک‌های شناسایی شده و فرآیندهای مواجهه با آن‌ها آورده شده است:</p>
    <ul>
      <li><strong>قطع ارتباطات شبکه و اینترنت:</strong> لایه Edge مجهز به مکانیزم Store-and-Forward خواهد بود تا داده‌ها را تا ۷۲ ساعت در حافظه محلی ذخیره و پس از اتصال مجدد ارسال کند.</li>
      <li><strong>حملات سایبری و تزریق داده فیک:</strong> استفاده از پروتکل‌های رمزنگاری TLS 1.3 و احراز هویت دوعاملی سخت‌افزاری برای تمامی گیت‌وی‌ها الزامی است.</li>
      <li><strong>مقاومت بدنه سنتی سازمان در برابر تغییر:</strong> برگزاری دوره‌های فشرده چابک‌سازی و تعریف مشوق‌های مالی برای پرسنل پیشگام.</li>
    </ul>

    <h2>۴. فازبندی اجرا و زمان‌بندی پروژه</h2>
    <p>جهت کاهش ریسک پیاده‌سازی، پروژه در ۳ فاز عملیاتی مجزا با مایل‌استون‌های مشخص اجرا خواهد شد:</p>

    <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px;">
      <thead>
        <tr style="background-color: rgba(255, 255, 255, 0.05);">
          <th style="padding: 10px; text-align: right; border: 1px solid rgba(255, 255, 255, 0.1);">فاز عملیاتی</th>
          <th style="padding: 10px; text-align: right; border: 1px solid rgba(255, 255, 255, 0.1);">شرح اقدامات کلیدی</th>
          <th style="padding: 10px; text-align: right; border: 1px solid rgba(255, 255, 255, 0.1);">مدت زمان تخمینی</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 10px; border: 1px solid rgba(255, 255, 255, 0.1);"><strong>فاز اول</strong></td>
          <td style="padding: 10px; border: 1px solid rgba(255, 255, 255, 0.1);">مطالعات تطبیقی، تامین تجهیزات زیرساخت و طراحی پایگاه داده</td>
          <td style="padding: 10px; border: 1px solid rgba(255, 255, 255, 0.1);">۲ ماه</td>
        </tr>
        <tr style="background-color: rgba(255, 255, 255, 0.02);">
          <td style="padding: 10px; border: 1px solid rgba(255, 255, 255, 0.1);"><strong>فاز دوم</strong></td>
          <td style="padding: 10px; border: 1px solid rgba(255, 255, 255, 0.1);">پیاده‌سازی پایلوت در مقیاس محدود و دیباگینگ سخت‌افزاری</td>
          <td style="padding: 10px; border: 1px solid rgba(255, 255, 255, 0.1);">۴ ماه</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid rgba(255, 255, 255, 0.1);"><strong>فاز سوم</strong></td>
          <td style="padding: 10px; border: 1px solid rgba(255, 255, 255, 0.1);">توسعه در مقیاس ملی، آموزش منابع انسانی و تحویل نهایی</td>
          <td style="padding: 10px; border: 1px solid rgba(255, 255, 255, 0.1);">۶ ماه</td>
        </tr>
      </tbody>
    </table>

    <h2>۵. برآورد مالی و بازگشت سرمایه (ROI)</h2>
    <p>هزینه‌های این طرح به دو دسته هزینه‌های سرمایه‌ای (CAPEX) شامل خرید تجهیزات سخت‌افزاری و هزینه جاری (OPEX) تفکیک می‌شود:</p>
    <blockquote>
      <strong>📊 چشم‌انداز مالی پروژه:</strong><br>
      نقطه سربه‌سر سرمایه‌گذاری (Break-even Point) طبق مدل‌سازی‌های پیشرفته پترسون، در پایان ماه چهاردهم پس از فاز استقرار نهایی محقق خواهد شد و سودآوری خالص از سال دوم آغاز می‌گردد.
    </blockquote>

    <h2>۶. نیازمندی‌های سخت‌افزاری زیرساخت</h2>
    <p>برای دستیابی به پایداری بالا (High Availability) با نرخ دسترسی ۹۹.۹٪، بستر سخت‌افزاری زیر باید به عنوان حداقل نیازمندی پیش‌فرض در دیتاسنتر مرکزی تامین گردد:</p>
    <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px;">
      <thead>
        <tr style="background-color: rgba(255, 255, 255, 0.05);">
          <th style="padding: 10px; text-align: right; border: 1px solid rgba(255, 255, 255, 0.1);">نام تجهیزات</th>
          <th style="padding: 10px; text-align: right; border: 1px solid rgba(255, 255, 255, 0.1);">حداقل مشخصات فنی</th>
          <th style="padding: 10px; text-align: right; border: 1px solid rgba(255, 255, 255, 0.1);">تعداد الزامی</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 10px; border: 1px solid rgba(255, 255, 255, 0.1);">سرور پردازشی مرکزی</td>
          <td style="padding: 10px; border: 1px solid rgba(255, 255, 255, 0.1);">64 Cores vCPU / 256GB RAM / NVMe Storage</td>
          <td style="padding: 10px; border: 1px solid rgba(255, 255, 255, 0.1);">۳ گره کلاستر</td>
        </tr>
        <tr style="background-color: rgba(255, 255, 255, 0.02);">
          <td style="padding: 10px; border: 1px solid rgba(255, 255, 255, 0.1);">ماژول‌های پایلوت Edge</td>
          <td style="padding: 10px; border: 1px solid rgba(255, 255, 255, 0.1);">ARM Cortex-A72 / LoRaWAN Gateway IP67</td>
          <td style="padding: 10px; border: 1px solid rgba(255, 255, 255, 0.1);">۱۵۰ دستگاه</td>
        </tr>
      </tbody>
    </table>

    <h2>۷. دستاوردها و شاخص‌های کلیدی عملکرد (KPI)</h2>
    <p>پس از پیاده‌سازی کامل سیستم، رصد شاخص‌های زیر به صورت هفتگی برای ارزیابی موفقیت طرح توسط داشبورد مدیریتی انجام می‌پذیرد:</p>
    <ul>
      <li><strong>KPI-1:</strong> کاهش نرخ تاخیر در پاسخ‌دهی به بحران‌های نشت منابع به کمتر از ۱۸۰ ثانیه.</li>
      <li><strong>KPI-2:</strong> بهبود ضریب یکپارچگی داده‌های ارسالی از محیط تا مرز ۹۹.۴ درصد.</li>
      <li><strong>KPI-3:</strong> رضایت‌مندی کاربران نهایی و ذینفعان بخش کشاورزی و ارتقای بهر‌ه‌وری فردی.</li>
    </ul>

    <p style="text-align: center; margin-top: 40px; opacity: 0.5;">
      <small>پایان سند مستندات جامع. (این یک نمونه متن شبیه‌سازی شده طولانی برای تست ظرفیت نمایش HTML چند صفحه‌ای است.)</small>
    </p>
  </div>
`;
@Component({
  selector: 'app-idea-board',
  standalone: true,
  // 📦 اضافه کردن ماژول Quill به ایمپورت‌ها
  imports: [CommonModule, FormsModule, NgxEditorModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="space-y-4 text-white relative" [ngClass]="styleClass()" dir="rtl">

      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.02] border border-white/10 p-5 rounded-2xl backdrop-blur-md">
        <div>
          <h2 class="text-lg font-black text-white">بورد تخصصی اشتراک‌گذاری ایده‌ها</h2>
          <p class="text-xs text-slate-400 mt-1">طرح‌ها، مستندات فنی و نقد ساختاریافته ذینفعان</p>
        </div>

        @if (!readonly()) {
          <button
            (click)="openCreateModal()"
            class="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-lg shadow-cyan-500/10 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>💡</span> ثبت ایده و مستندات جدید
          </button>
        }
      </div>

      @for (idea of sortedIdeas(); track idea.id) {
        <div
          class="glass rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-cyan-500/5">

          <div (click)="toggleAccordion(idea.id)"
               class="p-5 flex items-center justify-between gap-4 cursor-pointer select-none hover:bg-white/[0.01] transition-colors">
            <h4
              class="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-l from-white to-slate-200 leading-snug flex-1">
              {{ idea.title }}
            </h4>
            <div class="flex items-center gap-3 shrink-0" (click)="$event.stopPropagation()">
              <button (click)="likeIdea(idea.id)"
                      class="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/30 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition duration-300">
                <span>❤️</span> <span class="font-mono">{{ idea.likes }}</span>
              </button>
              <button (click)="toggleAccordion(idea.id)"
                      class="p-2 bg-white/5 border border-white/10 rounded-xl text-xs hover:bg-white/10 transition-transform duration-300"
                      [class.rotate-180]="isExpanded(idea.id)">▼
              </button>
            </div>
          </div>

          <div [ngClass]="isExpanded(idea.id) ? 'grid-rows-[1fr] border-t border-white/5' : 'grid-rows-[0fr]'"
               class="grid transition-all duration-300 ease-in-out bg-black/20">
            <div class="overflow-hidden">
              <div class="p-6 space-y-6">

                <div class="flex items-center gap-3.5 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                  <div class="relative">
                    <div
                      class="w-11 h-11 rounded-full border-2 border-cyan-500/20 p-0.5 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-base font-bold text-cyan-400 select-none">
                      {{ idea.author.name.charAt(0) }}
                    </div>
                    <span
                      class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse"></span>
                  </div>
                  <div>
                    <h5 class="text-xs sm:text-sm font-bold text-slate-200">{{ idea.author.name }}</h5>
                    <p class="text-[11px] text-slate-400 mt-0.5">{{ idea.author.role }}</p>
                  </div>
                </div>

                <div class="bg-gradient-to-br from-white/[0.03] to-transparent p-5 rounded-xl border border-white/5">
                  <h6 class="text-xs font-bold text-cyan-400 mb-2">📄 چکیده ایده:</h6>
                  <p class="text-slate-300 text-sm leading-7 font-normal mb-5 line-clamp-3">{{ idea.description }}</p>
                  <button (click)="openModal(idea)"
                          class="w-full sm:w-auto flex items-center justify-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300">
                    <span>📑</span> مشاهده سند کامل فنی ({{ idea.fullHtmlContent.length > 0 ? 'چند صفحه‌ای' : 'خالی' }})
                  </button>
                </div>

                @if (idea.attachments && idea.attachments.length) {
                  <div class="space-y-2">
                    <h6 class="text-xs font-bold text-slate-400">فایل‌های ضمیمه:</h6>
                    <div class="flex flex-wrap gap-2.5">
                      @for (file of idea.attachments; track file.name) {
                        <div
                          class="flex items-center gap-3 bg-white/[0.02] hover:bg-white/5 border border-white/5 hover:border-white/10 rounded-xl px-4 py-2 text-xs transition-colors duration-300 cursor-pointer group">
                          <span [ngSwitch]="file.type">
                            <span *ngSwitchCase="'pdf'" class="text-rose-400">📁</span>
                            <span *ngSwitchCase="'zip'" class="text-amber-400">📦</span>
                            <span *ngSwitchCase="'doc'" class="text-blue-400">📝</span>
                            <span *ngSwitchDefault class="text-cyan-400">🖼️</span>
                          </span>
                          <div class="min-w-0">
                            <p
                              class="text-slate-300 font-medium truncate max-w-[180px] group-hover:text-cyan-300">{{ file.name }}</p>
                            <p class="text-[10px] text-slate-500 font-mono mt-0.5" dir="ltr">{{ file.size }}</p>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                }

                <div class="border-t border-white/5 pt-6 space-y-4">
                  <div class="flex justify-between items-center bg-white/[0.01] border border-white/5 rounded-xl p-3">
                    <div class="flex items-center gap-2">
                      <span
                        class="text-xs bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded font-mono">{{ idea.comments.length }}
                        نظر</span>
                      <h5 class="text-xs sm:text-sm font-bold text-slate-300">بحث و تبادل نظر نخبگان</h5>
                    </div>
                    <button (click)="toggleCommentsVisibility(idea.id)"
                            class="text-[11px] bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-400 px-2.5 py-1 rounded-lg border border-white/5 transition duration-300">
                      {{ isCommentsHidden(idea.id) ? '👁️ نمایش نظرات' : '🙈 مخفی کردن نظرات' }}
                    </button>
                  </div>

                  @if (!isCommentsHidden(idea.id)) {
                    <div class="space-y-4 animate-fade-in">
                      @if (!readonly()) {
                        <div class="flex gap-2 items-center">
                          <input [(ngModel)]="newCommentText[idea.id]" placeholder="دیدگاه یا نقد خود را وارد کنید..."
                                 class="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 text-white placeholder:text-slate-500" />
                          <button (click)="addRootComment(idea.id)"
                                  class="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap">
                            ثبت نظر
                          </button>
                        </div>
                      }
                      <div class="space-y-2">
                        <ng-container
                          *ngTemplateOutlet="commentList; context: { $implicit: idea.comments, ideaId: idea.id }"></ng-container>
                      </div>
                    </div>
                  } @else {
                    <div
                      class="text-center py-4 text-[11px] text-slate-500 bg-white/[0.01] rounded-xl border border-dashed border-white/5 cursor-pointer"
                      (click)="toggleCommentsVisibility(idea.id)">
                      نظرات این بخش پنهان است. جهت بازخوانی کلیک کنید.
                    </div>
                  }
                </div>

              </div>
            </div>
          </div>
        </div>
      }

    </div>

    @if (selectedModalIdea()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" dir="rtl">
        <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" (click)="closeModal()"></div>
        <div
          class="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          <div class="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-white/[0.02]">
            <div class="pr-2 border-r-4 border-cyan-500">
              <h2 class="text-lg sm:text-xl font-black text-white leading-tight">{{ selectedModalIdea()?.title }}</h2>
              <p class="text-xs text-slate-400 mt-1">سند فنی ارائه شده توسط: {{ selectedModalIdea()?.author?.name }}</p>
            </div>
            <button (click)="closeModal()"
                    class="text-slate-400 hover:text-white bg-white/5 hover:bg-rose-500/80 p-2.5 rounded-xl transition duration-300">
              ✕
            </button>
          </div>
          <div class="p-6 sm:p-8 overflow-y-auto flex-1 custom-scrollbar">
            <div [innerHTML]="selectedModalIdea()?.fullHtmlContent" class="html-document-container"></div>
          </div>
          <div class="p-4 border-t border-white/5 bg-black/20 flex justify-end">
            <button (click)="closeModal()"
                    class="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition duration-300">
              بستن مستندات
            </button>
          </div>
        </div>
      </div>
    }

    @if (isCreateModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" dir="rtl">
        <div class="fixed inset-0 bg-slate-950/85 backdrop-blur-md" (click)="closeCreateModal()"></div>

        <div
          class="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col my-auto overflow-hidden animate-fade-in-up">
          <div class="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.01]">
            <h3 class="text-md font-black text-white flex items-center gap-2">
              <span>💡</span> ثبت ایده و مستندات فنی جدید
            </h3>
            <button (click)="closeCreateModal()"
                    class="text-slate-400 hover:text-white p-2 text-sm bg-white/5 rounded-lg">✕
            </button>
          </div>

          <div class="p-6 space-y-5 overflow-y-auto max-h-[75vh] custom-scrollbar">
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-300">عنوان کلان ایده <span
                class="text-rose-400">*</span></label>
              <input [(ngModel)]="newIdeaForm.title" placeholder="مثال: توسعه سامانه هوشمند..."
                     class="w-full bg-white/5 border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors" />
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-300">چکیده ایده <span class="text-rose-400">*</span></label>
              <textarea [(ngModel)]="newIdeaForm.description" rows="2" placeholder="خلاصه‌ای موجز..."
                        class="w-full bg-white/5 border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors resize-none"></textarea>
            </div>

            <div class="space-y-1.5 ngx-editor-dark">
              <label class="text-xs font-bold text-slate-300">سند جامع و مستندات (HTML) <span class="text-rose-400">*</span></label>

              <div class="border border-white/10 rounded-2xl overflow-hidden bg-slate-950/40" *ngIf="editor">
                <ngx-editor-menu [editor]="editor" [toolbar]="toolbar"></ngx-editor-menu>
                <ngx-editor
                  [editor]="editor"
                  [(ngModel)]="newIdeaForm.fullHtmlContent"
                  placeholder="توضیحات کامل، ابعاد فنی و مستندات ایده را اینجا بنویسید..."
                ></ngx-editor>
              </div>
            </div>

            <div class="space-y-2 pt-2">
              <label class="text-xs font-bold text-slate-300">فایل‌های ضمیمه</label>
              <div class="flex gap-2">
                <input [(ngModel)]="tempAttachmentName" placeholder="نام فایل (مثال: مستند.pdf)"
                       class="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none" />
                <button (click)="addTempAttachment()"
                        class="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap">
                  افزودن
                </button>
              </div>
              @if (newIdeaForm.attachments.length) {
                <div class="flex flex-wrap gap-1.5 pt-2">
                  @for (file of newIdeaForm.attachments; track file.name; let idx = $index) {
                    <span
                      class="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] px-3 py-1.5 rounded-lg">
                      📦 {{ file.name }}
                      <button (click)="removeAttachment(idx)"
                              class="text-rose-400 hover:text-rose-300 font-bold ml-1">✕</button>
                    </span>
                  }
                </div>
              }
            </div>
          </div>

          <div class="p-4 border-t border-white/10 bg-black/20 flex justify-end gap-2">
            <button (click)="closeCreateModal()"
                    class="bg-white/5 hover:bg-white/10 text-slate-300 px-5 py-2.5 rounded-xl text-sm transition">انصراف
            </button>
            <button (click)="submitNewIdea()"
                    class="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition shadow-lg shadow-cyan-600/20">
              تایید و ثبت نهایی
            </button>
          </div>
        </div>
      </div>
    }

    <ng-template #commentList let-comments let-ideaId="ideaId">
      @for (comment of comments; track comment.id) {
        <div class="space-y-2 pr-3 border-r border-white/5 mt-3">
          <div class="bg-white/[0.01] p-3 rounded-xl border border-white/5">
            <div class="flex justify-between text-[11px] text-slate-400 mb-1">
              <span class="font-bold text-slate-300 flex items-center gap-1">
                <span class="w-1 h-1 rounded-full bg-cyan-500"></span> {{ comment.author }}
              </span>
              <span class="font-mono text-[10px]">{{ comment.date }}</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">{{ comment.text }}</p>

            <div class="flex items-center gap-3 mt-2 text-[10px] border-t border-white/[0.02] pt-2">
              <button (click)="likeComment(ideaId, comment.id)"
                      class="text-slate-400 hover:text-rose-400 transition-colors">❤️ {{ comment.likes }}
              </button>
              @if (!readonly()) {
                <button (click)="activeReplyId.set(comment.id)" class="text-cyan-400 font-medium">پاسخ</button>
              }
            </div>

            @if (activeReplyId() === comment.id && !readonly()) {
              <div class="flex gap-2 mt-2 animate-fade-in">
                <input [(ngModel)]="replyText" placeholder="پاسخ خود را بنویسید..."
                       class="flex-1 bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none" />
                <button (click)="addReply(ideaId, comment)" class="bg-white/10 px-3 py-1 rounded-lg text-[11px]">ثبت
                </button>
              </div>
            }
          </div>
          @if (comment.replies?.length) {
            <div class="mr-1">
              <ng-container
                *ngTemplateOutlet="commentList; context: { $implicit: comment.replies, ideaId: ideaId }"></ng-container>
            </div>
          }
        </div>
      }
    </ng-template>

    <style>
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }

      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.02);
      }

      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(6, 182, 212, 0.3);
        border-radius: 10px;
      }

      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(6, 182, 212, 0.6);
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px) scale(0.98);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .animate-fade-in-up {
        animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      /* 🎨 استایل‌های سفارشی برای سازگاری لایبرری Quill با تم دارک و گلاسمورفیسم */
      .quill-dark-theme .ql-toolbar {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
      }

      .quill-dark-theme .ql-toolbar button, .quill-dark-theme .ql-toolbar .ql-picker {
        color: #cbd5e1;
      }

      .quill-dark-theme .ql-toolbar button:hover, .quill-dark-theme .ql-toolbar .ql-picker:hover {
        color: #22d3ee;
      }

      .quill-dark-theme .ql-toolbar .ql-stroke {
        stroke: #cbd5e1;
      }

      .quill-dark-theme .ql-toolbar .ql-fill {
        fill: #cbd5e1;
      }

      .quill-dark-theme .ql-toolbar button:hover .ql-stroke {
        stroke: #22d3ee;
      }

      .quill-dark-theme .ql-toolbar button:hover .ql-fill {
        fill: #22d3ee;
      }

      .quill-dark-theme .ql-container {
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-top: none !important;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
        background: rgba(0, 0, 0, 0.2);
        color: #f1f5f9;
        font-family: inherit;
        font-size: 0.875rem;
      }

      .quill-dark-theme .ql-editor {
        direction: rtl;
        text-align: right;
      }

      /* 🎨 هماهنگ‌سازی ادیتور رایگان Ngx-Editor با تم تاریک پروژه */
      .ngx-editor-dark .NgxEditor__MenuBar {
        background: rgba(255, 255, 255, 0.03) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        padding: 6px !important;
      }
      .ngx-editor-dark .NgxEditor__MenuBar .NgxEditor__MenuItem--Icon {
        color: #cbd5e1 !important;
      }
      .ngx-editor-dark .NgxEditor__MenuBar .NgxEditor__MenuItem--Icon:hover {
        background: rgba(255, 255, 255, 0.1) !important;
        color: #22d3ee !important;
      }
      .ngx-editor-dark .NgxEditor {
        background: transparent !important;
        color: #f1f5f9 !important;
        min-height: 200px;
        max-height: 350px;
        overflow-y: auto;
        direction: rtl !important;
        text-align: right !important;
        padding: 12px !important;
        border: none !important;
      }
      .ngx-editor-dark .NgxEditor__Placeholder {
        right: 12px !important;
        left: auto !important;
        color: #64748b !important;
      }

      .html-document-container {
        direction: rtl;
        text-align: right;
        line-height: 2;
      }
      .html-document-container h2 {
        color: #22d3ee; /* رنگ سایان */
        font-size: 1.5rem;
        font-weight: 900;
        margin-top: 24px;
        margin-bottom: 12px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 8px;
      }
      .html-document-container p {
        color: #cbd5e1;
        margin-bottom: 16px;
      }
      .html-document-container blockquote {
        background: rgba(6, 182, 212, 0.1);
        border-right: 4px solid #06b6d4;
        padding: 16px;
        border-radius: 12px;
        margin: 20px 0;
      }
      .html-document-container ul {
        list-style-type: disc;
        padding-right: 24px;
        margin-bottom: 16px;
      }
      .html-document-container li {
        margin-bottom: 8px;
      }
      /* 📊 استایل‌دهی جامع و مدرن برای جداول خروجی ادیتور */
      .html-document-container table {
        width: 100% !important;
        border-collapse: collapse !important;
        margin: 24px 0 !important;
        overflow: hidden;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        background: rgba(255, 255, 255, 0.01);
      }

      /* استایل هدر جدول */
      .html-document-container th {
        background-color: rgba(255, 255, 255, 0.06) !important;
        color: #ffffff !important;
        font-weight: 700 !important;
        padding: 14px 16px !important;
        text-align: right !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.15) !important;
        font-size: 0.85rem;
      }

      /* استایل سلول‌های بدنه جدول */
      .html-document-container td {
        padding: 14px 16px !important;
        color: #e2e8f0 !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
        font-size: 0.85rem;
        vertical-align: middle;
      }

      /* افکت هاور روی ردیف‌ها برای خوانایی بهتر داده‌ها */
      .html-document-container tr:hover {
        background-color: rgba(6, 182, 212, 0.04) !important; /* یک هاله بسیار ملایم از رنگ سایان */
        transition: background-color 0.2s ease;
      }

      /* رنگ‌آمیزی یکی‌درمیان ردیف‌ها (Zebra Striping) */
      .html-document-container tr:nth-child(even) {
        background-color: rgba(255, 255, 255, 0.02);
      }

      /* حذف خط پایین آخرین ردیف برای تمیزی ظاهر */
      .html-document-container tr:last-child td {
        border-bottom: none !important;
      }
    </style>
  `
})
export class IdeaBoardComponent implements OnInit ,OnDestroy{
  readonly readonly = input<boolean>(false);
  readonly issueId = input.required<string>();
  readonly styleClass = input<string>('');

  activeReplyId = signal<string | null>(null);
  replyText = '';
  newCommentText: { [key: string]: string } = {};

  private expandedIdeaIds = signal<Set<string>>(new Set());
  private hiddenCommentIdeaIds = signal<Set<string>>(new Set());

  selectedModalIdea = signal<Idea | null>(null);

  // 🔒 متغیرهای پاپ‌آپ ایجاد ایده
  isCreateModalOpen = signal<boolean>(false);
  tempAttachmentName = '';
  newIdeaForm = {
    title: '',
    description: '',
    fullHtmlContent: '',
    attachments: [] as Attachment[]
  };

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  // 💾 داده‌های فیک کاملا دست‌نخورده از درخواست شما
  readonly ideas = signal<Idea[]>([
    {
      id: 'idea-1',
      title: 'هوشمندسازی تخصیص حقابه با اینترنت اشیا (IoT)',
      description: 'نصب سنسورهای دبی‌سنج پایش برخط در خروجی سدها و ورودی کانال‌های کشاورزی جهت جلوگیری از برداشت غیرمجاز آب و توزیع عادلانه ثبتی.',
      fullHtmlContent: MOCK_HTML_DOCUMENT,
      likes: 142,
      author: { name: 'دکتر ارسلان حکیمی', role: 'استادیار دانشکده منابع آب شریف', avatar: '' },
      attachments: [{ name: 'پروپوزال_فنی.pdf', type: 'pdf', size: '4.2 MB' }],
      comments: [
        {
          id: 'c1-1',
          author: 'دکتر علوی',
          text: 'طرح خوبیه، اما در بحث کالیبراسیون سنسورها در مواجهه با رسوبات کانال‌های سنتی چه راهکاری دارید؟',
          likes: 24,
          date: '۲ ساعت قبل',
          replies: [
            {
              id: 'c1-1-r1',
              author: 'دکتر ارسلان حکیمی',
              text: 'ممنون از توجهتون. از سنسورهای التراسونیک غیرتماسی کلمپ-آن استفاده می‌کنیم تا رسوبات تأثیری روی دقت اندازه‌گیری نگذارند.',
              likes: 12,
              date: '۱ ساعت قبل',
              replies: [
                {
                  id: 'c1-1-r2',
                  author: 'دکتر علوی',
                  text: 'عالیه، این مشکل نگهداری دوره‌ای رو تا حد زیادی حل میکنه.',
                  likes: 5,
                  date: '۳۰ دقیقه قبل',
                  replies: []
                }
              ]
            }
          ]
        },
        { id: 'c1-2', author: 'مهندس رضا کرمی', text: 'بخش سخت‌افزاری پروتکل لوراوان (LoRaWAN) برای این حجم از سنسور مقرون به صرفه‌ترین گزینه‌ است.', likes: 8, date: '۴ ساعت قبل', replies: [] }
      ]
    },
    {
      id: 'idea-2',
      title: 'اصلاح الگوی کشت حوضه آبریز با سوبسید معکوس مالی',
      description: 'قطع کامل سوبسید کود و سم برای محصولات آب‌بر مانند هندوانه و تخصیص آن به صورت تسهیلات بلاعوض گلخانه‌ای.',
      fullHtmlContent: MOCK_HTML_DOCUMENT,
      likes: 98,
      author: { name: 'مهندس فرزاد فرخی', role: 'پژوهشگر اقتصاد کشاورزی', avatar: '' },
      comments: [
        {
          id: 'c2-1',
          author: 'سارا احمدی',
          text: 'فشار اقتصادی این کار روی کشاورزان خرده‌پا در فاز اول چطور مدیریت میشه؟',
          likes: 15,
          date: 'دیروز',
          replies: [
            {
              id: 'c2-1-r1',
              author: 'مهندس فرزاد فرخی',
              text: 'سوبسید بلافاصله قطع نمیشه؛ در یک بازه ۶ ماهه و همزمان با اعطای وام سازه‌های گلخانه‌ای سبک فازبندی میشه.',
              likes: 9,
              date: '۱۸ ساعت قبل',
              replies: []
            }
          ]
        }
      ]
    },
    {
      id: 'idea-3',
      title: 'توسعه شبکه فیبر نوری با تهاتر فرکانسی اپراتورها',
      description: 'الزام اپراتورهای همراه به تهاتر هزینه‌های فرکانسی سالانه با حفر، داکت‌گذاری و اتصال پورت‌های فیبر نوری خانگی شهری.',
      fullHtmlContent: MOCK_HTML_DOCUMENT,
      likes: 210,
      author: { name: 'مهندس سهراب سپهری', role: 'مدیر زیرساخت مخابرات', avatar: '' },
      attachments: [{ name: 'استاندارد_صنعت_FTTH.pdf', type: 'pdf', size: '1.8 MB' }],
      comments: [
        {
          id: 'c3-1',
          author: 'امید شایان',
          text: 'یک ایده برد-برد واقعی. اپراتورها به جای خروج نقدینگی، روی دارایی‌های ثابت خود سرمایه‌گذاری می‌کنند.',
          likes: 45,
          date: '۲ روز قبل',
          replies: []
        }
      ]
    },
    {
      id: 'idea-4',
      title: 'سیستم یکپارچه مانیتورینگ سلامت ترانسفورماتورهای توزیع برق',
      description: 'پیاده‌سازی گیت‌وی‌های ارزان‌قیمت روی ترانس‌های شهری برای سنجش دمای روغن و بار مصرفی جهت پیش‌بینی و جلوگیری از سوختن آن‌ها قبل از وقوع حادثه.',
      fullHtmlContent: MOCK_HTML_DOCUMENT,
      likes: 175,
      author: { name: 'مهندس نیما راد', role: 'کارشناس ارشد دیسپاچینگ توانیر', avatar: '' },
      comments: [
        {
          id: 'c4-1',
          author: 'وحید جلیلی',
          text: 'داده‌ها به چه صورت ارسال میشن؟ از سیم‌کارت استفاده میشه یا شبکه اختصاصی؟',
          likes: 11,
          date: '۳ ساعت قبل',
          replies: [
            {
              id: 'c4-1-r1',
              author: 'مهندس نیما راد',
              text: 'ترکیبی از ماژول‌های NB-IoT و لوراوان بر اساس توپولوژی جغرافیایی منطقه.',
              likes: 14,
              date: '۲ ساعت قبل',
              replies: [
                {
                  id: 'c4-1-r2',
                  author: 'وحید جلیلی',
                  text: 'استفاده از NB-IoT پوشش‌دهی داخل پیت‌های زیرزمینی رو هم به شدت تضمین میکنه. عالیه.',
                  likes: 4,
                  date: '۱ ساعت قبل',
                  replies: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'idea-5',
      title: 'احراز هویت غیرمتمرکز شهروندی بر بستر بلاکچین ملی',
      description: 'حذف کامل کپی مدارک فیزیکی در سازمان‌ها با استفاده از هویت دیجیتال رمزنگاری شده (DID) بر پایه زنجیره بلوکی کلید عمومی.',
      fullHtmlContent: MOCK_HTML_DOCUMENT,
      likes: 320,
      author: { name: 'دکتر مریم شمس', role: 'رئیس آزمایشگاه رمزنگاری دانشگاه تهران', avatar: '' },
      comments: [
        {
          id: 'c5-1',
          author: 'پیمان حسینی',
          text: 'حفظ حریم خصوصی پاشنه آشیل این طرحه. اگر کلید خصوصی شهروند گم بشه فرآیند ریکاوری چطور خواهد بود؟',
          likes: 52,
          date: '۵ ساعت قبل',
          replies: [
            {
              id: 'c5-1-r1',
              author: 'دکتر مریم شمس',
              text: 'از مکانیزم Social Recovery (بازیابی اجتماعی از طریق امین‌های معتمد انتخاب شده توسط خود شهروند) استفاده میشه تا نیاز به نهاد مرکزی نباشه.',
              likes: 31,
              date: '۳ ساعت قبل',
              replies: []
            }
          ]
        }
      ]
    },
    {
      id: 'idea-6',
      title: 'سامانه هوشمند پایش خستگی و تمرکز رانندگان ترانزیت',
      description: 'استفاده از پردازش تصویر لبه‌ای (Edge AI) و دوربین‌های مادون قرمز داخل کابین برای تحلیل نرخ پلک‌زدن و انحراف چشم رانندگان ناوگان سنگین.',
      fullHtmlContent: MOCK_HTML_DOCUMENT,
      likes: 189,
      author: { name: 'مهندس الهام باقری', role: 'توسعه‌دهنده سیستم‌های هوشمند بینایی ماشین', avatar: '' },
      comments: []
    }
  ]);

  sortedIdeas = computed(() => [...this.ideas()].sort((a, b) => b.likes - a.likes));

  ngOnInit() {
    const allIds = this.ideas().map(i => i.id);
    this.hiddenCommentIdeaIds.set(new Set(allIds));
  }
  ngOnDestroy(): void {
    this.editor?.destroy();
  }
  openModal(idea: Idea) {
    this.selectedModalIdea.set(idea);
    document.body.style.overflow = 'hidden';
    this.editor = new Editor();

    const allIds = this.ideas().map(i => i.id);
    this.hiddenCommentIdeaIds.set(new Set(allIds));
  }

  closeModal() {
    this.selectedModalIdea.set(null);
    document.body.style.overflow = 'auto';
  }

  // 🔑 توابع مدیریت مدال ایجاد ایده جدید
  openCreateModal() {
// 1. ساخت ادیتور جدید در لحظه باز شدن
    this.editor = new Editor();

    // 2. ریست کردن فرم
    this.newIdeaForm = { title: '', description: '', fullHtmlContent: '', attachments: [] };
    this.tempAttachmentName = '';

    // 3. باز کردن مدال
    this.isCreateModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeCreateModal() {
// ادیتور را تخریب کنید تا حافظه آزاد شود و خطای بعدی ندهد
       this.editor?.destroy();
     this.isCreateModalOpen.set(false);
    document.body.style.overflow = 'auto';
  }

  addTempAttachment() {
    if (!this.tempAttachmentName.trim()) return;
    const ext = this.tempAttachmentName.split('.').pop()?.toLowerCase() || '';
    let type: 'pdf' | 'zip' | 'doc' | 'image' = 'zip';
    if (['pdf'].includes(ext)) type = 'pdf';
    else if (['doc', 'docx'].includes(ext)) type = 'doc';
    else if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) type = 'image';

    this.newIdeaForm.attachments.push({
      name: this.tempAttachmentName.trim(),
      type: type,
      size: 'نامشخص'
    });
    this.tempAttachmentName = '';
  }

  removeAttachment(index: number) {
    this.newIdeaForm.attachments.splice(index, 1);
  }

  submitNewIdea() {
    if (!this.newIdeaForm.title.trim() || !this.newIdeaForm.description.trim() || !this.newIdeaForm.fullHtmlContent?.trim()) {
      alert('لطفاً تمامی فیلدهای اجباری را تکمیل کنید.');
      return;
    }

    const createdIdea: Idea = {
      id: 'idea-' + Date.now(),
      title: this.newIdeaForm.title,
      description: this.newIdeaForm.description,
      fullHtmlContent: this.newIdeaForm.fullHtmlContent,
      likes: 0,
      author: { name: 'کاربر سیستم', role: 'ثبت‌کننده ایده', avatar: '' },
      attachments: [...this.newIdeaForm.attachments],
      comments: []
    };

    this.ideas.update(list => [createdIdea, ...list]);
    this.closeCreateModal();
  }

  isExpanded(id: string): boolean { return this.expandedIdeaIds().has(id); }

  toggleAccordion(id: string) {
    this.expandedIdeaIds.update((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  isCommentsHidden(id: string): boolean { return this.hiddenCommentIdeaIds().has(id); }

  toggleCommentsVisibility(id: string) {
    this.hiddenCommentIdeaIds.update((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  likeIdea(id: string) {
    if (this.readonly()) return;
    this.ideas.update((l) => l.map((i) => (i.id === id ? { ...i, likes: i.likes + 1 } : i)));
  }

  addRootComment(id: string) {
    const text = this.newCommentText[id];
    if (!text?.trim()) return;
    const nc: Comment = { id: 'rc-' + Date.now(), author: 'کاربر سیستم', text, likes: 0, date: 'اکنون', replies: [] };
    this.ideas.update((l) => l.map((i) => (i.id === id ? { ...i, comments: [nc, ...i.comments] } : i)));
    this.newCommentText[id] = '';
  }

  likeComment(ideaId: string, commentId: string) {
    if (this.readonly()) return;
    const fn = (cc: Comment[]): Comment[] => cc.map((c) => c.id === commentId ? { ...c, likes: c.likes + 1 } : c.replies ? { ...c, replies: fn(c.replies) } : c);
    this.ideas.update((l) => l.map((i) => (i.id === ideaId ? { ...i, comments: fn(i.comments) } : i)));
  }

  addReply(ideaId: string, parent: Comment) {
    if (!this.replyText.trim()) return;
    const nr: Comment = { id: 'rep-' + Date.now(), author: 'کاربر سیستم', text: this.replyText, likes: 0, date: 'اکنون', replies: [] };
    const fn = (cc: Comment[]): Comment[] => cc.map((c) => c.id === parent.id ? { ...c, replies: [...(c.replies || []), nr] } : c.replies ? { ...c, replies: fn(c.replies) } : c);
    this.ideas.update((l) => l.map((i) => (i.id === ideaId ? { ...i, comments: fn(i.comments) } : i)));
    this.replyText = '';
    this.activeReplyId.set(null);
  }
}
