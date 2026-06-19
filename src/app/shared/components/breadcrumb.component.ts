import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BreadcrumbItem {
  label: string;
  id?: string;
  level: number;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav
      class="glass rounded-3xl p-4 bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-2 text-sm text-slate-400"
      dir="rtl"
    >
      <div *ngFor="let item of items(); let last = last" class="flex items-center gap-2">
        <span
          (click)="!last && onItemClick.emit(item)"
          [ngClass]="{
            'hover:text-white cursor-pointer transition': !last,
            'text-brand-400 font-medium': last,
          }"
          class="truncate max-w-[180px]"
        >
          {{ item.label }}
        </span>
        <span *ngIf="!last" class="text-slate-600">/</span>
      </div>
    </nav>
  `,
})
export class BreadcrumbComponent {
  items = input.required<BreadcrumbItem[]>();
  onItemClick = output<BreadcrumbItem>();
}
