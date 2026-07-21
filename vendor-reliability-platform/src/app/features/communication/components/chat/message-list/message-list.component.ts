import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Message } from '../../../models/message.model';
import { MessageBubbleComponent } from '../message-bubble/message-bubble.component';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [
    CommonModule,
    MessageBubbleComponent
  ],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageListComponent {

  @Input({ required: true })
  messages: Message[] = [];

  @Input()
  isGroupConversation = false;

  trackByMessageId(index: number, message: Message): string {
    return message.id;
  }

}