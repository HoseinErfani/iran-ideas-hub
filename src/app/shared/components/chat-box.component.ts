import { Component, computed, HostListener, model, signal } from '@angular/core';
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

interface SystemUser {
  id: string;
  name: string;
  role: string;
  isOnline: boolean;
}

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="flex h-[calc(100vh-110px)] w-full gap-4 p-4 text-slate-200 bg-slate-950 font-sans antialiased selection:bg-cyan-500/30 relative"
    >
      <div
        [class.hidden]="isMobile && selectedChatId()"
        class="flex flex-col w-full md:w-80 lg:w-96 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl overflow-hidden flex-shrink-0"
      >
        <div class="p-4 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
          <h1 class="text-xl font-black text-white flex items-center gap-2">
            <span>گفتگوها</span>
            <span
              class="text-xs font-normal px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
            >
              {{ chats().length }}
            </span>
          </h1>
          <button
            (click)="isModalOpen.set(true)"
            class="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="w-5 h-5 transition-transform group-hover:rotate-90"
            >
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
              class="w-full text-right bg-slate-900/60 border border-white/5 rounded-xl py-2.5 pr-10 pl-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-all"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="absolute right-3.5 w-4 h-4 text-slate-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601Z"
              />
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
                <div
                  class="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-white/10 flex items-center justify-between overflow-hidden shadow-inner"
                >
                  @if (chat.avatar) {
                    <img [src]="chat.avatar" [alt]="chat.name" class="w-full h-full object-cover" />
                  } @else {
                    <span class="text-slate-400 font-bold m-auto text-sm">{{
                      chat.name.substring(0, 2)
                    }}</span>
                  }
                </div>
                @if (chat.isOnline) {
                  <span
                    class="absolute bottom-0 left-0 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full shadow-md shadow-emerald-500/20"
                  ></span>
                }
              </div>

              <div class="flex-1 min-w-0 text-right">
                <div class="flex items-center justify-between mb-1">
                  <h3
                    class="text-sm font-bold text-white truncate group-hover:text-cyan-400 transition-colors"
                  >
                    {{ chat.name }}
                  </h3>
                  <span class="text-[10px] text-slate-500 font-mono">{{ chat.time }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-xs text-slate-400 truncate pl-2">{{ chat.lastMessage }}</p>
                  @if (chat.unreadCount > 0) {
                    <span
                      class="flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold flex items-center justify-center animate-pulse"
                    >
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

      <div
        [class.hidden]="isMobile && !selectedChatId()"
        class="flex-1 flex flex-col rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl overflow-hidden relative"
      >
        @if (currentChat(); as chat) {
          <div
            class="p-4 flex items-center justify-between border-b border-white/5 bg-white/[0.01]"
            style="direction: rtl;"
          >
            <div class="flex items-center gap-3">
              <button
                (click)="selectedChatId.set(null)"
                class="md:hidden p-2 rounded-xl border border-white/5 bg-white/[0.01] text-slate-400 ml-1"
              >
                ←
              </button>

              <div
                class="w-11 h-11 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-white/10 flex items-center justify-center overflow-hidden"
              >
                @if (chat.avatar) {
                  <img [src]="chat.avatar" [alt]="chat.name" class="w-full h-full object-cover" />
                } @else {
                  <span class="text-slate-400 font-bold text-xs">{{
                    chat.name.substring(0, 2)
                  }}</span>
                }
              </div>
              <div class="text-right">
                <h2 class="text-sm font-black text-white">{{ chat.name }}</h2>
                <p class="text-[11px] text-slate-400">
                  {{ chat.role }} •
                  <span
                    [class.text-emerald-400]="chat.isOnline"
                    [class.text-slate-500]="!chat.isOnline"
                    >{{ chat.isOnline ? 'آنلاین' : 'آفلاین' }}</span
                  >
                </p>
              </div>
            </div>

            <button
              class="p-2 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.05] text-slate-400 hover:text-white transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5?"
                />
              </svg>
            </button>
          </div>

          <div
            class="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col custom-scrollbar"
            style="background-image: radial-gradient(rgba(34, 211, 238, 0.015) 1px, transparent 0); background-size: 24px 24px;"
          >
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
                  [class.border-white/5]="msg.sender === 'other'"
                  [class.rounded-bl-none]="msg.sender === 'other'"
                  class="max-w-[70%] p-3.5 rounded-2xl text-sm leading-6 shadow-md text-right relative group"
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
                class="flex-1 bg-slate-900/60 border border-white/5 rounded-2xl py-3 px-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-all shadow-inner"
              />
              <button
                type="submit"
                [disabled]="!newMessageText.trim()"
                class="p-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 transition-all duration-200 flex items-center justify-center shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-5 h-5 transform rotate-180"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </button>
            </form>
          </div>
        } @else {
          <div class="flex-1 flex flex-col items-center justify-center text-center p-8 select-none">
            <div
              class="w-20 h-20 rounded-3xl bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 shadow-inner"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-10 h-10 animate-bounce"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M20.25 8.511c.083.205.13.43.13.665V19.5a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 19.5V9.176m16.5 0a2.25 2.25 0 0 0-2.25-2.25H6.108c-1.24 0-2.25 1.01-2.25 2.25m16.5 0V9.176m0 0a2.25 2.25 0 0 1-2.25 2.25H6.108c-1.24 0-2.25-1.01-2.25-2.25m16.5 0V9.176"
                />
              </svg>
            </div>
            <h3 class="text-base font-bold text-white mb-1">یک گفتگو را انتخاب کنید</h3>
            <p class="text-xs text-slate-500 max-w-xs">
              برای مشاهده پیام‌ها، یکی از گفتگوهای سمت راست را انتخاب کنید یا گفتگوی جدیدی بسازید.
            </p>
          </div>
        }
      </div>

      @if (isModalOpen()) {
        <div
          class="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md transition-all"
        >
          <div
            class="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[80vh]"
          >
            <div class="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
              <h3 class="text-base font-black text-white">شروع گفتگوی جدید</h3>
              <button
                (click)="isModalOpen.set(false)"
                class="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-white/5"
              >
                بستن
              </button>
            </div>

            <div class="flex-1 overflow-y-auto space-y-2 custom-scrollbar" style="direction: rtl;">
              @for (user of systemUsers(); track user.id) {
                <div
                  (click)="startChatWithUser(user)"
                  class="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-transparent hover:border-cyan-500/20 hover:bg-cyan-500/5 cursor-pointer transition-all"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center font-bold text-sm text-slate-300 relative"
                    >
                      {{ user.name.substring(0, 2) }}
                      @if (user.isOnline) {
                        <span
                          class="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 bg-emerald-500 border border-slate-900 rounded-full"
                        ></span>
                      }
                    </div>
                    <div class="text-right">
                      <p class="text-sm font-bold text-white">{{ user.name }}</p>
                      <p class="text-[11px] text-slate-400">{{ user.role }}</p>
                    </div>
                  </div>
                  <span class="text-[11px] text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-lg"
                    >انتخاب</span
                  >
                </div>
              }
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .bg-cyan-500-10 {
        background-color: rgba(6, 182, 212, 0.08) !important;
      }
      .border-cyan-500-20 {
        border-color: rgba(6, 182, 212, 0.25) !important;
      }
      .custom-scrollbar::-webkit-scrollbar {
        width: 5px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 999px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(6, 182, 212, 0.2);
      }
    `,
  ],
})
export class ChatBoxComponent {
  searchQuery = '';
  newMessageText = '';
  selectedChatId = signal<string | null>('chat-1');
  isMobile = false;
  isModalOpen = signal<boolean>(false); // وضعیت باز/بسته بودن مودال مخاطبین

  // لیست کاربران کل سیستم برای پاپ‌آپ نیوچت
  readonly systemUsers = signal<SystemUser[]>([
    {
      id: 'user-100',
      name: 'مهندس امین رئیسی',
      role: 'متخصص بلاکچین و اینترنت اشیا',
      isOnline: true,
    },
    {
      id: 'user-101',
      name: 'دکتر الناز شاکری',
      role: 'توسعه‌دهنده هوش مصنوعی هیدرولوژی',
      isOnline: false,
    },
    { id: 'user-102', name: 'سارا کریمی', role: 'طراح ارشد رابط کاربری پایلوت‌ها', isOnline: true },
    {
      id: 'user-103',
      name: 'پروفسور کاوه بهرامی',
      role: 'مشاور عالی پایش منابع آب',
      isOnline: false,
    },
  ]);

  readonly chats = model<Chat[]>([
    {
      id: 'chat-1',
      name: 'دکتر ارسلان حکیمی (راهبر سیستم)',
      role: 'استادیار دانشگاه شریف',
      avatar: '',
      lastMessage: 'پروپوزال نهایی سنسورهای حقابه رو آپدیت کردم، لطفا بررسی کنید.',
      time: '۱۲:۳۴',
      unreadCount: 2,
      isOnline: true,
      messages: [
        { id: 'm1', sender: 'other', text: 'سلام مهندس، وقتتون بخیر.', time: '۱۰:۱۵' },
        {
          id: 'm2',
          sender: 'me',
          text: 'سلام دکتر جان، در خدمتم. کارهای سخت‌افزاری ماژول لوراوان به کجا رسید؟',
          time: '۱۰:۱۸',
        },
        {
          id: 'm3',
          sender: 'other',
          text: 'تست‌های اولیه پایلوت عالی بود. کالیبراسیون التراسونیک در برابر رسوبات جواب داد.',
          time: '۱۰:۲۰',
        },
        {
          id: 'm4',
          sender: 'other',
          text: 'پروپوزال نهایی سنسورهای حقابه رو آپدیت کردم، لطفا بررسی کنید.',
          time: '۱۲:۳۴',
        },
      ],
    },
    {
      id: 'chat-2',
      name: 'مهندس فرزاد فرخی (راهبر سیستم)',
      role: 'اقتصاد کشاورزی',
      avatar: '',
      lastMessage: 'ممنون، فردا ساعت ۱۰ جلسه حضوری داریم.',
      time: 'دیروز',
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: 'm5',
          sender: 'me',
          text: 'فرزاد جان اصلاحیه سوبسید معکوس گلخانه‌ها رو اعمال کردی؟',
          time: 'دیروز ۱۶:۰۰',
        },
        {
          id: 'm6',
          sender: 'other',
          text: 'بله کاملا فازبندی ۶ ماهه اضافه شد.',
          time: 'دیروز ۱۶:۱۰',
        },
        {
          id: 'm7',
          sender: 'other',
          text: 'ممنون، فردا ساعت ۱۰ جلسه حضوری داریم.',
          time: 'دیروز ۱۶:۱۱',
        },
      ],
    },
  ]);

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  filteredChats = computed(() => {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.chats();
    return this.chats().filter(
      (chat) =>
        chat.name.toLowerCase().includes(query) || chat.lastMessage.toLowerCase().includes(query),
    );
  });

  currentChat = computed(() => this.chats().find((c) => c.id === this.selectedChatId()) || null);

  selectChat(id: string) {
    this.selectedChatId.set(id);
    this.chats.update((allChats) =>
      allChats.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c)),
    );
  }

  sendMessage() {
    if (!this.newMessageText.trim() || !this.selectedChatId()) return;

    const currentId = this.selectedChatId()!;
    const textToSend = this.newMessageText;
    this.newMessageText = '';

    const now = new Date();
    const timeStr =
      now.getHours().toString().padStart(2, '0') +
      ':' +
      now.getMinutes().toString().padStart(2, '0');

    this.chats.update((allChats) =>
      allChats.map((chat) => {
        if (chat.id === currentId) {
          return {
            ...chat,
            lastMessage: textToSend,
            time: timeStr,
            messages: [
              ...chat.messages,
              { id: 'msg-' + Date.now(), sender: 'me', text: textToSend, time: timeStr },
            ],
          };
        }
        return chat;
      }),
    );
  }

  // 🚀 وقتی کاربری را در مودال انتخاب می‌کنیم
  startChatWithUser(user: SystemUser) {
    // ابتدا چک کنیم آیا از قبل با این کاربر چت بازی داریم یا نه
    const existingChat = this.chats().find((c) => c.id === user.id);

    if (existingChat) {
      this.selectedChatId.set(existingChat.id);
    } else {
      // اگر چت وجود نداشت، یک چت ماک جدید برایش می‌سازیم
      const newChat: Chat = {
        id: user.id,
        name: user.name,
        role: user.role,
        avatar: '',
        lastMessage: 'گفتگو آغاز شد.',
        time: 'همین الان',
        unreadCount: 0,
        isOnline: user.isOnline,
        messages: [
          {
            id: 'm-init',
            sender: 'other',
            text: `سلام مهندس! گفتگو با ${user.name} آغاز شد.`,
            time: 'همین الان',
          },
        ],
      };

      this.chats.update((allChats) => [newChat, ...allChats]);
      this.selectedChatId.set(newChat.id);
    }

    // بستن خودکار مودال بعد از هدایت به صفحه چت مخاطب
    this.isModalOpen.set(false);
  }
}
