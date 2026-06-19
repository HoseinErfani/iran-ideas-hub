import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  likes: number;
  comments: Comment[];
}

@Component({
  selector: 'app-idea-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-4 text-white " [ngClass]="styleClass()" dir="rtl">
      <div
        *ngFor="let idea of sortedIdeas()"
        class="glass rounded-3xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300"
      >
        <div
          (click)="toggleAccordion(idea.id)"
          class="flex justify-between items-center p-6 cursor-pointer hover:bg-white/[0.02] select-none transition-colors"
        >
          <div class="flex items-center gap-3">
            <span
              [class.rotate-180]="isExpanded(idea.id)"
              class="text-xs text-slate-400 transition-transform duration-300"
            >
              ▼
            </span>
            <h4 class="text-lg font-bold text-brand-400 leading-none">{{ idea.title }}</h4>
          </div>

          <div class="flex items-center gap-3" (click)="$event.stopPropagation()">
            <span class="text-xs bg-white/5 px-2.5 py-1 rounded-lg text-slate-400">
              {{ idea.comments.length }} نظر
            </span>
            <button
              (click)="likeIdea(idea.id)"
              class="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-2xl transition"
            >
              <span>👍</span> <span>{{ idea.likes }}</span>
            </button>
          </div>
        </div>

        <div
          [ngClass]="isExpanded(idea.id) ? 'grid-rows-[1fr] border-t ' : 'grid-rows-[0fr]'"
          class="grid transition-all duration-300 ease-in-out border-white/5"
        >
          <div class="overflow-hidden">
            <div class="p-6 pt-2 space-y-4">
              <p class="text-slate-300 text-sm leading-7">{{ idea.description }}</p>

              <div class="border-t border-white/5 pt-4 space-y-4">
                <h5 class="text-sm font-semibold text-slate-400">
                  نظرات و راهکارها ({{ idea.comments.length }})
                </h5>

                <div class="flex gap-3" *ngIf="!readonly()">
                  <input
                    [(ngModel)]="newCommentText[idea.id]"
                    placeholder="راهکار خود را بنویسید..."
                    class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 text-white"
                  />
                  <button
                    (click)="addRootComment(idea.id)"
                    class="bg-brand-500 hover:bg-brand-600 px-4 py-2 rounded-xl text-sm font-semibold transition"
                  >
                    ارسال
                  </button>
                </div>

                <div class="space-y-4 mt-6">
                  <ng-container
                    *ngTemplateOutlet="
                      commentList;
                      context: { $implicit: idea.comments, ideaId: idea.id }
                    "
                  ></ng-container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ng-template #commentList let-comments let-ideaId="ideaId">
        <div *ngFor="let comment of comments" class="space-y-3 pr-4 border-r border-white/10 mt-3">
          <div class="bg-white/[0.02] p-3 rounded-2xl border border-white/5">
            <div class="flex justify-between text-xs text-slate-400 mb-1">
              <span class="font-bold text-slate-300">{{ comment.author }}</span>
              <span>{{ comment.date }}</span>
            </div>
            <p class="text-sm text-slate-200">{{ comment.text }}</p>
            <div class="flex items-center gap-4 mt-2 text-xs">
              <button
                (click)="likeComment(ideaId, comment.id)"
                class="text-slate-400 hover:text-white"
              >
                👍 {{ comment.likes }}
              </button>
              <button
                *ngIf="!readonly()"
                (click)="activeReplyId.set(comment.id)"
                class="text-brand-400 hover:underline"
              >
                پاسخ
              </button>
            </div>
            <div *ngIf="activeReplyId() === comment.id && !readonly()" class="flex gap-2 mt-3">
              <input
                [(ngModel)]="replyText"
                placeholder="پاسخ شما..."
                class="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
              />
              <button
                (click)="addReply(ideaId, comment)"
                class="bg-slate-750 border border-white/20 px-3 py-1.5 rounded-lg text-xs hover:bg-white/10"
              >
                ثبت
              </button>
            </div>
          </div>
          <div *ngIf="comment.replies?.length" class="mr-2">
            <ng-container
              *ngTemplateOutlet="
                commentList;
                context: { $implicit: comment.replies, ideaId: ideaId }
              "
            ></ng-container>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class IdeaBoardComponent {
  readonly = input<boolean>(false);
  issueId = input.required<string>();
  styleClass = input<string>('');
  activeReplyId = signal<string | null>(null);
  replyText = '';
  newCommentText: { [key: string]: string } = {};

  // مدیریت وضعیت باز/بسته بودن آکاردئون‌ها بدون تغییر ساختار داده اصلی
  private expandedIdeaIds = signal<Set<string>>(new Set());

  readonly ideas = signal<Idea[]>([
    {
      id: 'idea-1',
      title: 'هوشمندسازی تخصیص حقابه با اینترنت اشیا (IoT)',
      description:
        'نصب سنسورهای دبی‌سنج پایش برخط در خروجی سدها و ورودی کانال‌های کشاورزی جهت جلوگیری از برداشت غیرمجاز آب.',
      likes: 142,
      comments: [
        {
          id: 'c-1-1',
          author: 'دکتر علوی',
          text: 'طرح خوبیه اما زیرساخت اینترنت پایداری در مزارع دورافتاده نداریم.',
          likes: 24,
          date: '۲ ساعت قبل',
          replies: [
            {
              id: 'c-1-2',
              author: 'مهندس رضایی',
              text: 'میشه از پروتکل LoRaWAN استفاده کرد که نیاز به سیم‌کارت و اینترنت سلولار نداره.',
              likes: 15,
              date: '۱ ساعت قبل',
              replies: [
                {
                  id: 'c-1-3',
                  author: 'سارا امینی',
                  text: 'هزینه نگهداری با لورا به شدت کاهش پیدا می‌کنه، من موافقم.',
                  likes: 4,
                  date: '۳۰ دقیقه قبل',
                },
              ],
            },
          ],
        },
        {
          id: 'c-1-4',
          author: 'امین زارعی',
          text: 'سرقت خود سنسورها در مناطق بیابانی چالش بزرگی خواهد بود.',
          likes: 9,
          date: '۴ ساعت قبل',
        },
      ],
    },
    {
      id: 'idea-2',
      title: 'اصلاح الگوی کشت حوضه آبریز با سوبسید معکوس',
      description:
        'قطع کامل سوبسید کود و سم برای محصولات آب‌بر مانند هندوانه و یونجه و تخصیص آن به کشت‌های گلخانه‌ای.',
      likes: 98,
      comments: [
        {
          id: 'c-2-1',
          author: 'کشاورز نمونه',
          text: 'بدون جایگزین درآمدی، کشاورزها مقاومت می‌کنند و صنف شاکی میشه.',
          likes: 31,
          date: '۱ روز قبل',
          replies: [
            {
              id: 'c-2-2',
              author: 'دکتر صدری',
              text: 'صندوق حمایت باید مابه‌التفاوت درآمدی سال اول رو به عنوان وام بلاعوض پرداخت کنه.',
              likes: 12,
              date: '۱۲ ساعت قبل',
            },
          ],
        },
        {
          id: 'c-2-3',
          author: 'مریم حسینی',
          text: 'اجرای این طرح امنیت غذایی خرد رو تو بعضی استان‌ها به خطر نمی‌اندازه؟',
          likes: 3,
          date: '۵ ساعت قبل',
        },
      ],
    },
    {
      id: 'idea-3',
      title: 'توسعه شبکه فیبر نوری منازل با سرمایه‌گذاری اپراتورهای سیار',
      description:
        'الزام اپراتورهای همراه به تهاتر درآمد فرکانسی جهت حفر و داکت‌گذاری شبکه ثابت شهری.',
      likes: 210,
      comments: [
        {
          id: 'c-3-1',
          author: 'کیوان تک',
          text: 'انحصار شرکت مخابرات در داکت‌های زمینی مانع اصلی شرکت‌های خصوصیه.',
          likes: 45,
          date: '۳ ساعت قبل',
          replies: [
            {
              id: 'c-3-2',
              author: 'امید ناظمی',
              text: 'طبق قانون جدید شورای عالی فضای مجازی، مخابرات مکلف به اشتراک‌گذاری فضا شده.',
              likes: 22,
              date: '۲ ساعت قبل',
            },
          ],
        },
      ],
    },
    {
      id: 'idea-4',
      title: 'تاسیس بورس انرژی و توکن‌سازی ظرفیت مازاد برق صنعتی',
      description:
        'امکان فروش مستقیم برق تولیدی صنایع نیروگاهی خرد به بخش خصوصی از طریق پلتفرم بلاکچینی دیسپاچینگ.',
      likes: 185,
      comments: [
        {
          id: 'c-4-1',
          author: 'مهندس اکبری',
          text: 'بستر شبکه توزیع توان تحمل ترانزیت نوسانی بازار آزاد رو نداره.',
          likes: 19,
          date: '۵ ساعت قبل',
          replies: [
            {
              id: 'c-4-2',
              author: 'صادق ارزنده',
              text: 'توانیر می‌تونه فقط کارمزد ترانزیت (Wheel Fee) بگیره و دخالتی در قیمت‌گذاری نکنه.',
              likes: 14,
              date: '۳ ساعت قبل',
            },
          ],
        },
      ],
    },
    {
      id: 'idea-5',
      title: 'طراحی سامانه یکپارچه مانیتورینگ فرار مالیاتی پزشکان و وکلا',
      description:
        'تطبیق برخط گردش حساب کارتخوان‌ها با پرونده‌های ارجاعی و سوابق ثبتی عدل‌ایران و تاییدیه سلامت.',
      likes: 340,
      comments: [
        {
          id: 'c-5-1',
          author: 'یاسر مهدوی',
          text: 'حساب‌های اجاره‌ای و کارت به کارت به نام منشی‌ها یا اعضای خانواده چی میشه؟',
          likes: 67,
          date: '۶ ساعت قبل',
          replies: [
            {
              id: 'c-5-2',
              author: 'فریدون مالیات',
              text: 'هوش مصنوعی سازمان با بررسی کدهای ملی وابسته، تراکنش‌های مشکوک خانوادگی رو ردیابی میکنه.',
              likes: 41,
              date: '۴ ساعت قبل',
              replies: [
                {
                  id: 'c-5-3',
                  author: 'مینا طاهری',
                  text: 'الگوریتم جدید واریزهای مستمر بالای ۳۰ نفر در ماه رو هم تجاری شناسایی میکنه.',
                  likes: 18,
                  date: '۱ ساعت قبل',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'idea-6',
      title: 'مکانیزاسیون تفکیک پسماند از مبدا با سطل‌های هوشمند شهری',
      description:
        'ارائه پاداش شهروندی (تخفیف مترو و اتوبوس) به ازای تحویل بطری‌های پت و آلومینیوم در ایستگاه‌ها.',
      likes: 122,
      comments: [
        {
          id: 'c-6-1',
          author: 'شهردار شب',
          text: 'هزینه اولیه خرید ماشین‌آلات RVM بسیار بالاست و بازگشت سرمایه طولانی داره.',
          likes: 8,
          date: '۱۰ ساعت قبل',
          replies: [
            {
              id: 'c-6-2',
              author: 'حسین سرمایه‌گذار',
              text: 'میشه از طریق تبلیغات روی بدنه دستگاه‌ها درآمدزایی جانبی ایجاد کرد.',
              likes: 11,
              date: '۸ ساعت قبل',
            },
          ],
        },
      ],
    },
    {
      id: 'idea-7',
      title: 'ساماندهی قاچاق سوخت مرزی با طرح رزاق الکترونیک',
      description:
        'فروش قانون‌مند سهمیه سوخت مازاد به مرزنشینان با قیمت تعادلی جهت صادرات رسمی به کشورهای همسایه.',
      likes: 295,
      comments: [
        {
          id: 'c-7-1',
          author: 'بلوچ‌نیا',
          text: 'این طرح اگر درست اجرا بشه دست واسطه‌های کلان و مافیای اصلی سوخت رو کوتاه می‌کنه.',
          likes: 89,
          date: '۲ روز قبل',
        },
        {
          id: 'c-7-2',
          author: 'سرهنگ مرزبانی',
          text: 'تضمین امنیت جایگاه‌های توزیع مرزی نیاز به هماهنگی شدید لایه‌های امنیتی داره.',
          likes: 24,
          date: '۱ روز قبل',
        },
      ],
    },
    {
      id: 'idea-8',
      title: 'توسعه گردشگری با صدور ویزای دیجیتال زائر و توریست سلامت',
      description:
        'حذف تشریفات کنسولی حضوری و صدور کد الکترونیکی ۷۲ ساعته برای اتباع کشورهای هدف منطقه.',
      likes: 153,
      comments: [
        {
          id: 'c-8-1',
          author: 'آژانس مسافرتی',
          text: 'زیرساخت هتل‌ها و بیمارستان‌های ما هنوز برای پذیرش حجم وسیع توریست آماده نیست.',
          likes: 14,
          date: '۱۲ ساعت قبل',
          replies: [
            {
              id: 'c-8-2',
              author: 'الهام مقدسی',
              text: 'ورود ارز باعث نوسازی و ارتقای سریع خدمات همین بخش‌ها خواهد شد.',
              likes: 9,
              date: '۹ ساعت قبل',
            },
          ],
        },
      ],
    },
  ]);

  sortedIdeas = computed(() => [...this.ideas()].sort((a, b) => b.likes - a.likes));

  isExpanded(id: string): boolean {
    return this.expandedIdeaIds().has(id);
  }

  toggleAccordion(id: string) {
    this.expandedIdeaIds.update((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id); // در صورت نیاز به تک‌کارت‌باز، متد next.clear() را قبل از این خط اضافه کنید.
      }
      return next;
    });
  }

  likeIdea(id: string) {
    if (this.readonly()) {
      return;
    }
    this.ideas.update((l) => l.map((i) => (i.id === id ? { ...i, likes: i.likes + 1 } : i)));
  }

  addRootComment(id: string) {
    const text = this.newCommentText[id];
    if (!text?.trim()) return;
    const nc: Comment = {
      id: 'rc-' + Date.now(),
      author: 'کاربر سیستم',
      text,
      likes: 0,
      date: 'اکنون',
      replies: [],
    };
    this.ideas.update((l) =>
      l.map((i) => (i.id === id ? { ...i, comments: [nc, ...i.comments] } : i)),
    );
    this.newCommentText[id] = '';
  }

  likeComment(ideaId: string, commentId: string) {
    if (this.readonly()) {
      return;
    }
    const fn = (cc: Comment[]): Comment[] =>
      cc.map((c) =>
        c.id === commentId
          ? { ...c, likes: c.likes + 1 }
          : c.replies
            ? { ...c, replies: fn(c.replies) }
            : c,
      );
    this.ideas.update((l) =>
      l.map((i) => (i.id === ideaId ? { ...i, comments: fn(i.comments) } : i)),
    );
  }

  addReply(ideaId: string, parent: Comment) {
    if (!this.replyText.trim()) return;
    const nr: Comment = {
      id: 'rep-' + Date.now(),
      author: 'کاربر سیستم',
      text: this.replyText,
      likes: 0,
      date: 'اکنون',
      replies: [],
    };
    const fn = (cc: Comment[]): Comment[] =>
      cc.map((c) =>
        c.id === parent.id
          ? { ...c, replies: [...(c.replies || []), nr] }
          : c.replies
            ? { ...c, replies: fn(c.replies) }
            : c,
      );
    this.ideas.update((l) =>
      l.map((i) => (i.id === ideaId ? { ...i, comments: fn(i.comments) } : i)),
    );
    this.replyText = '';
    this.activeReplyId.set(null);
  }
}
