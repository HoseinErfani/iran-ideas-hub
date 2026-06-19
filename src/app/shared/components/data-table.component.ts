import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60">
    <div class="overflow-x-auto">
      <table class="min-w-full text-right text-sm">
        <thead class="bg-white/5 text-slate-300">
          <tr>
            @for (col of columns; track col) {
              <th class="whitespace-nowrap px-4 py-4 font-medium">{{ col }}</th>
            }
            <th class="px-4 py-4 font-medium">عملیات</th>
          </tr>
        </thead>
        <tbody>
          @for (row of rows; track row.id) {
            <tr class="border-t border-white/10 hover:bg-white/5">
              <td class="px-4 py-4 text-white">{{ row.name }}</td>
              <td class="px-4 py-4 text-slate-300">{{ row.nationalId }}</td>
              <td class="px-4 py-4 text-slate-300">{{ row.mobile }}</td>
              <td class="px-4 py-4"><span class="rounded-full bg-brand-500/15 px-3 py-1 text-xs text-brand-200">{{ row.level }}</span></td>
              <td class="px-4 py-4">
                <span class="inline-flex h-3 w-3 rounded-full" [class.bg-emerald-400]="row.unread" [class.bg-slate-600]="!row.unread"></span>
              </td>
              <td class="px-4 py-4">
                <button class="rounded-2xl bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10">مشاهده</button>
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
  @Input() columns: string[] = [];
  @Input() rows: any[] = [];
}