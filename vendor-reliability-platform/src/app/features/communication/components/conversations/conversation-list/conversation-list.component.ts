import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Conversation } from '../../../models/conversation.model';
import { ConversationCardComponent } from '../conversation-card/conversation-card.component';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ConversationCardComponent
  ],
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationListComponent {

  @Input({ required: true })
  conversations: Conversation[] = [];

  @Input()
  selectedConversationId: string | null = null;

  @Output()
  conversationSelected = new EventEmitter<Conversation>();

  searchText = '';

  get filteredConversations(): Conversation[] {
    const query = this.searchText.trim().toLowerCase();

    if (!query) {
      return this.conversations;
    }

    return this.conversations.filter(conversation =>
      conversation.name.toLowerCase().includes(query) ||
      conversation.lastMessage.toLowerCase().includes(query)
    );
  }

  onConversationSelected(conversation: Conversation): void {
    this.conversationSelected.emit(conversation);
  }

  trackByConversationId(_: number, conversation: Conversation): string {
    return conversation.id;
  }

}