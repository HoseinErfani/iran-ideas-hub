import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  id: string;
  sender: 'me' | 'other';
  text: string;
  time: string;
}

interface Chat {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

@Component({
  selector: 'app-user-inbox-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex h-[calc(100vh-110px)] w-full gap-4 p-4 text-slate-200 bg-slate-950 font-sans antialiased selection:bg-cyan-500/30">

      <div class="flex flex-col w-80 sm:w-96 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl overflow-hidden">

        <div class="p-4 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
          <h1 class="text-xl font-black text-white flex items-center gap-2">
            <span>گفتگوها</span>
            <span class="text-xs font-normal px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {{ chats().length }}
            </span>
          </h1>
          <button (click)="createNewChat()" class="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 transition-transform group-hover:rotate-90">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>

        <div class="p-3 border-b border-white/5">
          <div class="relative flex items-center">
            <input
              type="text"
              [(ngModel)]="searchQuery"
              placeholder="جستجوی مخاطب یا پیام..."
              class="w-full text-right bg-slate-900/60 border border-white/5 rounded-xl py-2.5 pr-10 pl-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/40 transition-all"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="absolute right-3.5 w-4 h-4 text-slate-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601Z" />
            </svg>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar" style="direction: rtl;">
          @for (chat of filteredChats(); track chat.id) {
            <div
              (click)="selectChat(chat.id)"
              [class.bg-cyan-500-10]="selectedChatId() === chat.id"
              [class.border-cyan-500-20]="selectedChatId() === chat.id"
              class="flex items-center gap-3 p-3 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/[0.03] cursor-pointer transition-all duration-200 relative group"
            >
              <div class="relative flex-shrink-0">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-white/10 flex items-center justify-between overflow-hidden shadow-inner">
                  @if (chat.avatar) {
                    <img [src]="chat.avatar" [alt]="chat.name" class="w-full h-full object-cover" />
                  } @else {
                    <span class="text-slate-400 font-bold m-auto text-sm">{{ chat.name.substring(0, 2) }}</span>
                  }
                </div>
                @if (chat.isOnline) {
                  <span class="absolute bottom-0 left-0 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full shadow-md shadow-emerald-500/20"></span>
                }
              </div>

              <div class="flex-1 min-w-0 text-right">
                <div class="flex items-center justify-between mb-1">
                  <h3 class="text-sm font-bold text-white truncate group-hover:text-cyan-400 transition-colors">{{ chat.name }}</h3>
                  <span class="text-[10px] text-slate-500 font-mono">{{ chat.time }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-xs text-slate-400 truncate pl-2">{{ chat.lastMessage }}</p>
                  @if (chat.unreadCount > 0) {
                    <span class="flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold flex items-center justify-center animate-pulse">
                      {{ chat.unreadCount }}
                    </span>
                  }
                </div>
              </div>
            </div>
          } @empty {
            <div class="text-center py-8 text-slate-500 text-xs">مخاطبی یافت نشد.</div>
          }
        </div>
      </div>

      <div class="flex-1 flex flex-col rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl overflow-hidden relative">

        @if (currentChat(); as chat) {
          <div class="p-4 flex items-center justify-between border-b border-white/5 bg-white/[0.01]" style="direction: rtl;">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-white/10 flex items-center justify-center overflow-hidden">
                @if (chat.avatar) {
                  <img [src]="chat.avatar" [alt]="chat.name" class="w-full h-full object-cover" />
                } @else {
                  <span class="text-slate-400 font-bold text-xs">{{ chat.name.substring(0, 2) }}</span>
                }
              </div>
              <div class="text-right">
                <h2 class="text-sm font-black text-white">{{ chat.name }}</h2>
                <p class="text-[11px] text-slate-400">
                  {{ chat.role }} • <span [class.text-emerald-400]="chat.isOnline" [class.text-slate-500]="!chat.isOnline">{{ chat.isOnline ? 'آنلاین' : 'آفلاین' }}</span>
                </p>
              </div>
            </div>

            <button class="p-2 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.05] text-slate-400 hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5?" />
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col custom-scrollbar" style="background-image: radial-gradient(rgba(34, 211, 238, 0.015) 1px, transparent 0); background-size: 24px 24px;">
            @for (msg of chat.messages; track msg.id) {
              <div
                [class.justify-start]="msg.sender === 'me'"
                [class.justify-end]="msg.sender === 'other'"
                class="w-full flex"
              >
                <div
                  [class.bg-cyan-500]="msg.sender === 'me'"
                  [class.text-slate-950]="msg.sender === 'me'"
                  [class.rounded-br-none]="msg.sender === 'me'"
                  [class.bg-slate-900]="msg.sender === 'other'"
                  [class.text-slate-200]="msg.sender === 'other'"
                  [class.border]="msg.sender === 'other'"
                  [class.border-white\/5]="msg.sender === 'other'"
                  [class.rounded-bl-none]="msg.sender === 'other'"
                  class="max-w-[70%]  p-3.5 rounded-2xl text-sm leading-6 shadow-md text-right relative group"
                >
                  <p class="whitespace-pre-wrap pl-8">{{ msg.text }}</p>
                  <span
                    [class.text-slate-800]="msg.sender === 'me'"
                    [class.text-slate-500]="msg.sender === 'other'"
                    class="absolute bottom-1.5 left-2.5 text-[9px] font-mono select-none"
                  >
                    {{ msg.time }}
                  </span>
                </div>
              </div>
            }
          </div>

          <div class="p-4 bg-slate-950 border-t border-white/5" style="direction: rtl;">
            <form (ngSubmit)="sendMessage()" class="flex items-center gap-3">
              <input
                type="text"
                [(ngModel)]="newMessageText"
                name="messageInput"
                autocomplete="off"
                placeholder="پیام خود را اینجا بنویسید..."
                class="flex-1 bg-slate-900/60 border border-white/5 rounded-2xl py-3 px-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/40 transition-all shadow-inner"
              />

              <button
                type="submit"
                [disabled]="!newMessageText.trim()"
                class="p-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-slate-950 transition-all duration-200 flex items-center justify-center shadow-lg shadow-cyan-500/10 disabled:shadow-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 transform rotate-180">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
            </form>
          </div>

        } @else {
          <div class="flex-1 flex flex-col items-center justify-center text-center p-8 select-none">
            <div class="w-20 h-20 rounded-3xl bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 animate-bounce">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.083.205.13.43.13.665V19.5a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 19.5V9.176m16.5 0a2.25 2.25 0 0 0-2.25-2.25H6.108c-1.24 0-2.25 1.01-2.25 2.25m16.5 0V9.176m0 0a2.25 2.25 0 0 1-2.25 2.25H6.108c-1.24 0-2.25-1.01-2.25-2.25m16.5 0V9.176" />
              </svg>
            </div>
            <h3 class="text-base font-bold text-white mb-1">یک گفتگو را انتخاب کنید</h3>
            <p class="text-xs text-slate-500 max-w-xs">برای مشاهده پیام‌ها، یکی از گفتگوهای سمت راست را انتخاب کنید یا گفتگوی جدیدی بسازید.</p>
          </div>
        }

      </div>
    </div>
  `,
  styles: [`
    .bg-cyan-500-10 { background-color: rgba(6, 182, 212, 0.08) !important; }
    .border-cyan-500-20 { border-color: rgba(6, 182, 212, 0.25) !important; }

    /* اسکرول‌بار سفارشی و گلس */
    .custom-scrollbar::-webkit-scrollbar { width: 5px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 999px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(6, 182, 212, 0.2);
    }
  `]
})
export class UserInboxPageComponent {
  searchQuery = '';
  newMessageText = '';
  selectedChatId = signal<string | null>('chat-1'); // چت اول پیش‌فرض باز باشد

  // 📦 داده‌های فیک و کامل ماک الهام گرفته از اعضای تیم ایده بورد شما
  readonly chats = signal<Chat[]>([
    {
      id: 'chat-1',
      name: 'دکتر ارسلان حکیمی',
      role: 'استادیار دانشگاه شریف',
      avatar: '',
      lastMessage: 'پروپوزال نهایی سنسورهای حقابه رو آپدیت کردم، لطفا بررسی کنید.',
      time: '۱۲:۳۴',
      unreadCount: 2,
      isOnline: true,
      messages: [
        { id: 'm1', sender: 'other', text: 'سلام مهندس، وقتتون بخیر.', time: '۱۰:۱۵' },
        { id: 'm2', sender: 'me', text: 'سلام دکتر جان، در خدمتم. کارهای سخت‌افزاری ماژول لوراوان به کجا رسید؟', time: '۱۰:۱۸' },
        { id: 'm3', sender: 'other', text: 'تست‌های اولیه پایلوت عالی بود. کالیبراسیون التراسونیک در برابر رسوبات جواب داد.', time: '۱۰:۲۰' },
        { id: 'm4', sender: 'other', text: 'پروپوزال نهایی سنسورهای حقابه رو آپدیت کردم، لطفا بررسی کنید.', time: '۱۲:۳۴' }
      ]
    },
    {
      id: 'chat-2',
      name: 'مهندس فرزاد فرخی',
      role: 'اقتصاد کشاورزی',
      avatar: '',
      lastMessage: 'ممنون، فردا ساعت ۱۰ جلسه حضوری داریم.',
      time: 'دیروز',
      unreadCount: 0,
      isOnline: false,
      messages: [
        { id: 'm5', sender: 'me', text: 'فرزاد جان اصلاحیه سوبسید معکوس گلخانه‌ها رو اعمال کردی؟', time: 'دیروز ۱۶:۰۰' },
        { id: 'm6', sender: 'other', text: 'بله کاملا فازبندی ۶ ماهه اضافه شد.', time: 'دیروز ۱۶:۱۰' },
        { id: 'm7', sender: 'other', text: 'ممنون، فردا ساعت ۱۰ جلسه حضوری داریم.', time: 'دیروز ۱۶:۱۱' }
      ]
    },
    {
      id: 'chat-3',
      name: 'دکتر مریم شمس',
      role: 'رئیس آزمایشگاه رمزنگاری',
      avatar: '',
      lastMessage: 'مکانیزم Social Recovery روی بلاکچین با موفقیت تست شد.',
      time: '۳ روز قبل',
      unreadCount: 0,
      isOnline: true,
      messages: [
        { id: 'm8', sender: 'other', text: 'مکانیزم Social Recovery روی بلاکچین با موفقیت تست شد.', time: '۳ روز قبل' }
      ]
    }
  ]);

  // 🔍 فیلتر کردن چت‌ها بر اساس سرچ باکس
  filteredChats = computed(() => {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.chats();
    return this.chats().filter(chat =>
      chat.name.toLowerCase().includes(query) ||
      chat.lastMessage.toLowerCase().includes(query)
    );
  });

  // 💡 یافتن چت فعال کنونی
  currentChat = computed(() => {
    return this.chats().find(c => c.id === this.selectedChatId()) || null;
  });

  // انتخاب چت و صفر کردن Unread
  selectChat(id: string) {
    this.selectedChatId.set(id);
    this.chats.update(allChats => allChats.map(c => {
      if (c.id === id) {
        return { ...c, unreadCount: 0 };
      }
      return c;
    }));
  }

  // 🚀 ارسال واقعی پیام جدید و اضافه شدن به آرایه چت
  sendMessage() {
    if (!this.newMessageText.trim() || !this.selectedChatId()) return;

    const currentId = this.selectedChatId()!;
    const textToSend = this.newMessageText;
    this.newMessageText = ''; // پاک کردن سریع اینپوت

    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    this.chats.update(allChats => allChats.map(chat => {
      if (chat.id === currentId) {
        const newMsg: Message = {
          id: 'msg-' + Date.now(),
          sender: 'me',
          text: textToSend,
          time: timeStr
        };
        return {
          ...chat,
          lastMessage: textToSend,
          time: timeStr,
          messages: [...chat.messages, newMsg]
        };
      }
      return chat;
    }));
  }

  // ➕ ساخت چت جدید (دکمه پلاس تلگرامی)
  createNewChat() {
    const name = prompt('نام مخاطب جدید را وارد کنید:');
    if (!name) return;

    const newChat: Chat = {
      id: 'chat-' + Date.now(),
      name: name,
      role: 'کاربر جدید سیستم',
      avatar: '',
      lastMessage: 'گفتگو آغاز شد.',
      time: 'همین الان',
      unreadCount: 0,
      isOnline: true,
      messages: [
        { id: 'm-init', sender: 'other', text: `سلام! به سیستم گفتگو خوش آمدید.`, time: 'همین الان' }
      ]
    };

    this.chats.update(allChats => [newChat, ...allChats]);
    this.selectedChatId.set(newChat.id);
  }
}
