import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

import { Conversation } from '../../../models/conversation.model';

@Component({
  selector: 'app-conversation-card',
  standalone: true,
  imports: [
    CommonModule,
    MatBadgeModule,
    MatIconModule
  ],
  templateUrl: './conversation-card.component.html',
  styleUrls: ['./conversation-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationCardComponent {

  @Input({ required: true })
  conversation!: Conversation;

  @Input()
  selected = false;

  @Output()
  conversationSelected = new EventEmitter<Conversation>();

  selectConversation(): void {
    this.conversationSelected.emit(this.conversation);
  }

}