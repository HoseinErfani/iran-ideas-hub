import { Component, input, signal, computed, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  fullHtmlContent: string; // 🔑 اضافه شدن فیلد داکیومنت کامل HTML
  likes: number;
  author: Author;
  attachments?: Attachment[];
  comments: Comment[];
}

// 📄 یک ماک HTML طولانی برای شبیه‌سازی یک داکیومنت ۵ صفحه‌ای
const MOCK_HTML_DOCUMENT = `
  <div class="space-y-8 text-sm leading-8 text-slate-300 pb-10">
    <div>
      <h2 class="text-xl sm:text-2xl font-black text-cyan-400 mb-4 border-b border-white/10 pb-3">۱. طرح مسئله و ضرورت اجرا</h2>
      <p class="mb-4 text-justify">
        در دنیای امروز و با توجه به محدودیت‌های شدید منابع، مدیریت هوشمند و مبتنی بر داده دیگر یک انتخاب نیست، بلکه یک ضرورت است. این طرح توجیهی با بررسی دقیق گلوگاه‌های فعلی سیستم، راهکاری جامع بر پایه فناوری‌های نوین ارائه می‌دهد که هدف آن کاهش اتلاف منابع و افزایش بهره‌وری تا مرز استانداردهای جهانی است.
      </p>
      <div class="bg-cyan-500/10 p-5 rounded-2xl border-r-4 border-cyan-500 my-6 shadow-inner">
        <strong class="text-white block mb-1">💡 نکته کلیدی استراتژیک:</strong>
        <span class="text-cyan-100">برآوردهای اولیه نشان می‌دهد پیاده‌سازی این سیستم قابلیت کاهش ۳۰ درصدی هزینه‌های عملیاتی (OPEX) را در همان ۱۲ ماه نخست داراست.</span>
      </div>
    </div>

    <div>
      <h2 class="text-xl sm:text-2xl font-black text-cyan-400 mb-4 border-b border-white/10 pb-3">۲. معماری فنی و ساختار سیستم</h2>
      <p class="mb-4">معماری پیشنهادی بر پایه میکروسرویس‌ها (Microservices) و استفاده از دیتابیس‌های توزیع‌شده طراحی شده است. لایه‌های اصلی این معماری به شرح زیر است:</p>
      <ul class="list-disc pr-6 space-y-3 mt-4 marker:text-cyan-500 bg-white/[0.02] p-6 rounded-2xl border border-white/5">
        <li><strong class="text-white">لایه جمع‌آوری داده (Edge Tier):</strong> شامل شبکه‌ای از سنسورها و کنترلرهای محلی با مصرف انرژی پایین (Low-Power) و ارتباط از طریق پروتکل MQTT.</li>
        <li><strong class="text-white">لایه پردازش (Fog/Cloud Tier):</strong> کلاسترهای پردازشی توزیع‌شده با قابلیت تصمیم‌گیری در لحظه (Real-time Analytics).</li>
        <li><strong class="text-white">لایه هوش مصنوعی (AI Tier):</strong> پیاده‌سازی مدل‌های یادگیری عمیق (Deep Learning) جهت تشخیص الگوهای ناهنجار و پیش‌بینی بحران.</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl sm:text-2xl font-black text-cyan-400 mb-4 border-b border-white/10 pb-3">۳. فازبندی اجرا و زمان‌بندی پروژه</h2>
      <p class="mb-4">جهت کاهش ریسک پیاده‌سازی، پروژه در ۳ فاز عملیاتی مجزا با مایل‌استون‌های مشخص اجرا خواهد شد:</p>
      <div class="overflow-x-auto rounded-2xl border border-white/10">
        <table class="w-full text-right border-collapse">
          <thead>
            <tr class="bg-white/10 text-white">
              <th class="p-4 font-bold border-b border-white/10">فاز عملیاتی</th>
              <th class="p-4 font-bold border-b border-white/10">شرح اقدامات کلیدی</th>
              <th class="p-4 font-bold border-b border-white/10">مدت زمان تخمینی</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr class="bg-white/[0.02] hover:bg-white/5 transition-colors">
              <td class="p-4 font-medium text-cyan-300">فاز اول</td>
              <td class="p-4">مطالعات تطبیقی، تامین تجهیزات زیرساخت و طراحی پایگاه داده</td>
              <td class="p-4 font-mono">۲ ماه</td>
            </tr>
            <tr class="hover:bg-white/5 transition-colors">
              <td class="p-4 font-medium text-cyan-300">فاز دوم</td>
              <td class="p-4">پیاده‌سازی پایلوت در مقیاس محدود و دیباگینگ سخت‌افزاری</td>
              <td class="p-4 font-mono">۴ ماه</td>
            </tr>
            <tr class="bg-white/[0.02] hover:bg-white/5 transition-colors">
              <td class="p-4 font-medium text-cyan-300">فاز سوم</td>
              <td class="p-4">توسعه در مقیاس ملی، آموزش منابع انسانی و تحویل نهایی</td>
              <td class="p-4 font-mono">۶ ماه</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="text-center pt-8 border-t border-white/10 text-slate-500 text-xs">
      پایان سند مستندات. (این یک نمونه متن شبیه‌سازی شده برای تست ظرفیت نمایش HTML چند صفحه‌ای است.)
    </div>
  </div>
`;

