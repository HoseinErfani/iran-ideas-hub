import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  template: `
    <article class="glass rounded-3xl p-5 shadow-xl shadow-slate-950/30">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-sm text-slate-400">{{ label }}</p>
          <h3 class="mt-2 text-3xl font-black text-white">{{ value }}</h3>
        </div>
        <div class="rounded-2xl bg-white/5 p-3 text-2xl">{{ icon }}</div>
      </div>
      <p class="mt-4 text-sm text-slate-300">{{ hint }}</p>
    </article>
  `
})
export class StatCardComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() icon = '▣';
  @Input() hint = '';
}