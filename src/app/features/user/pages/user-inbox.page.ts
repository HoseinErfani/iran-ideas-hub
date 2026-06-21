import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatBoxComponent } from '../../../shared/components/chat-box.component';

@Component({
  selector: 'app-user-inbox-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatBoxComponent],
  template: ` <app-chat-box /> `,
})
export class UserInboxPageComponent {}