@Component({
  selector: 'app-idea-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  encapsulation: ViewEncapsulation.None, // برای اعمال استایل‌ها روی محتوای [innerHTML]
  template: `
    <div class="space-y-4 text-white relative" [ngClass]="styleClass()" dir="rtl">

      @for (idea of sortedIdeas(); track idea.id) {
        <div class="glass rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-cyan-500/5">

          <div
            (click)="toggleAccordion(idea.id)"
            class="p-5 flex items-center justify-between gap-4 cursor-pointer select-none hover:bg-white/[0.01] transition-colors"
          >
            <h4 class="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-l from-white to-slate-200 leading-snug flex-1">
              {{ idea.title }}
            </h4>

            <div class="flex items-center gap-3 shrink-0" (click)="$event.stopPropagation()">
              <button
                (click)="likeIdea(idea.id)"
                class="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/30 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition duration-300"
              >
                <span>❤️</span> <span class="font-mono">{{ idea.likes }}</span>
              </button>

              <button
                (click)="toggleAccordion(idea.id)"
                class="p-2 bg-white/5 border border-white/10 rounded-xl text-xs hover:bg-white/10 transition-transform duration-300"
                [class.rotate-180]="isExpanded(idea.id)"
              >
                ▼
              </button>
            </div>
          </div>

          <div
            [ngClass]="isExpanded(idea.id) ? 'grid-rows-[1fr] border-t border-white/5' : 'grid-rows-[0fr]'"
            class="grid transition-all duration-300 ease-in-out bg-black/20"
          >
            <div class="overflow-hidden">
              <div class="p-6 space-y-6">

                <div class="flex items-center gap-3.5 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                  <div class="relative">
                    <div class="w-11 h-11 rounded-full border-2 border-cyan-500/20 p-0.5 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-base font-bold text-cyan-400 select-none">
                      {{ idea.author.name.charAt(0) }}
                    </div>
                    <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse"></span>
                  </div>
                  <div>
                    <h5 class="text-xs sm:text-sm font-bold text-slate-200">{{ idea.author.name }}</h5>
                    <p class="text-[11px] text-slate-400 mt-0.5">{{ idea.author.role }}</p>
                  </div>
                </div>

                <div class="bg-gradient-to-br from-white/[0.03] to-transparent p-5 rounded-xl border border-white/5">
                  <h6 class="text-xs font-bold text-cyan-400 mb-2">📄 چکیده ایده:</h6>
                  <p class="text-slate-300 text-sm leading-7 font-normal mb-5 line-clamp-3">
                    {{ idea.description }}
                  </p>

                  <button
                    (click)="openModal(idea)"
                    class="w-full sm:w-auto flex items-center justify-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                  >
                    <span>📑</span> مشاهده سند کامل فنی ({{ idea.fullHtmlContent.length > 0 ? 'چند صفحه‌ای' : 'خالی' }})
                  </button>
                </div>

                @if (idea.attachments && idea.attachments.length) {
                  <div class="space-y-2">
                    <h6 class="text-xs font-bold text-slate-400">فایل‌های ضمیمه:</h6>
                    <div class="flex flex-wrap gap-2.5">
                      @for (file of idea.attachments; track file.name) {
                        <div class="flex items-center gap-3 bg-white/[0.02] hover:bg-white/5 border border-white/5 hover:border-white/10 rounded-xl px-4 py-2 text-xs transition-colors duration-300 cursor-pointer group">
                          <span [ngSwitch]="file.type">
                            <span *ngSwitchCase="'pdf'" class="text-rose-400">📁</span>
                            <span *ngSwitchCase="'zip'" class="text-amber-400">📦</span>
                            <span *ngSwitchCase="'doc'" class="text-blue-400">📝</span>
                            <span *ngSwitchDefault class="text-cyan-400">🖼️</span>
                          </span>
                          <div class="min-w-0">
                            <p class="text-slate-300 font-medium truncate max-w-[180px] group-hover:text-cyan-300">{{ file.name }}</p>
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
                      <span class="text-xs bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded font-mono">{{ idea.comments.length }} نظر</span>
                      <h5 class="text-xs sm:text-sm font-bold text-slate-300">بحث و تبادل نظر نخبگان</h5>
                    </div>
                    <button
                      (click)="toggleCommentsVisibility(idea.id)"
                      class="text-[11px] bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-400 px-2.5 py-1 rounded-lg border border-white/5 transition duration-300"
                    >
                      {{ isCommentsHidden(idea.id) ? '👁️ نمایش نظرات' : '🙈 مخفی کردن نظرات' }}
                    </button>
                  </div>

                  @if (!isCommentsHidden(idea.id)) {
                    <div class="space-y-4 animate-fade-in">
                      @if (!readonly()) {
                        <div class="flex gap-2 items-center">
                          <input
                            [(ngModel)]="newCommentText[idea.id]"
                            placeholder="دیدگاه یا نقد خود را وارد کنید..."
                            class="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 text-white placeholder:text-slate-500"
                          />
                          <button
                            (click)="addRootComment(idea.id)"
                            class="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap"
                          >
                            ثبت نظر
                          </button>
                        </div>
                      }
                      <div class="space-y-2">
                        <ng-container *ngTemplateOutlet="commentList; context: { $implicit: idea.comments, ideaId: idea.id }"></ng-container>
                      </div>
                    </div>
                  } @else {
                    <div class="text-center py-4 text-[11px] text-slate-500 bg-white/[0.01] rounded-xl border border-dashed border-white/5 cursor-pointer" (click)="toggleCommentsVisibility(idea.id)">
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
        <div
          class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
          (click)="closeModal()"
        ></div>

        <div
          class="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up"
        >
          <div class="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-white/[0.02]">
            <div class="pr-2 border-r-4 border-cyan-500">
              <h2 class="text-lg sm:text-xl font-black text-white leading-tight">{{ selectedModalIdea()?.title }}</h2>
              <p class="text-xs text-slate-400 mt-1">سند فنی ارائه شده توسط: {{ selectedModalIdea()?.author?.name }}</p>
            </div>

            <button
              (click)="closeModal()"
              class="text-slate-400 hover:text-white bg-white/5 hover:bg-rose-500/80 p-2.5 rounded-xl transition duration-300"
              title="بستن پنجره"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <div class="p-6 sm:p-8 overflow-y-auto flex-1 custom-scrollbar">
            <div [innerHTML]="selectedModalIdea()?.fullHtmlContent" class="html-document-container"></div>
          </div>

          <div class="p-4 border-t border-white/5 bg-black/20 flex justify-end">
            <button
              (click)="closeModal()"
              class="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition duration-300"
            >
              بستن مستندات
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
              <button (click)="likeComment(ideaId, comment.id)" class="text-slate-400 hover:text-rose-400 transition-colors">❤️ {{ comment.likes }}</button>
              @if (!readonly()) {
                <button (click)="activeReplyId.set(comment.id)" class="text-cyan-400 font-medium">پاسخ</button>
              }
            </div>

            @if (activeReplyId() === comment.id && !readonly()) {
              <div class="flex gap-2 mt-2 animate-fade-in">
                <input [(ngModel)]="replyText" placeholder="پاسخ خود را بنویسید..." class="flex-1 bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none" />
                <button (click)="addReply(ideaId, comment)" class="bg-white/10 px-3 py-1 rounded-lg text-[11px]">ثبت</button>
              </div>
            }
          </div>
          @if (comment.replies?.length) {
            <div class="mr-1">
              <ng-container *ngTemplateOutlet="commentList; context: { $implicit: comment.replies, ideaId: ideaId }"></ng-container>
            </div>
          }
        </div>
      }
    </ng-template>

    <style>
      .custom-scrollbar::-webkit-scrollbar { width: 6px; }
      .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
      .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(6, 182, 212, 0.3); border-radius: 10px; }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(6, 182, 212, 0.6); }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .animate-fade-in-up { animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    </style>
  `
})
export class IdeaBoardComponent implements OnInit {
  readonly readonly = input<boolean>(false);
  readonly issueId = input.required<string>();
  readonly styleClass = input<string>('');

