import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  template: `
    <section class="glass rounded-3xl p-5">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-xs text-slate-400">{{ eyebrow }}</p>
          <h3 class="text-lg font-bold text-white">{{ title }}</h3>
        </div>
        <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{{ subtitle }}</span>
      </div>
      <div class="mt-5 grid gap-3 sm:grid-cols-2">
        @for (item of items; track item.label) {
          <div class="rounded-2xl bg-white/5 p-4">
            <div class="flex items-center justify-between text-sm text-slate-300">
              <span>{{ item.label }}</span><b class="text-white">{{ item.value }}</b>
            </div>
            <div class="mt-3 h-2 rounded-full bg-slate-800">
              <div class="h-2 rounded-full bg-gradient-to-r from-brand-500 via-cyan-400 to-emerald-400" [style.width.%]="item.value"></div>
            </div>
          </div>
        }
      </div>
    </section>
  `
})
export class ChartCardComponent {
  @Input() title = '';
  @Input() eyebrow = '';
  @Input() subtitle = '';
  @Input() items: { label: string; value: number }[] = [];
}