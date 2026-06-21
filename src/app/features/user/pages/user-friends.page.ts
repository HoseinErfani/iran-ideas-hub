import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Item {
  id: string;
  name: string;
  field: string;
  type: 'Person' | 'Group';
  selected?: boolean;
}

@Component({
  selector: 'app-user-friends-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 p-4 text-slate-200 bg-slate-950 font-sans antialiased"
    >
      <section
        class="rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-5 flex flex-col justify-between"
      >
        <div>
          <h3 class="text-2xl font-black text-white mb-1">دوستان و گروه‌ها</h3>
          <p class="text-xs text-slate-400 mb-5">مخاطبین و گروه‌های تخصصی خود را مدیریت کنید.</p>

          <div
            class="space-y-3 overflow-y-auto max-h-[65vh] custom-scrollbar"
            style="direction: rtl;"
          >
            @for (item of items(); track item.id) {
              <div
                (click)="navigateToChat(item.id)"
                class="flex items-center justify-between rounded-2xl bg-white/[0.03] border border-white/5 p-4 hover:bg-white/[0.06] hover:border-cyan-500/20 cursor-pointer transition-all duration-200 group"
              >
                <div class="flex items-center gap-3">
                  <div
                    [class.bg-cyan-500/10]="item.type === 'Person'"
                    [class.bg-purple-500/10]="item.type === 'Group'"
                    [class.text-cyan-400]="item.type === 'Person'"
                    [class.text-purple-400]="item.type === 'Group'"
                    class="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 text-xs font-bold"
                  >
                    {{ item.type === 'Person' ? '👤' : '👥' }}
                  </div>
                  <div class="text-right">
                    <h4 class="font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {{ item.name }}
                    </h4>
                    <p class="text-xs text-slate-400 mt-1">{{ item.field }}</p>
                  </div>
                </div>
                <button
                  class="rounded-xl bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 text-xs font-semibold text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300"
                >
                  {{ item.type === 'Person' ? 'چت خصوصی' : 'ورود به گروه' }}
                </button>
              </div>
            }
          </div>
        </div>
      </section>

      <section class="rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-5">
        <div class="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
          <h4 class="text-lg font-black text-white">ساخت گروه جدید</h4>
          <button
            (click)="createGroup()"
            [disabled]="!groupName().trim()"
            class="rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 px-5 py-2.5 text-sm font-bold shadow-lg shadow-cyan-500/10 transition-all active:scale-95"
          >
            ایجاد گروه
          </button>
        </div>

        <div class="space-y-5" style="direction: rtl;">
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-2">نام گروه</label>
            <input
              type="text"
              [(ngModel)]="groupName"
              placeholder="مثال: کارگروه هوشمندسازی"
              class="w-full bg-slate-900/60 border border-white/5 rounded-xl py-3 px-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 transition-all"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-2">توضیحات و قوانین</label>
            <textarea
              [(ngModel)]="groupDescription"
              placeholder="هدف از تشکیل گروه..."
              class="w-full h-24 bg-slate-900/60 border border-white/5 rounded-xl py-3 px-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 transition-all resize-none"
            ></textarea>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-2">انتخاب اعضای گروه</label>
            <div
              class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar pl-1"
            >
              @for (friend of friendsOnly(); track friend.id) {
                <div
                  (click)="toggleFriendSelection(friend.id)"
                  [class.border-cyan-500/40]="friend.selected"
                  [class.bg-cyan-500/5]="friend.selected"
                  class="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] cursor-pointer transition-all select-none"
                >
                  <div class="text-right min-w-0">
                    <p
                      class="text-sm font-semibold truncate"
                      [class.text-cyan-400]="friend.selected"
                    >
                      {{ friend.name }}
                    </p>
                    <p class="text-[11px] text-slate-500 truncate">{{ friend.field }}</p>
                  </div>
                  <div
                    [class.bg-cyan-500]="friend.selected"
                    [class.border-white/20]="!friend.selected"
                    class="w-4 h-4 rounded-full border flex items-center justify-center transition-all"
                  >
                    @if (friend.selected) {
                      <span class="text-[9px] text-slate-950 font-bold">✓</span>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 99px;
      }
    `,
  ],
})
export class UserFriendsPageComponent {
  private router = inject(Router);

  // لیست جامع شامل افراد و گروه‌ها
  items = signal<Item[]>([
    { id: 'chat-1', name: 'مریم احمدی', field: 'معیشت و رفاه اجتماعی', type: 'Person' },
    { id: 'chat-2', name: 'علی محمدی', field: 'ترافیک و حمل‌ونقل', type: 'Person' },
    { id: 'chat-3', name: 'زهرا حسینی', field: 'انرژی و محیط‌زیست', type: 'Person' },
  ]);

  groupName = signal<string>('');
  groupDescription = signal<string>('');

  // فقط واکشی افراد برای نمایش در لیست انتخاب اعضا
  friendsOnly = computed(() => this.items().filter((item) => item.type === 'Person'));

  navigateToChat(id: string) {
    this.router.navigate(['/user/inbox'], { queryParams: { activeChat: id } });
  }

  toggleFriendSelection(id: string) {
    this.items.update((all) =>
      all.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)),
    );
  }

  createGroup() {
    const selectedCount = this.items().filter((i) => i.selected).length;

    const newGroup: Item = {
      id: 'group-' + Date.now(),
      name: this.groupName(),
      field: `${selectedCount} عضو • گروه عمومی`,
      type: 'Group',
    };

    // اضافه شدن آنی به لیست سمت چپ
    this.items.update((all) => [newGroup, ...all]);

    // ریست فرم
    this.groupName.set('');
    this.groupDescription.set('');
    this.items.update((all) => all.map((item) => ({ ...item, selected: false })));
  }
}
