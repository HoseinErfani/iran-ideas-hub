import { computed, Injectable, signal } from '@angular/core';
import { TreemapItem } from '../components/treemap.component';
import { BreadcrumbItem } from '../components/breadcrumb.component';
interface NationalIssue {
  id: string;
  title: string;
  level: string;
  weight: number;
  children?: NationalIssue[];
}

@Injectable()
export class IssueService {
  currentLevel = signal<1 | 2 | 3>(1);
  selectedFirstLevel = signal<NationalIssue | null>(null);
  selectedSecondLevel = signal<NationalIssue | null>(null);

  // ۱. دیتای پایه بیست موضوع کلان کشور
  private readonly baseIssues = [
    { id: 'w-1', title: 'بحران آب و خشکسالی' },
    { id: 'e-2', title: 'ناترازی شدید انرژی و برق' },
    { id: 'inf-3', title: 'تورم و بی‌ثباتی پولی' },
    { id: 'h-4', title: 'رکود مسکن و بافت فرسوده' },
    { id: 't-5', title: 'آلودگی هوا و حمل‌ونقل فرسوده' },
    { id: 'p-6', title: 'بحران صندوق‌های بازنشستگی' },
    { id: 'pop-7', title: 'کاهش نرخ رشد جمعیت و پیری' },
    { id: 'mig-8', title: 'مهاجرت نخبگان و نیروی کار' },
    { id: 'med-9', title: 'چالش‌های زنجیره دارو و سلامت' },
    { id: 'f-10', title: 'امنیت غذایی و زراعت سنتی' },
    { id: 'wst-11', title: 'بحران پسماند و بازیافت' },
    { id: 'edu-12', title: 'عدالت آموزشی و کیفیت مدارس' },
    { id: 'tax-13', title: 'فرار مالیاتی و اقتصاد پنهان' },
    { id: 'net-14', title: 'توسعه پهنای باند و کسب‌وکار آنلاین' },
    { id: 'job-15', title: 'بیکاری فارغ‌التحصیلان دانشگاهی' },
    { id: 'smg-16', title: 'قاچاق کالا و سوخت مرزی' },
    { id: 'tou-17', title: 'ضعف توسعه زیرساخت توریست' },
    { id: 'inv-18', title: 'کاهش جذب سرمایه‌گذاری خارجی' },
    { id: 'cry-19', title: 'چالش مقررات‌گذاری رمزپایه' },
    { id: 'env-20', title: 'ریزگردهای مرزی و آلودگی خاک' },
  ];

  private readonly subIssueTokens = [
    'فرسودگی شدید ساختارها و تجهیزات سیستم',
    'ضعف مکانیزاسیون و پایش هوشمند فناوری',
    'عدم توازن تخصیص بودجه و منابع در بازه سالانه',
    'بوروکراسی پیچیده اداری در صدور مجوزها',
    'خلاء قانونی و نبود ابزار نظارتی بالادستی',
    'رانت اطلاعاتی و لایه‌های پنهان در توزیع عادلانه',
    'کاهش مشارکت جدی و سرمایه‌گذاری بخش خصوصی',
    'پاسخگویی ضعیف نهادهای متولی به نیاز کلان',
    'عدم هماهنگی بین‌دستگاهی و موازی‌کاری مفرط',
    'توزیع ناعادلانه یارانه‌ها و سوبسیدهای حمایتی',
    'تخریب جدی منابع زیست‌محیطی پیرامونی چالش',
    'فقدان استانداردهای به‌روز و تطبیق‌های جهانی',
    'شکاف عمیق ساختاری بین پایتخت و مناطق مرزی',
    'رشد بازارهای غیررسمی و دلالی در ابعاد خرد',
    'وابستگی شدید زنجیره به تامین‌کنندگان خارجی',
    'عدم آموزش، فرهنگ‌سازی و جلب مشارکت عمومی',
    'ناپایداری فرآیندها ناشی از نوسانات تصمیم‌گیری',
    'ضعف سیستم‌های امنیت سایبری و پایداری داده',
    'کاهش شدید راندمان بازدهی در مقیاس خروجی نهایی',
    'موانع ناشی از ریسک‌های اعتباری و عدم قطعیت‌ها',
  ];

  readonly rawIssues: NationalIssue[] = this.baseIssues.map((issue, rootIndex) => {
    const children: NationalIssue[] = Array.from({ length: 20 }, (_, subIndex) => ({
      id: `${issue.id}-${subIndex + 1}`,
      title: `${this.subIssueTokens[subIndex]} در حوزه (${issue.title})`,
      level: 'جزئی',
      weight:
        Math.floor(Math.random() * 10) % 2 === 0
          ? Math.floor(Math.random() * 50) + 15
          : Math.floor(Math.random() * 500) + 15,
    }));

    return {
      id: issue.id,
      title: issue.title,
      level: 'ملی',
      weight:
        Math.floor(Math.random() * 10) % 2 === 0
          ? Math.floor(Math.random() * 50) + 15
          : Math.floor(Math.random() * 500) + 15,
      children: children,
    };
  });

  // تبدیل دیتای بیزینس به ساختار دیتای تری‌مپ عمومی
  mappedTreemapData = computed<TreemapItem[]>(() => {
    const data =
      this.currentLevel() === 1 ? this.rawIssues : this.selectedFirstLevel()?.children || [];
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      weight: item.weight,
      badge: item.level,
      subCount: item.children?.length,
      rawData: item,
    }));
  });

  // تولید داینامیک دیتای بردکرامب عمومی بر اساس وضعیت فعلی سیگنال‌ها
  breadcrumbData = computed<BreadcrumbItem[]>(() => {
    const list: BreadcrumbItem[] = [{ label: 'نظام مسائل کشور', level: 1 }];
    if (this.currentLevel() >= 2 && this.selectedFirstLevel()) {
      list.push({
        label: this.selectedFirstLevel()!.title,
        id: this.selectedFirstLevel()!.id,
        level: 2,
      });
    }
    if (this.currentLevel() === 3 && this.selectedSecondLevel()) {
      list.push({
        label: this.selectedSecondLevel()!.title,
        id: this.selectedSecondLevel()!.id,
        level: 3,
      });
    }
    return list;
  });

  handleNodeSelect(node: NationalIssue) {
    if (this.currentLevel() === 1) {
      this.selectedFirstLevel.set(node);
      this.currentLevel.set(node.children?.length ? 2 : 3);
      if (!node.children?.length) this.selectedSecondLevel.set(node);
    } else if (this.currentLevel() === 2) {
      this.selectedSecondLevel.set(node);
      this.currentLevel.set(3);
    }
  }

  handleBreadcrumbNav(item: BreadcrumbItem) {
    this.currentLevel.set(item.level as 1 | 2 | 3);
    if (item.level === 1) {
      this.selectedFirstLevel.set(null);
      this.selectedSecondLevel.set(null);
    }
    if (item.level === 2) {
      this.selectedSecondLevel.set(null);
    }
  }
}