  activeReplyId = signal<string | null>(null);
  replyText = '';
  newCommentText: { [key: string]: string } = {};

  private expandedIdeaIds = signal<Set<string>>(new Set());
  private hiddenCommentIdeaIds = signal<Set<string>>(new Set());

  // 🔑 متغیر سیگنال برای مدیریت ایده انتخاب شده جهت نمایش در پاپ‌آپ
  selectedModalIdea = signal<Idea | null>(null);

  // دیتای ماک با اضافه شدن fullHtmlContent به تمام آیتم‌ها
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
        { id: 'c1-1', author: 'دکتر علوی', text: 'طرح خوبیه.', likes: 24, date: '۲ ساعت قبل', replies: [] }
      ]
    },
    {
      id: 'idea-2',
      title: 'اصلاح الگوی کشت حوضه آبریز با سوبسید معکوس مالی',
      description: 'قطع کامل سوبسید کود و سم برای محصولات آب‌بر مانند هندوانه و تخصیص آن به صورت تسهیلات بلاعوض گلخانه‌ای.',
      fullHtmlContent: MOCK_HTML_DOCUMENT,
      likes: 98,
      author: { name: 'مهندس فرزاد فرخی', role: 'پژوهشگر اقتصاد کشاورزی', avatar: '' },
      comments: []
    },
    {
      id: 'idea-3',
      title: 'توسعه شبکه فیبر نوری با تهاتر فرکانسی اپراتورها',
      description: 'الزام اپراتورهای همراه به تهاتر هزینه‌های فرکانسی سالانه با حفر، داکت‌گذاری و اتصال پورت‌های فیبر نوری خانگی شهری.',
      fullHtmlContent: MOCK_HTML_DOCUMENT,
      likes: 210,
      author: { name: 'مهندس سهراب سپهری', role: 'مدیر زیرساخت', avatar: '' },
      comments: []
    }
    // سایر ایده‌ها به دلیل جلوگیری از طولانی شدن کد، در اینجا مخفی شده‌اند، در پروژه واقعی مپ می‌شوند.
  ]);

  sortedIdeas = computed(() => [...this.ideas()].sort((a, b) => b.likes - a.likes));

  ngOnInit() {
    const allIds = this.ideas().map(i => i.id);
    this.hiddenCommentIdeaIds.set(new Set(allIds));
  }

  // 🔑 متدهای کنترل پاپ‌آپ (Modal)
  openModal(idea: Idea) {
    this.selectedModalIdea.set(idea);
    // قفل کردن اسکرول صفحه پشتی هنگام باز بودن پاپ‌آپ
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedModalIdea.set(null);
    // بازگرداندن اسکرول صفحه
    document.body.style.overflow = 'auto';
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
