import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TreemapItem {
  id: string;
  title: string;
  weight: number;
  badge?: string;
  subCount?: number;
  rawData?: any;
}

interface ProcessedLayoutItem extends TreemapItem {
  percentage: number;
  x: string;
  y: string;
  w: string;
  h: string;
  colorClass: string;
  fontSize: string;
  fontWeightClass: string;
  showText: boolean;
  forceTruncate: boolean;
}

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="w-full h-[580px] relative bg-slate-950 rounded-3xl p-1 overflow-hidden select-none "
      dir="ltr"
    >
      <div
        *ngFor="let item of layoutItems()"
        (click)="onNodeClick.emit(item.rawData)"
        [title]="item.title + (item.subCount ? ' — شامل ' + item.subCount + ' زیر‌مسئله' : '')"
        [style.left]="item.x"
        [style.top]="item.y"
        [style.width]="item.w"
        [style.height]="item.h"
        [ngClass]="[
    item.colorClass,
    'absolute p-3 border border-slate-950 flex flex-col justify-between cursor-pointer transition-all duration-250 hover:brightness-115 group',
     !item.showText ? 'hover:z-50 hover:scale-[1.12] hover:shadow-2xl hover:shadow-black/80' : ''
  ]"
      >
        <div
          [ngClass]="{
            'opacity-0 group-hover:opacity-100 transition-opacity duration-200': !item.showText,
          }"
          class="flex items-center flex-wrap justify-between gap-1 shrink-0 w-full"
          dir="rtl"
        >
          <span
            *ngIf="item.badge"
            class="rounded bg-black/40 px-1.5 py-0.5 text-[9px] text-slate-300 backdrop-blur-sm truncate max-w-[60%]"
          >
            {{ item.badge }}
          </span>
          <span
            class="text-[10px] font-mono text-white/50 bg-black/30 px-1.5 py-0.5 rounded ml-auto"
          >
            {{ item.percentage }}٪
          </span>
          @if (!item.forceTruncate) {
            <p
              class="text-[10px] text-white/70 mt-1 font-medium bg-white/10 inline-block px-1.5 py-0.5 rounded self-start"
              *ngIf="item.subCount"
            >
              {{ item.subCount }} زیر‌مسئله
            </p>
          }
        </div>

        <div
          [style.fontSize]="item.fontSize"
          [ngClass]="item.showText ? 'flex' : 'hidden group-hover:flex animate-fade-in w-[112%]'"
          class="w-full flex-col justify-end text-right mt-2 overflow-y-auto min-h-0 pr-0.5 custom-scrollbar"
          dir="rtl"
          (click)="$event.stopPropagation()"
        >
          <h4
            [ngClass]="[
              item.fontWeightClass,
              'text-white font-normal pl-4 text-justify leading-tight tracking-tight text-shadow-sm w-full',
            ]"
            [class.truncate]="item.forceTruncate"
            [class.break-words]="!item.forceTruncate"
          >
            {{ item.title }}
          </h4>

        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .custom-scrollbar::-webkit-scrollbar {
        width: 3px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 10px;
      }
      .text-shadow-sm {
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.61);
      }

      /* انیمیشن نرم برای پدیدار شدن محتوای باکس‌های ریز هنگام هاور */
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(4px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in {
        animation: fadeIn 0.2s ease-out forwards;
      }
    `,
  ],
})
export class TreemapComponent {
  items = input.required<TreemapItem[]>();
  onNodeClick = output<any>();

  private readonly premiumPalette = [
    'bg-gradient-to-br from-blue-700/50 to-cyan-900/60',
    'bg-gradient-to-br from-amber-700/50 to-orange-900/60',
    'bg-gradient-to-br from-rose-700/50 to-red-900/60',
    'bg-gradient-to-br from-emerald-700/50 to-teal-900/60',
    'bg-gradient-to-br from-indigo-700/50 to-blue-900/60',
    'bg-gradient-to-br from-purple-700/50 to-fuchsia-900/60',
    'bg-gradient-to-br from-pink-700/50 to-rose-900/60',
    'bg-gradient-to-br from-sky-700/50 to-indigo-900/60',
    'bg-gradient-to-br from-violet-700/50 to-purple-900/60',
    'bg-gradient-to-br from-green-700/50 to-emerald-900/60',
    'bg-gradient-to-br from-lime-700/50 to-green-900/60',
    'bg-gradient-to-br from-cyan-700/50 to-blue-950/60',
    'bg-gradient-to-br from-yellow-700/50 to-amber-900/60',
    'bg-gradient-to-br from-blue-800/50 to-indigo-950/60',
    'bg-gradient-to-br from-zinc-700/50 to-slate-900/60',
    'bg-gradient-to-br from-stone-700/50 to-orange-950/60',
    'bg-gradient-to-br from-teal-700/50 to-emerald-900/60',
    'bg-gradient-to-br from-neutral-700/50 to-zinc-900/60',
    'bg-gradient-to-br from-yellow-600/30 to-slate-900/60',
    'bg-gradient-to-br from-emerald-800/40 to-neutral-900/60',
  ];

  layoutItems = computed<ProcessedLayoutItem[]>(() => {
    const rawItems = [...this.items()].sort((a, b) => b.weight - a.weight);
    const totalWeight = rawItems.reduce((sum, i) => sum + i.weight, 0);

    if (totalWeight === 0) return [];

    const containerW = 1000;
    const containerH = 580;
    const totalArea = containerW * containerH;
    const processed: ProcessedLayoutItem[] = [];

    const maxWeight = Math.max(...rawItems.map((i) => i.weight));
    const minWeight = Math.min(...rawItems.map((i) => i.weight));
    const weightRange = maxWeight - minWeight || 1;

    const itemsWithArea = rawItems.map((item) => ({
      ...item,
      percentage: totalWeight ? Math.round((item.weight / totalWeight) * 100) : 0,
      area: (item.weight / totalWeight) * totalArea,
    }));

    let x = 0,
      y = 0,
      width = containerW,
      height = containerH;
    let index = 0;

    while (index < itemsWithArea.length) {
      let row: typeof itemsWithArea = [];
      let isVertical = width >= height;
      let currentLength = isVertical ? height : width;

      while (index < itemsWithArea.length) {
        const nextItem = itemsWithArea[index];
        const testRow = [...row, nextItem];
        if (this.worst(row, currentLength) < this.worst(testRow, currentLength) && row.length > 0) {
          break;
        }
        row = testRow;
        index++;
      }

      const rowArea = row.reduce((sum, item) => sum + item.area, 0);
      const rowThickness = rowArea / currentLength;
      let offset = isVertical ? y : x;

      row.forEach((item) => {
        const itemLength = item.area / rowThickness;
        let itemX = x,
          itemY = y,
          itemW = rowThickness,
          itemH = rowThickness;

        if (isVertical) {
          itemH = itemLength;
          itemY = offset;
          offset += itemH;
        } else {
          itemW = itemLength;
          itemX = offset;
          offset += itemW;
        }

        const idNum = parseInt(item.id.replace(/\D/g, '')) || 0;
        const colorClass = this.premiumPalette[idNum % this.premiumPalette.length];

        const weightRatio = (item.weight - minWeight) / weightRange;
        const calculatedSize = 9.5 + weightRatio * 4;
        const fontSize = `${calculatedSize.toFixed(1)}px`;

        let fontWeightClass = 'font-normal';
        if (weightRatio > 0.75) fontWeightClass = 'font-black';
        else if (weightRatio > 0.5) fontWeightClass = 'font-bold';
        else if (weightRatio > 0.25) fontWeightClass = 'font-medium';

        const boxArea = itemW * itemH;
        // گارد ریل تشخیص المان‌های بسیار کوچک
        let showText = boxArea > 6500 && itemW >= 60 && itemH >= 50;

        // ۱. محاسبه سایز فونت متناسب با وزن

        // ۲. تخمین طول متن به پیکسل (ضریب ۰.۶ برای متوسط عرض کاراکترهای فارسی است)
        const estimatedTextWidth = item.title.length * calculatedSize * 0.6;

        // ۳. شرط فعال‌سازی الیپسیس: اگر طول متن از ۱/۳ عرض باکس بیشتر بود
        const forceTruncate = estimatedTextWidth > itemW / 3;

        processed.push({
          ...item,
          x: `${(itemX / containerW) * 100}%`,
          y: `${(itemY / containerH) * 100}%`,
          w: `${(itemW / containerW) * 100}%`,
          h: `${(itemH / containerH) * 100}%`,
          colorClass,
          fontSize,
          fontWeightClass,
          showText,
          forceTruncate,
        });
      });

      if (isVertical) {
        x += rowThickness;
        width -= rowThickness;
      } else {
        y += rowThickness;
        height -= rowThickness;
      }
    }

    return processed;
  });

  private worst(row: { area: number }[], length: number): number {
    if (row.length === 0) return Infinity;
    const areas = row.map((item) => item.area);
    const sum = areas.reduce((s, a) => s + a, 0);
    return Math.max(
      (length * length * Math.max(...areas)) / (sum * sum),
      (sum * sum) / (length * length * Math.min(...areas)),
    );
  }
}
