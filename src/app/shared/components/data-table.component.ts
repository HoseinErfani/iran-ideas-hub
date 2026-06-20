import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60">
      <div class="overflow-x-auto max-h-[calc(100vh-355px)] overflow-y-auto custom-scrollbar">
        <table class="min-w-full text-right text-sm">
          <thead class="bg-white/5 text-slate-300 sticky top-0 backdrop-blur-3xl z-10">
          <tr>
            @for (col of columns(); track col) {
              <th class="whitespace-nowrap px-4 py-4 font-medium">{{ col }}</th>
            }
            <th class="px-4 py-4 font-medium">عملیات</th>
          </tr>
          </thead>
          <tbody>
            @for (row of rows(); track row.id) {
              <tr
                (click)="rowClick.emit(row)"
                [ngClass]="selectedId() === row.id ? 'bg-brand-500/15 border-r-4 border-r-brand-400' : 'hover:bg-white/5'"
                class="border-t border-white/10 transition-colors cursor-pointer"
              >
                <td class="px-4 py-4 text-white font-medium">{{ row.name }}</td>
                <td class="px-4 py-4 text-slate-300 font-mono" dir="ltr">{{ row.nationalId }}</td>
                <td class="px-4 py-4 text-slate-300 font-mono" dir="ltr">{{ row.mobile }}</td>
                <td class="px-4 py-4">
                <span
                  [ngClass]="{
                    'bg-cyan-500/15 text-cyan-300': row.level.includes('نخبه 2'),
                    'bg-amber-500/15 text-amber-300': row.level.includes('نخبه 1'),
                    'bg-slate-500/15 text-slate-300': row.level.includes('کاربر ویژه')
                  }"
                  class="rounded-full px-3 py-1 text-xs font-semibold"
                >
                  {{ row.level }}
                </span>
                </td>
                <td class="px-4 py-4">
                  <span class="inline-flex h-2.5 w-2.5 rounded-full" [class.bg-emerald-400]="row.unread" [class.bg-slate-600]="!row.unread"></span>
                </td>
                <td class="px-4 py-4" (click)="$event.stopPropagation()">
                  <button
                    (click)="rowClick.emit(row)"
                    class="rounded-xl bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 transition"
                  >
                    مشاهده
                  </button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td [attr.colspan]="columns().length + 1" class="text-center py-8 text-slate-400">
                  هیچ کاربری با این مشخصات یافت نشد.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class DataTableComponent {
  columns = input<string[]>([]);
  rows = input<any[]>([]);
  selectedId = input<number | null>(null);
  rowClick = output<any>();
}
